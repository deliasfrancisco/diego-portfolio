import emailjs from '@emailjs/browser'

export async function sendEmail(name: string, email: string, message: string) {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    { from_name: name, from_email: email, message },
    { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
  )
}
