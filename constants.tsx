import { Project, Experience, Skill, SocialLink, Education } from './types';
import { Github, Linkedin, Mail, Code, Terminal, Database, Smartphone } from 'lucide-react';

export const HERO_CONTENT = {
  greeting: "Olá, eu sou o",
  name: "Ariel André Aio",
  role: "COO & Desenvolvedor Full Stack",
  description: "Co-fundador da Skyiit. Combino visão estratégica de negócios com capacidade técnica em React, Node.js e Laravel para criar soluções digitais escaláveis e de alto impacto.",
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Sistema para Barbearias",
    description: "Plataforma completa para gestão de agendamentos e clientes. Escalável e adaptável para negócios de beleza, utilizado diariamente em produção.",
    tags: ["Next.js", "Firebase", "Vercel", "React"],
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800",
    link: "https://barber-agenda.vercel.app",
    githubRepo: "https://github.com/ArielAio?tab=repositories",
  },
  {
    id: 2,
    title: "Strike System",
    description: "Sistema de organização e gestão para academias. Controle de acesso, treinos e administração de alunos com interface intuitiva.",
    tags: ["React", "Node.js", "System", "Management"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
    link: "https://strike-system.vercel.app/signIn",
    githubRepo: "https://github.com/ArielAio?tab=repositories",
  },
  {
    id: 3,
    title: "Chat Bot AI (Sabiá 3)",
    description: "Chatbot inteligente com integração da API Sabiá 3. Focado em processamento de linguagem natural para interações fluidas.",
    tags: ["AI", "Sabiá 3 API", "Chatbot", "Integration"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
    link: "https://chat-bot-gules-chi.vercel.app",
    githubRepo: "https://github.com/ArielAio?tab=repositories",
  },
  {
    id: 4,
    title: "CodeWise LMS",
    description: "Sistema de cursos online desenvolvido com foco na experiência do aluno e usabilidade. Plataforma robusta para ensino à distância.",
    tags: ["React", "Education", "LMS", "Frontend"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    link: "http://codewise-liart.vercel.app/",
    githubRepo: "https://github.com/ArielAio?tab=repositories",
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "COO & Co-Fundador",
    company: "Skyiit",
    period: "2024 - Atual",
    description: "Responsável pelo produto digital Memoryiit e gestão de operações.",
    details: [
      "Gestão de operações, marketing digital e suporte ao cliente.",
      "Liderança de time de desenvolvimento (3 devs) e organização de demandas.",
      "Criação e edição de conteúdos digitais para campanhas de marketing.",
      "Estruturação de processos visando crescimento escalável."
    ]
  },
  {
    id: 2,
    role: "Estagiário em Desenvolvimento",
    company: "EnterScience",
    period: "2023 - 2024",
    description: "Atuação direta no desenvolvimento e manutenção de software.",
    details: [
      "Implementação de novas funcionalidades no site institucional (Laravel/React).",
      "Correção de bugs e otimização de código.",
      "Manutenção de banco de dados PostgreSQL."
    ]
  },
];

export const EDUCATION: Education[] = [
  {
    id: 1,
    degree: "Bacharelado em Sistemas de Informação",
    institution: "IFSP - Votuporanga",
    period: "2027",
    description: "Ensino superior em andamento, período matutino."
  },
  {
    id: 2,
    degree: "Técnico em Informática",
    institution: "ETEC - Armando José Farinazzo",
    period: "2023",
    description: "Formação técnica focada em desenvolvimento de sistemas."
  }
];

export const SKILLS: Skill[] = [
  { 
    name: "React / Next.js", 
    time: "+2 anos", 
    category: 'frontend',
    description: "Desenvolvimento de SPAs complexas, Dashboards administrativos e otimização de renderização (SSR/CSR)."
  },
  { 
    name: "JavaScript / TypeScript", 
    time: "+3 anos", 
    category: 'frontend',
    description: "Tipagem estática para código escalável, manipulação avançada de DOM e lógica assíncrona."
  },
  { 
    name: "Node.js", 
    time: "+2 anos", 
    category: 'backend',
    description: "Criação de APIs RESTful, microsserviços e integração com sistemas de pagamento e autenticação."
  },
  { 
    name: "Laravel / PHP", 
    time: "+2 anos", 
    category: 'backend',
    description: "Manutenção de sistemas legados, arquitetura MVC robusta e desenvolvimento de aplicações institucionais."
  },
  { 
    name: "PostgreSQL / MySQL", 
    time: "+2 anos", 
    category: 'backend',
    description: "Modelagem de bancos relacionais, otimização de queries complexas e garantia de integridade de dados."
  },
  { 
    name: "Firebase", 
    time: "+1 ano", 
    category: 'backend',
    description: "Implementação de bancos NoSQL em tempo real, autenticação social e hosting de aplicações."
  },
  { 
    name: "Git / GitHub", 
    time: "+3 anos", 
    category: 'tools',
    description: "Controle de versão em equipe, code review, CI/CD básico e gestão de fluxo de trabalho (Git Flow)."
  },
  { 
    name: "Metodologias Ágeis", 
    time: "+2 anos", 
    category: 'tools',
    description: "Organização de sprints, dailies e gestão de backlog utilizando ferramentas como Trello/Jira."
  },
];

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/ArielAio", icon: Github },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/ariel-aio/", icon: Linkedin },
  { platform: "Email", url: "mailto:arielaio@hotmail.com", icon: Mail },
];

export const SERVICES = [
  { title: "Desenvolvimento Full Stack", icon: Code, description: "Criação de aplicações web completas usando React, Node.js e Laravel." },
  { title: "Gestão de Produtos", icon: Smartphone, description: "Liderança técnica e estratégica para transformar ideias em produtos digitais." },
  { title: "Banco de Dados", icon: Database, description: "Modelagem e otimização de dados com PostgreSQL, MySQL e Firebase." },
];