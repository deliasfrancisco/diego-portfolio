import { NextResponse } from 'next/server'

const GITHUB_LOGIN = 'deliasfrancisco'

const QUERY = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

export async function GET() {
  const pat = process.env.GITHUB_PAT
  if (!pat) {
    return NextResponse.json({ error: 'GITHUB_PAT not set' }, { status: 500 })
  }

  const to   = new Date()
  const from = new Date(to)
  from.setFullYear(from.getFullYear() - 1)

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method:  'POST',
      headers: {
        Authorization: `Bearer ${pat}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { login: GITHUB_LOGIN, from: from.toISOString(), to: to.toISOString() },
      }),
      next: { revalidate: 1800 },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'GitHub API error' }, { status: res.status })
    }

    const json = await res.json()
    const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks

    if (!weeks) {
      return NextResponse.json({ error: 'Unexpected response shape' }, { status: 502 })
    }

    return NextResponse.json({ weeks })
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 })
  }
}
