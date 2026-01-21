import { Project, Experience, Skill, SocialLink, Education } from './types';
import { Github, Linkedin, Mail, Code, Terminal, Database, Smartphone } from 'lucide-react';

export const NAV_LINKS = {
  pt: [
    { name: 'Sobre', href: '#about' },
    { name: 'Experiência', href: '#experience' },
    { name: 'Projetos', href: '#featured-project' },
    { name: 'Contato', href: '#contact' },
  ],
  en: [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#featured-project' },
    { name: 'Contact', href: '#contact' },
  ]
};

export const HERO_CONTENT = {
  pt: {
    greeting: "Olá, eu sou o",
    name: "Ariel André Aio",
    role: "Desenvolvedor Full-Stack | COO | Especialista em Operações & Automação",
    description: "Desenvolvedor Full-Stack e Cofundador com experiência na construção e escala de produtos SaaS B2C que somam mais de R$ 1.5 milhão em faturamento. Especialista em arquitetura de sistemas (Laravel, React, Next.js) e otimização de operações através de automações estratégicas.",
    ctaProjects: "Ver Projetos",
    ctaContact: "Entrar em Contato",
    ctaResume: "Baixar PDF",
    resumeLabel: "Currículo"
  },
  en: {
    greeting: "Hello, I am",
    name: "Ariel André Aio",
    role: "Full-Stack Developer | COO | Operations & Automation Specialist",
    description: "Full-Stack Developer and Co-founder with experience in building and scaling B2C SaaS products that total over R$ 1.5 million in revenue. Specialist in systems architecture (Laravel, React, Next.js) and operations optimization through strategic automations.",
    ctaProjects: "View Projects",
    ctaContact: "Get in Touch",
    ctaResume: "Download PDF",
    resumeLabel: "Resume"
  }
};

export const ABOUT_CONTENT = {
  pt: {
    title: "Sobre Mim",
    services: [
      { title: "Desenvolvimento Full-Stack", icon: Code, description: "Experiência em React, Next.js, Laravel e Node.js. Arquitetura de sistemas serverless, APIs RESTful e integração de gateways de pagamento (Stripe, Mercado Pago)." },
      { title: "Gestão de Produtos & Operações", icon: Smartphone, description: "COO com experiência em escalar produtos SaaS B2C. Gestão de operações, automações estratégicas e liderança de equipes para produtos com +195k usuários." },
      { title: "Banco de Dados & Infraestrutura", icon: Database, description: "PostgreSQL, MySQL, Firebase e Redis. Otimização de queries, arquitetura serverless e jobs/filas para processamento assíncrono." },
    ]
  },
  en: {
    title: "About Me",
    services: [
      { title: "Full-Stack Development", icon: Code, description: "Experience with React, Next.js, Laravel, and Node.js. Serverless systems architecture, RESTful APIs, and payment gateway integration (Stripe, Mercado Pago)." },
      { title: "Product Management & Operations", icon: Smartphone, description: "COO with experience scaling B2C SaaS products. Operations management, strategic automations, and team leadership for products with +195k users." },
      { title: "Database & Infrastructure", icon: Database, description: "PostgreSQL, MySQL, Firebase, and Redis. Query optimization, serverless architecture, and job/queue processing." },
    ]
  }
};

