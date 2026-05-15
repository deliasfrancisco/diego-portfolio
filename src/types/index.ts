export interface ExperienceEntry {
  hash: string; branch: string; remote: string; period: string;
  role: string; company: string; desc: string; tags: string[];
  insertions: string; deletions: string;
}

export interface ProjectEntry {
  name: string; badge: string; desc: string; tags: string[];
  lang: string; langColor: string; meta: string;
}
