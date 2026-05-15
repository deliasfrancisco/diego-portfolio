import type { IconType } from 'react-icons'
import {
  SiDotnet, SiAngular, SiTypescript, SiRedis,
  SiGithubactions, SiIonic, SiDocker,
} from 'react-icons/si'
import { DiMsqlServer, DiDotnet } from 'react-icons/di'
import { TbBrandCSharp, TbBrandAzure, TbBrandWindows } from 'react-icons/tb'

export interface Skill {
  name:  string
  icon:  IconType
  color: string
}

export const SKILLS: Skill[] = [
  { name: '.NET Core',      icon: SiDotnet,        color: '#512BD4' },
  { name: 'Angular 21',     icon: SiAngular,        color: '#DD0031' },
  { name: 'C#',             icon: TbBrandCSharp,    color: '#9B4F96' },
  { name: 'SQL Server',     icon: DiMsqlServer,     color: '#CC2927' },
  { name: 'TypeScript',     icon: SiTypescript,     color: '#3178C6' },
  { name: 'EF Core',        icon: SiDotnet,         color: '#7B1FA2' },
  { name: 'Hangfire',       icon: SiDotnet,         color: '#22c55e' },
  { name: 'SignalR',        icon: TbBrandWindows,   color: '#0078D4' },
  { name: 'Redis',          icon: SiRedis,          color: '#DC382D' },
  { name: 'IIS',            icon: TbBrandWindows,   color: '#0078D4' },
  { name: 'GitHub Actions', icon: SiGithubactions,  color: '#2088FF' },
  { name: 'Ionic 8',        icon: SiIonic,          color: '#3880FF' },
  { name: 'Azure',          icon: TbBrandAzure,     color: '#0089D6' },
  { name: '.NET 10',        icon: DiDotnet,         color: '#512BD4' },
  { name: 'Docker',         icon: SiDocker,         color: '#2496ED' },
]

export const OWNER = {
  name:      'Diego Francisco',
  initials:  'DF',
  role:      'Senior .NET Full-Stack Software Architect',
  tagline:   'Engineering beyond boundaries',
  location:  'Presidente Prudente, SP, Brazil',
  timezone:  'UTC-3 (BRT)',
  status:    'open_to_freelance',
  upwork:    'active',
  github:    'https://github.com/diegofrancisco',
  linkedin:  'https://linkedin.com/in/diego-francisco',
  email:     'diego.francisco.dev@gmail.com',
  mba:       'PUC Minas — Distributed Software Architecture',
  btech:     'FATEC — ADS',
  yearsXp:   7,
  kernel:    'ARCH.KERNEL :: v7.0.0',
}

export const EXPERIENCE = [
  {
    hash:    'd4f8a2e',
    branch:  'HEAD → main',
    remote:  'nexus-port-mgmt',
    period:  '2023 – Present',
    role:    'Senior .NET Architect & Tech Lead',
    company: '@ Nexus Automotive',
    desc:    'Contracted to manage and refactor a legacy port management system originally built by Callidus Tecnologia. Modernized the full stack to .NET 10 + Angular 21. Designed new architecture with EmpresaId removal, IsDeleted soft-delete, and AuditLog in JSON. Implemented Hangfire job scheduling and real-time vehicle tracking via SignalR.',
    tags:    ['.NET 10', 'Angular 21', 'SQL Server', 'Hangfire', 'SignalR', 'IIS', 'GitHub Actions'],
    insertions: '2,847',
    deletions:  '1,203',
  },
  {
    hash:    'a9c3b1f',
    branch:  'HEAD → develop',
    remote:  '',
    period:  '2020 – 2023',
    role:    'Full Stack .NET Developer',
    company: '@ Freelance / Contract',
    desc:    'Built enterprise web applications for clients across logistics and finance sectors. Angular SPAs with .NET Core APIs, Redis caching, and CI/CD pipelines via GitHub Actions. Cross-platform mobile apps with Ionic 8 + Capacitor consuming existing REST APIs.',
    tags:    ['.NET Core', 'Angular', 'SQL Server', 'EF Core', 'Ionic 8', 'Redis'],
    insertions: '1,456',
    deletions:  '389',
  },
  {
    hash:    '5e7f912',
    branch:  'HEAD → feature/',
    remote:  'legacy-systems',
    period:  '2017 – 2020',
    role:    '.NET Developer',
    company: '@ Enterprise Software',
    desc:    'Developed and maintained ERP-integrated applications, reporting pipelines, and data-heavy ASP.NET systems. Built a strong foundation in SQL Server performance tuning, complex stored procedures, and query optimization.',
    tags:    ['ASP.NET MVC', 'SQL Server', 'JavaScript', 'Crystal Reports'],
    insertions: '943',
    deletions:  '201',
  },
]

export const INITIAL_COMMIT = {
  hash: '0000000',
  msg:  '🎓 Initial Commit — B.Tech ADS, FATEC  |  Hello, World.',
  year: '2017',
}

export const PROJECTS = [
  {
    name:      'nexus-port-mgmt',
    badge:     'Private',
    desc:      'Port management system full rewrite. Legacy Callidus → modern .NET 10 + Angular 21 stack with IIS deployment pipeline and GitHub Actions CI/CD.',
    tags:      ['.NET 10', 'Angular 21', 'SQL Server', 'Hangfire', 'SignalR'],
    lang:      'C#',
    langColor: '#178600',
    meta:      '★ Active · Nexus',
  },
  {
    name:      'mobile-inspection-app',
    badge:     'Private',
    desc:      'Cross-platform vehicle inspection module with offline support. Ionic 8 + Capacitor + Angular consuming .NET Core WebAPI.',
    tags:      ['Ionic 8', 'Capacitor', 'Angular', '.NET API'],
    lang:      'TypeScript',
    langColor: '#3178c6',
    meta:      '★ Active',
  },
  {
    name:      'distributed-arch-poc',
    badge:     'Private',
    desc:      'MBA capstone: distributed microservices PoC with Redis caching, SignalR real-time events, Hangfire async jobs, and Azure deployment.',
    tags:      ['.NET Core 8', 'Redis', 'SignalR', 'Azure'],
    lang:      'C#',
    langColor: '#178600',
    meta:      '★ PUC Minas',
  },
  {
    name:      'cicd-dotnet-template',
    badge:     'Public',
    desc:      'Reusable GitHub Actions workflow for .NET + Angular projects. Build, test, publish and IIS deploy stages with PowerShell deployment scripts.',
    tags:      ['GitHub Actions', '.NET', 'PowerShell', 'IIS'],
    lang:      'YAML',
    langColor: '#89e051',
    meta:      '⑃ 12',
  },
]

export const C_SHARP_SNIPPET = `// Diego.cs — Architecture beyond boundaries
public class Architect : IFreelancer
{
    public string   Name      => "Diego Francisco";
    public string   Role      => "Senior .NET Architect";
    public string   MBA       => "PUC Minas — Distributed Arch.";
    public int      YearsXp   => 7;
    public string[] Stack     => [".NET 10", "Angular 21",
                                  "SQL Server", "SignalR", "Redis"];
    public bool     Available => true; // OpenToFreelance
}`

export const LOADED_MODULES = [
  '.NET CORE', 'ANGULAR', 'SQL SERVER', 'C#',
  'HANGFIRE', 'SIGNALR', 'REDIS', 'GITHUB ACTIONS',
]