export const EXPERIENCE_CONTENT = {
  pt: {
    title: "Minha Trajetória",
    professionalTitle: "Experiência Profissional",
    educationTitle: "Formação Acadêmica",
    experience: [
      {
        id: 1,
        role: "Fundador & Desenvolvedor Full-Stack",
        company: "ZapWrapp",
        period: "2025 - Atual",
        description: "SaaS B2C de retrospectivas visuais de dados do WhatsApp (45.412 usuários).",
        projectLink: "https://zapwrapp.com",
        details: [
          "Faturamento superior a R$ 25.000,00 desde o lançamento, atingindo Break-even em 48 horas com operação 100% autofinanciada.",
          "Arquitetei o pipeline completo de processamento algorítmico de arquivos, integração de gateways de pagamento e geração de mídia.",
          "Implementei infraestrutura Serverless/Assíncrona, processando 4.732 transações com custos operacionais 70% menores que modelos tradicionais.",
          "Redução do time-to-market em 75% através de fluxos de desenvolvimento otimizados com IA."
        ]
      },
      {
        id: 2,
        role: "COO & Cofundador",
        company: "Memoryiit (Skyiit)",
        period: "2025 - Atual",
        description: "Plataforma SaaS consolidada com 195.060 usuários e 63.000+ memórias criadas.",
        projectLink: "https://memoryiit.com",
        details: [
          "Liderança operacional de plataforma com faturamento acumulado superior a R$ 1.500.000,00.",
          "Implementei sistemas de triagem e atendimento assistidos por IA, gerenciando suporte para 195k usuários com alta padronização.",
          "Estruturei fluxos automáticos que permitiram escalar a operação mantendo equipe enxuta, maximizando lucratividade.",
          "Coordenação de operações internas via Linear, gestão de equipes de suporte e criação de conteúdo para marketing."
        ]
      },
      {
        id: 3,
        role: "Estagiário em Desenvolvimento",
        company: "EnterScience",
        period: "2024 - 2025",
        description: "Desenvolvimento Full-Stack em ambiente de tecnologia educacional.",
        details: [
          "Desenvolvimento de funcionalidades em Laravel, integrando APIs para geração automática de conteúdos pedagógicos e provas.",
          "Implementação de camadas de validação (System Guardrails) e self-checking em LLMs para garantir integridade técnica.",
          "Manutenção de bancos PostgreSQL, realizando refatorações e otimizações de queries para melhoria de performance.",
          "Atuação em ciclos ágeis com React e PHP, realizando code reviews e documentação de sistemas."
        ]
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bacharelado em Sistemas de Informação",
        institution: "IFSP - Votuporanga",
        period: "Conclusão: 12/2027",
        description: "Ensino superior em andamento, período matutino."
      },
      {
        id: 2,
        degree: "Técnico em Informática",
        institution: "ETEC - Armando José Farinazzo",
        period: "Conclusão: 2023",
        description: "Formação técnica focada em desenvolvimento de sistemas."
      }
    ]
  },
  en: {
    title: "My Journey",
    professionalTitle: "Professional Experience",
    educationTitle: "Education",
    experience: [
      {
        id: 1,
        role: "Founder & Full-Stack Developer",
        company: "ZapWrapp",
        period: "2025 - Present",
        description: "B2C SaaS for WhatsApp visual data retrospectives (45,412 users).",
        projectLink: "https://zapwrapp.com",
        details: [
          "Revenue exceeding R$ 25,000 since launch, reaching Break-even in 48 hours with 100% self-funded operation.",
          "Architected complete pipeline for algorithmic file processing, payment gateway integration, and media generation.",
          "Implemented Serverless/Asynchronous infrastructure, processing 4,732 transactions with 70% lower operational costs than traditional models.",
          "Reduced time-to-market by 75% through AI-optimized development workflows."
        ]
      },
      {
        id: 2,
        role: "COO & Co-Founder",
        company: "Memoryiit (Skyiit)",
        period: "2025 - Atual",
        description: "Consolidated SaaS platform with 195,060 users and 63,000+ created memories.",
        projectLink: "https://memoryiit.com",
        details: [
          "Operational leadership of platform with cumulative revenue exceeding R$ 1,500,000.",
          "Implemented AI-assisted triage and support systems, managing support for 195k users with high standardization.",
          "Structured automated workflows that enabled scaling operations with a lean team, maximizing profitability.",
          "Internal operations coordination via Linear, support team management, and marketing content creation."
        ]
      },
      {
        id: 3,
        role: "Development Intern",
        company: "EnterScience",
        period: "2024 - 2025",
        description: "Full-Stack development in educational technology environment.",
        details: [
          "Laravel feature development, integrating APIs for automatic generation of pedagogical content and exams.",
          "Implementation of validation layers (System Guardrails) and self-checking in LLMs to ensure technical integrity.",
          "PostgreSQL database maintenance, performing refactorings and query optimizations for performance improvement.",
          "Agile cycles work with React and PHP, performing code reviews and system documentation."
        ]
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor in Information Systems",
        institution: "IFSP - Votuporanga",
        period: "Completion: 12/2027",
        description: "Higher education in progress, morning period."
      },
      {
        id: 2,
        degree: "IT Technician",
        institution: "ETEC - Armando José Farinazzo",
        period: "Completion: 2023",
        description: "Technical education focused on systems development."
      }
    ]
  }
};

export const FEATURED_PROJECTS = {
  pt: {
    sectionTitle: "Projetos em Destaque",
    heading: "Produtos que eu liderei",
    projects: [
      {
        title: "ZapWrapp — Retrospectiva do WhatsApp",
        subtitle: "Fundador & Desenvolvedor Full-Stack",
        description: "SaaS B2C que transforma conversas exportadas do WhatsApp em retrospectivas visuais do ano, com métricas, rankings e telas prontas para compartilhar. Alcancei 45.412 usuários e faturamento superior a R$ 25.000,00.",
        responsibilities: [
          "Arquitetura full-stack: pipeline de processamento algorítmico de arquivos, geração de mídia e integração com gateways de pagamento",
          "Infraestrutura Serverless/Assíncrona com custos operacionais 70% menores, processando 4.732 transações",
          "Break-even em 48 horas com operação 100% autofinanciada",
          "Redução de 75% no time-to-market através de desenvolvimento otimizado com IA"
        ],
        tags: ["Next.js", "Serverless", "Payment Gateways", "Data Processing", "SaaS B2C"],
        image: "/zapwrapp.png",
        link: "https://zapwrapp.com",
        badge: "🚀 Em Produção",
        cta: "Visitar Projeto"
      },
      {
        title: "Memoryiit — Plataforma de Presentes Digitais",
        subtitle: "COO & Co-Fundador | Skyiit",
        description: "Como COO e Co-fundador da Skyiit, coordenei o lançamento e operação do Memoryiit, plataforma consolidada com 195.060 usuários, 63.000+ memórias criadas e faturamento superior a R$ 1.500.000,00.",
        responsibilities: [
          "Liderança operacional de plataforma com alto volume de tráfego e transações",
          "Implementação de sistemas de triagem e atendimento assistidos por IA para base de 195k usuários",
          "Estruturação de fluxos automáticos que permitiram escalar mantendo equipe enxuta e maximizando lucratividade",
          "Gestão de operações via Linear, liderança de equipes de suporte e criação de conteúdo para marketing"
        ],
        tags: ["Product Management", "Operations", "AI Automation", "Team Leadership", "SaaS B2C"],
        image: "/memoryiit.png",
        link: "https://memoryiit.com",
        badge: "🚀 Em Produção",
        cta: "Visitar Projeto"
      }
    ]
  },
  en: {
    sectionTitle: "Featured Projects",
    heading: "Products I led",
    projects: [
      {
        title: "ZapWrapp — WhatsApp Retrospective",
        subtitle: "Founder & Full-Stack Developer",
        description: "B2C SaaS that transforms exported WhatsApp conversations into visual yearly retrospectives with metrics, rankings, and share-ready screens. Reached 45,412 users and revenue exceeding R$ 25,000.",
        responsibilities: [
          "Full-stack architecture: algorithmic file processing pipeline, media generation, and payment gateway integration",
          "Serverless/Asynchronous infrastructure with 70% lower operational costs, processing 4,732 transactions",
          "Break-even in 48 hours with 100% self-funded operation",
          "75% reduction in time-to-market through AI-optimized development"
        ],
        tags: ["Next.js", "Serverless", "Payment Gateways", "Data Processing", "SaaS B2C"],
        image: "/zapwrapp.png",
        link: "https://zapwrapp.com",
        badge: "🚀 In Production",
        cta: "Visit Project"
      },
      {
        title: "Memoryiit — Digital Gifts Platform",
        subtitle: "COO & Co-Founder | Skyiit",
        description: "As COO and Co-founder of Skyiit, I coordinated the launch and operations of Memoryiit, a consolidated platform with 195,060 users, 63,000+ created memories, and revenue exceeding R$ 1,500,000.",
        responsibilities: [
          "Operational leadership of high-traffic and high-transaction platform",
          "Implementation of AI-assisted triage and support systems for 195k user base",
          "Structured automated workflows enabling scaling with lean team while maximizing profitability",
          "Operations management via Linear, support team leadership, and marketing content creation"
        ],
        tags: ["Product Management", "Operations", "AI Automation", "Team Leadership", "SaaS B2C"],
        image: "/memoryiit.png",
        link: "https://memoryiit.com",
        badge: "🚀 In Production",
        cta: "Visit Project"
      }
    ]
  }
};

export const PROJECTS_CONTENT = {
  pt: {
    title: "Projetos Recentes",
    portfolioLabel: "Portfólio",
    demo: "Demo",
    code: "Código",
    projects: [
      {
        id: 1,
        title: "Sistema para Barbearias",
        description: "Plataforma completa para barbearias, com agendamentos em tempo real, gestão de clientes e painel administrativo intuitivo. Utilizado diariamente em produção por estabelecimentos reais.",
        tags: ["Next.js", "Firebase", "SaaS", "Agendamentos"],
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800",
        link: "https://barber-agenda.vercel.app",
        githubRepo: "https://github.com/ArielAio/Barber.git",
      },
      {
        id: 2,
        title: "Strike System — Gestão para Academias",
        description: "Sistema completo para academias, incluindo controle de acesso, gestão de alunos, treinos, planos e dashboard administrativo. Desenvolvido com foco em escalabilidade e alta performance.",
        tags: ["Next.js", "Gestão de Academia", "Dashboard Administrativo", "SaaS"],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
        link: "https://strike-system.vercel.app/signIn",
        githubRepo: "https://github.com/ArielAio/strike.git",
      },
      {
        id: 3,
        title: "Assistente de IA",
        description: "Chatbot inteligente integrado à API Sabiá 3, com processamento de linguagem natural, respostas contextuais e fluxo otimizado para interações rápidas e naturais.",
        tags: ["IA", "Chatbot", "NLP", "API Sabiá 3", "Integração de API"],
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
        link: "https://chat-bot-gules-chi.vercel.app",
        githubRepo: "https://github.com/ArielAio/ChatBot.git",
      },
      {
        id: 4,
        title: "CodeWise — Plataforma EAD",
        description: "Plataforma de cursos online desenvolvida em Next.js, com foco em usabilidade, fluxo intuitivo de aprendizado e experiência otimizada para estudantes e criadores.",
        tags: ["Next.js", "LMS", "Educação Online"],
        image: "/CodeWise.png",
        link: "http://codewise-liart.vercel.app/",
        githubRepo: "https://github.com/ArielAio/codewise.git",
      },
    ]
  },
  en: {
    title: "Recent Projects",
    portfolioLabel: "Portfolio",
    demo: "Demo",
    code: "Code",
    projects: [
      {
        id: 1,
        title: "Barbershop System",
        description: "Complete platform for barbershops featuring real-time scheduling, client management, and an intuitive administrative panel. Used daily in production by real establishments.",
        tags: ["Next.js", "Firebase", "SaaS", "Scheduling"],
        image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800",
        link: "https://barber-agenda.vercel.app",
        githubRepo: "https://github.com/ArielAio?tab=repositories",
      },
      {
        id: 2,
        title: "Strike System — Gym Management",
        description: "Complete system for gyms including access control, student management, workouts, plans, and administrative dashboard. Developed with a focus on scalability and high performance.",
        tags: ["Next.js", "Gym Management", "Admin Dashboard", "SaaS"],
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800",
        link: "https://strike-system.vercel.app/signIn",
        githubRepo: "https://github.com/ArielAio?tab=repositories",
      },
      {
        id: 3,
        title: "AI Assistant",
        description: "Intelligent chatbot integrated with Sabiá 3 API, featuring natural language processing, contextual responses, and an optimized flow for fast and natural interactions.",
        tags: ["AI", "Chatbot", "NLP", "Sabiá 3 API", "API Integration"],
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
        link: "https://chat-bot-gules-chi.vercel.app",
        githubRepo: "https://github.com/ArielAio?tab=repositories",
      },
      {
        id: 4,
        title: "CodeWise — E-Learning Platform",
        description: "Online course platform developed in Next.js, focusing on usability, intuitive learning flow, and optimized experience for students and creators.",
        tags: ["Next.js", "LMS", "Online Education"],
        image: "/CodeWise.png",
        link: "http://codewise-liart.vercel.app/",
        githubRepo: "https://github.com/ArielAio?tab=repositories",
      },
    ]
  }
};

export const SKILLS_CONTENT = {
  pt: {
    title: "Stack ",
    titleHighlight: "Tecnológico",
    description: "Tecnologias que venho desenvolvendo através de experiência profissional e projetos de produção.",
    skills: [
      {
        name: "React / Next.js",
        time: "2 anos (prof. + produção)",
        category: 'frontend',
        description: "Desenvolvimento profissional (EnterScience) e produtos em produção (ZapWrapp, Memoryiit). Experiência com SSR, CSR, otimização de performance e SEO."
      },
      {
        name: "TypeScript / JavaScript",
        time: "2 anos (prof. + produção)",
        category: 'frontend',
        description: "Uso profissional e em produtos escaláveis. Tipagem avançada, interfaces, generics e arquitetura type-safe."
      },
      {
        name: "Laravel / PHP",
        time: "1 ano (profissional)",
        category: 'backend',
        description: "Experiência profissional: desenvolvimento de APIs, integrações com LLMs, validação de dados e manutenção de sistemas em produção."
      },
      {
        name: "Node.js / Serverless",
        time: "2 anos (produção)",
        category: 'backend',
        description: "Arquitetura serverless para produtos em produção. APIs RESTful, processamento assíncrono e microserviços com redução de 70% em custos operacionais."
      },
      {
        name: "PostgreSQL / MySQL",
        time: "2 anos (prof. + produção)",
        category: 'backend',
        description: "Manutenção profissional (EnterScience) e uso em produção. Otimização de queries, índices e modelagem de dados para alto volume."
      },
      {
        name: "Firebase / Redis",
        time: "2 anos (produção)",
        category: 'backend',
        description: "Firebase em produtos reais (autenticação, Firestore, Storage) e Redis para jobs/filas em processamento assíncrono."
      },
      {
        name: "Stripe / Mercado Pago / Woovi",
        time: "1 ano (produção)",
        category: 'backend',
        description: "Integração de gateways de pagamento em produtos com +4.700 transações reais. Webhooks, assinaturas e checkouts otimizados."
      },
      {
        name: "Git / GitHub / CI/CD",
        time: "2 anos",
        category: 'tools',
        description: "Controle de versão profissional e em equipe. Workflows automatizados, deploys contínuos e code reviews."
      },
      {
        name: "IA & Automação",
        time: "2 anos",
        category: 'tools',
        description: "Engenharia assistida por IA (Cursor/Claude), Prompt Engineering, integração de LLMs em produção e automação de fluxos operacionais."
      },
      {
        name: "Metodologias Ágeis / Linear",
        time: "2 anos",
        category: 'tools',
        description: "Scrum, sprints e gestão de operações em produtos reais. Experiência como COO coordenando times via Linear."
      },
    ]
  },
  en: {
    title: "Tech ",
    titleHighlight: "Stack",
    description: "Technologies developed through professional experience and production projects.",
    skills: [
      {
        name: "React / Next.js",
        time: "2 years (prof. + production)",
        category: 'frontend',
        description: "Professional development (EnterScience) and production products (ZapWrapp, Memoryiit). Experience with SSR, CSR, performance optimization, and SEO."
      },
      {
        name: "TypeScript / JavaScript",
        time: "2 years (prof. + production)",
        category: 'frontend',
        description: "Professional and scalable product use. Advanced typing, interfaces, generics, and type-safe architecture."
      },
      {
        name: "Laravel / PHP",
        time: "1 year (professional)",
        category: 'backend',
        description: "Professional experience: API development, LLM integrations, data validation, and production system maintenance."
      },
      {
        name: "Node.js / Serverless",
        time: "2 years (production)",
        category: 'backend',
        description: "Serverless architecture for production products. RESTful APIs, asynchronous processing, and microservices with 70% reduction in operational costs."
      },
      {
        name: "PostgreSQL / MySQL",
        time: "2 years (prof. + production)",
        category: 'backend',
        description: "Professional maintenance (EnterScience) and production use. Query optimization, indexes, and data modeling for high volume."
      },
      {
        name: "Firebase / Redis",
        time: "2 years (production)",
        category: 'backend',
        description: "Firebase in real products (authentication, Firestore, Storage) and Redis for job/queue processing."
      },
      {
        name: "Stripe / Mercado Pago / Woovi",
        time: "1 year (production)",
        category: 'backend',
        description: "Payment gateway integration in products with +4,700 real transactions. Webhooks, subscriptions, and optimized checkouts."
      },
      {
        name: "Git / GitHub / CI/CD",
        time: "2 years",
        category: 'tools',
        description: "Professional and team version control. Automated workflows, continuous deployments, and code reviews."
      },
      {
        name: "AI & Automation",
        time: "2 years",
        category: 'tools',
        description: "AI-assisted engineering (Cursor/Claude), Prompt Engineering, LLM integration in production, and operational workflow automation."
      },
      {
        name: "Agile Methodologies / Linear",
        time: "2 years",
        category: 'tools',
        description: "Scrum, sprints, and operations management in real products. Experience as COO coordinating teams via Linear."
      },
    ]
  }
};

export const CONTACT_CONTENT = {
  pt: {
    title: "Vamos trabalhar ",
    titleHighlight: "juntos?",
    description: "Tem um projeto em mente ou quer apenas dar um oi? Sinta-se à vontade para me mandar uma mensagem.",
    copyEmail: "Email",
    copied: "Copiado!",
    formName: "Nome",
    formNamePlaceholder: "Seu nome",
    formEmail: "Email",
    formEmailPlaceholder: "seu@email.com",
    formMessage: "Mensagem",
    formMessagePlaceholder: "Fale sobre seu projeto...",
    sendButton: "Enviar Mensagem",
    sending: "Enviando...",
    sent: "Mensagem Enviada!",
    footerRights: "Todos os direitos reservados."
  },
  en: {
    title: "Let's work ",
    titleHighlight: "together?",
    description: "Have a project in mind or just want to say hi? Feel free to send me a message.",
    copyEmail: "Email",
    copied: "Copied!",
    formName: "Name",
    formNamePlaceholder: "Your name",
    formEmail: "Email",
    formEmailPlaceholder: "your@email.com",
    formMessage: "Message",
    formMessagePlaceholder: "Tell me about your project...",
    sendButton: "Send Message",
    sending: "Sending...",
    sent: "Message Sent!",
    footerRights: "All rights reserved."
  }
};

export const SOCIALS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/ArielAio", icon: Github },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/ariel-aio/", icon: Linkedin },
  { platform: "Email", url: "mailto:arielaio@hotmail.com", icon: Mail },
];
