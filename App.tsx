import React, { useEffect, useMemo, useState } from 'react';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import {
  EXPERIENCE_CONTENT,
  FEATURED_PROJECTS,
  PROJECTS_CONTENT,
  SKILLS_CONTENT,
} from './constants';

type Language = 'pt' | 'en';
type Route = string;

const routes = ['/', '/work', '/resume', '/contact'];
const workSlugs = ['zapwrapp', 'memoryiit', 'barbearias', 'strike-system', 'assistente-ia', 'codewise'];

const copy = {
  pt: {
    nav: [
      { label: 'Início', path: '/' as Route },
      { label: 'Trabalhos', path: '/work' as Route },
      { label: 'Currículo', path: '/resume' as Route },
      { label: 'Contato', path: '/contact' as Route },
    ],
    hello: 'Diga olá',
    homeTitle: 'Ariel André Aio',
    homeParagraphs: [
      'Sou desenvolvedor full-stack com atuação direta em produto, operação e automação. Tenho experiência construindo sistemas web, integrando pagamentos, estruturando fluxos assíncronos e colocando produtos digitais em produção com foco em clareza, performance e manutenção simples.',
      'No ZapWrapp, desenvolvi um SaaS B2C que transforma conversas exportadas do WhatsApp em retrospectivas visuais, passando por arquitetura, processamento de arquivos, checkout e entrega final ao usuário. No Memoryiit, atuei em desenvolvimento full-stack e sustentação de produto, apoiando operação, atendimento e melhoria contínua do sistema.',
      'Minha stack principal passa por React, Next.js, TypeScript, Laravel, Node.js, bancos relacionais, Firebase, Redis, integrações de pagamento e automações com IA. Gosto de trabalhar onde engenharia encontra resultado: reduzir trabalho manual, melhorar atendimento, organizar dados e criar produtos que resolvem problemas reais.',
      'Também curso Sistemas de Informação no IFSP e tenho formação técnica em informática pela ETEC. Essa base combina prática de produto em produção, rotina operacional e fundamento acadêmico para tomar decisões técnicas com responsabilidade.',
      'Se você está avaliando meu perfil para uma vaga, projeto ou oportunidade de colaboração, pode me chamar para conversarmos.',
    ],
    contactLink: 'falar comigo',
    workTitle: '/trabalhos.',
    workDescription: 'Produtos e projetos selecionados que mostram minha atuação entre desenvolvimento full-stack, produto, operação e automação.',
    backToWork: 'Voltar para trabalhos',
    projectRole: 'Papel',
    projectStack: 'Stack',
    projectLinks: 'Links',
    projectHighlights: 'Principais responsabilidades',
    projectCtaTitle: 'Vamos conversar sobre uma oportunidade?',
    projectCtaText: 'Estou aberto a oportunidades onde eu possa contribuir com desenvolvimento full-stack, operação de produto, automação e entrega de sistemas web bem estruturados.',
    projectCtaButton: 'Falar comigo',
    resumeTitle: 'Ariel André Aio',
    resumeRole: 'Desenvolvedor Full-Stack com atuação em Produto, Operações e Automação.',
    resumeSummary:
      'Experiência em sistemas em produção, incluindo ambiente público municipal com sistemas Fiorilli, produtos SaaS B2C, integrações, automações com IA e operação de plataformas digitais.',
    experienceTitle: 'Experiência',
    experienceIntro: 'Experiências profissionais, produtos em produção e responsabilidades mais relevantes.',
    techTitle: 'Tecnologias principais:',
    otherTitle: 'Outros:',
    educationTitle: 'Formação',
    contactTitle: 'Vamos conversar?',
    contactDescription: 'Se meu perfil fizer sentido para uma vaga, projeto ou parceria, envie uma mensagem. Eu respondo por e-mail.',
    name: 'Seu nome',
    email: 'Seu e-mail',
    message: 'Sua mensagem',
    send: 'Abrir e-mail',
    footerRights: '© Ariel André Aio 2026',
    site: 'arielaio.dev',
    location: 'Brasil',
  },
  en: {
    nav: [
      { label: 'Home', path: '/' as Route },
      { label: 'Work', path: '/work' as Route },
      { label: 'Resume', path: '/resume' as Route },
      { label: 'Contact', path: '/contact' as Route },
    ],
    hello: 'Say hello',
    homeTitle: 'Ariel André Aio',
    homeParagraphs: [
      'I am a full-stack developer working across product, operations, and automation. I have hands-on experience building web systems, integrating payments, structuring asynchronous flows, and shipping digital products with a focus on clarity, performance, and maintainability.',
      'At ZapWrapp, I developed a B2C SaaS that turns exported WhatsApp conversations into visual retrospectives, covering architecture, file processing, checkout, and final user delivery. At Memoryiit, I worked on full-stack development and product support, helping with operations, support, and continuous system improvement.',
      'My core stack includes React, Next.js, TypeScript, Laravel, Node.js, relational databases, Firebase, Redis, payment integrations, and AI automations. I like working where engineering connects to outcomes: reducing manual work, improving support, organizing data, and building products that solve real problems.',
      'I am also studying Information Systems at IFSP and have a technical background in IT from ETEC. This gives me a practical mix of production product work, daily operations, and academic fundamentals for responsible technical decisions.',
      'If you are evaluating my profile for a role, project, or collaboration opportunity, feel free to reach out.',
    ],
    contactLink: 'contact me',
    workTitle: '/work.',
    workDescription: 'Selected products and projects that show my work across full-stack development, product operations, and automation.',
    backToWork: 'Back to work',
    projectRole: 'Role',
    projectStack: 'Stack',
    projectLinks: 'Links',
    projectHighlights: 'Key responsibilities',
    projectCtaTitle: 'Let’s discuss an opportunity',
    projectCtaText: 'I am open to opportunities where I can contribute with full-stack development, product operations, automation, and well-structured web systems.',
    projectCtaButton: 'Contact me',
    resumeTitle: 'Ariel André Aio',
    resumeRole: 'Full-Stack Developer working across Product, Operations, and Automation.',
    resumeSummary:
      'Experience with production systems, including municipal public-sector work with Fiorilli systems, B2C SaaS products, integrations, AI automations, and digital platform operations.',
    experienceTitle: 'Experience',
    experienceIntro: 'Most relevant professional experiences, production products, and responsibilities.',
    techTitle: 'Core technologies:',
    otherTitle: 'Others:',
    educationTitle: 'Education',
    contactTitle: 'Let’s talk',
    contactDescription: 'If my profile fits a role, project, or partnership, send me a message. I will reply by email.',
    name: 'Your name',
    email: 'Your email',
    message: 'Your message',
    send: 'Open email',
    footerRights: '© Ariel André Aio 2026',
    site: 'arielaio.dev',
    location: 'Brazil',
  },
};

const email = 'arielaio@hotmail.com';
const socialLinks = [
  { platform: 'GitHub', url: 'https://github.com/ArielAio', Icon: Github },
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/ariel-aio/', Icon: Linkedin },
  { platform: 'Email', url: `mailto:${email}`, Icon: Mail },
];

const projectDetails = {
  pt: {
    zapwrapp: {
      paragraphs: [
        'ZapWrapp é um SaaS B2C que transforma conversas exportadas do WhatsApp em retrospectivas visuais prontas para compartilhar. O produto exigiu uma experiência simples para o usuário final, mas com uma base técnica capaz de receber arquivos, processar conversas, extrair métricas relevantes e entregar uma visualização final consistente.',
        'Atuei no desenvolvimento full-stack, cuidando da arquitetura do produto, do pipeline de processamento, da integração de pagamento e da entrega das telas finais. O projeto chegou ao break-even em 48 horas, passou de R$ 25 mil em faturamento desde o lançamento e processou milhares de transações em uma operação autofinanciada.',
      ],
      highlights: [
        'Desenho do fluxo completo do produto, da importação do arquivo até a entrega da retrospectiva visual.',
        'Pipeline algorítmico para leitura, tratamento e extração de informações de conversas exportadas.',
        'Checkout, validação de pagamentos e integração do pagamento ao fluxo de liberação do produto.',
        'Infraestrutura serverless e assíncrona para manter custo operacional baixo e suportar picos de uso.',
      ],
    },
    memoryiit: {
      paragraphs: [
        'Memoryiit é uma plataforma digital em produção na qual atuei com desenvolvimento full-stack e sustentação de produto entre 2025 e 2026. O trabalho envolveu apoiar a operação, acompanhar dúvidas de usuários, entender problemas recorrentes e contribuir para melhorias no sistema.',
        'Minha atuação ficou concentrada na ponte entre operação e produto: triagem de demandas, organização de fluxos de atendimento, priorização de problemas e tradução de necessidades observadas na rotina em ajustes mais claros para a experiência do usuário.',
      ],
      highlights: [
        'Sustentação de produto digital em produção.',
        'Triagem de dúvidas, problemas operacionais e necessidades de melhoria.',
        'Organização de fluxos de atendimento e priorização de demandas recorrentes.',
        'Comunicação entre operação e evolução do sistema.',
      ],
    },
    barbearias: {
      paragraphs: [
        'Sistema para Barbearias é uma plataforma de agendamentos e gestão para estabelecimentos reais. A proposta foi concentrar agenda, clientes e painel administrativo em uma experiência objetiva, adequada para uso recorrente por quem precisa consultar horários e organizar atendimentos diariamente.',
        'O foco técnico ficou em organização de dados, clareza de navegação e um fluxo de agendamento sem fricção. É um projeto direto, pensado para resolver uma dor operacional comum com uma interface simples, responsiva e sem excesso de configuração.',
      ],
      highlights: [
        'Agenda com fluxo direto para criação, consulta e acompanhamento de horários.',
        'Organização de clientes e dados operacionais relevantes para o estabelecimento.',
        'Painel administrativo pensado para uso recorrente e leitura rápida das informações.',
        'Interface responsiva para acesso em desktop e celular durante a rotina de atendimento.',
      ],
    },
    'strike-system': {
      paragraphs: [
        'Strike System é um sistema de gestão para academias, cobrindo cadastro de alunos, planos, treinos, controle de acesso, dashboard administrativo e visão geral da operação.',
        'O projeto explora uma área em que consistência de dados, clareza de painel e rapidez de consulta são essenciais. A ideia foi montar uma base organizada para acompanhar alunos e rotinas administrativas sem depender de planilhas soltas ou controles manuais espalhados.',
      ],
      highlights: [
        'Dashboard administrativo para apoiar a leitura da operação da academia.',
        'Modelagem de entidades como alunos, planos, treinos e registros administrativos.',
        'Fluxos de gestão pensados para rotina de cadastro, acompanhamento e consulta.',
        'Estrutura preparada para evolução gradual de funcionalidades sem comprometer a base do sistema.',
      ],
    },
    'assistente-ia': {
      paragraphs: [
        'Assistente de IA é um chatbot integrado à API Sabiá 3, criado para testar uma experiência de conversa natural, rápida e contextual em uma interface simples.',
        'O foco foi conectar a aplicação ao modelo, organizar o fluxo de mensagens, manter o estado da conversa e apresentar respostas de forma clara para o usuário. O projeto demonstra integração prática com API de linguagem natural sem transformar a experiência em algo técnico demais para quem utiliza.',
      ],
      highlights: [
        'Integração com API de linguagem natural para geração de respostas contextuais.',
        'Fluxo de chat com envio, resposta e manutenção do estado da conversa.',
        'Tratamento de mensagens para preservar uma experiência fluida e fácil de testar.',
        'Interface simples para validar rapidamente o comportamento de um assistente conversacional.',
      ],
    },
    codewise: {
      paragraphs: [
        'CodeWise é uma plataforma EAD desenvolvida em Next.js, com foco em experiência de aprendizado, organização de cursos online e navegação clara para consumo de conteúdo.',
        'O projeto prioriza uma base visual mais polida e uma estrutura que simula um produto educacional real. A proposta foi trabalhar uma experiência que faça sentido tanto para estudantes quanto para criadores, com fluxo intuitivo e espaço para expansão de módulos educacionais.',
      ],
      highlights: [
        'Estrutura de plataforma de cursos online com foco em organização de conteúdo.',
        'Interface voltada para navegação, leitura e consumo de aulas ou módulos.',
        'Experiência responsiva para estudantes acessarem o produto em diferentes telas.',
        'Base visual preparada para evolução de módulos educacionais e fluxos de aprendizado.',
      ],
    },
  },
  en: {
    zapwrapp: {
      paragraphs: [
        'ZapWrapp is a B2C SaaS that turns exported WhatsApp conversations into share-ready visual retrospectives. The product needed to feel simple for end users while relying on a technical foundation capable of receiving files, processing conversations, extracting meaningful metrics, and delivering a consistent final experience.',
        'I worked on full-stack development, covering product architecture, the processing pipeline, payment integration, and final screen delivery. The project reached break-even in 48 hours, passed R$ 25k in revenue since launch, and processed thousands of transactions in a self-funded operation.',
      ],
      highlights: [
        'Designed the full product flow, from file import to final visual retrospective delivery.',
        'Built an algorithmic pipeline for reading, processing, and extracting information from exported conversations.',
        'Integrated checkout, payment validation, and product unlock logic into the user journey.',
        'Used serverless and asynchronous infrastructure to keep operating costs low and support usage spikes.',
      ],
    },
    memoryiit: {
      paragraphs: [
        'Memoryiit is a production digital platform where I worked on full-stack development and product support between 2025 and 2026. The work involved supporting operations, following user questions, understanding recurring issues, and contributing to system improvements.',
        'My contribution focused on the connection between operations and product: demand triage, support flow organization, issue prioritization, and translating day-to-day needs into clearer improvements for the user experience.',
      ],
      highlights: [
        'Support for a production digital product.',
        'Triage of user questions, operational issues, and improvement needs.',
        'Organization of support flows and recurring demand prioritization.',
        'Communication between operations and product evolution.',
      ],
    },
    barbearias: {
      paragraphs: [
        'Barbershop System is a scheduling and management platform for real establishments. The goal was to bring appointments, clients, and admin workflows into a focused experience suitable for daily use by people who need to check time slots and organize appointments quickly.',
        'The technical focus was data organization, clear navigation, and a low-friction booking flow. It is a direct project built to solve a common operational pain with a simple, responsive interface and without unnecessary configuration.',
      ],
      highlights: [
        'Appointment flow for creating, checking, and tracking bookings.',
        'Organization of clients and operational data relevant to the establishment.',
        'Admin panel designed for repeated use and fast information scanning.',
        'Responsive interface for desktop and mobile access during daily operations.',
      ],
    },
    'strike-system': {
      paragraphs: [
        'Strike System is a gym management system covering student records, plans, workouts, access control, administrative dashboard, and operational overview.',
        'The project explores a domain where data consistency, dashboard clarity, and fast lookup matter. The idea was to build an organized base to track students and administrative routines without relying on scattered spreadsheets or manual controls.',
      ],
      highlights: [
        'Admin dashboard to support operational visibility for the gym.',
        'Data modeling for students, plans, workouts, and administrative records.',
        'Management flows designed for registration, tracking, and lookup routines.',
        'Structure prepared for gradual feature growth without compromising the system base.',
      ],
    },
    'assistente-ia': {
      paragraphs: [
        'AI Assistant is a chatbot integrated with the Sabiá 3 API, built to test a fast, natural, and contextual conversation experience in a simple interface.',
        'The focus was connecting the application to the model, organizing the message flow, preserving conversation state, and presenting responses clearly to the user. The project demonstrates a practical natural language API integration without making the experience too technical for the person using it.',
      ],
      highlights: [
        'Natural language API integration for contextual response generation.',
        'Chat flow with message sending, response handling, and conversation state.',
        'Message handling to preserve a fluid and easy-to-test experience.',
        'Simple interface for quickly validating conversational assistant behavior.',
      ],
    },
    codewise: {
      paragraphs: [
        'CodeWise is an e-learning platform built with Next.js, focused on learning experience, online course organization, and clear navigation for content consumption.',
        'The project prioritizes a polished visual base and a structure that simulates a real education product. The goal was to shape an experience that makes sense for both students and creators, with an intuitive flow and room to expand educational modules.',
      ],
      highlights: [
        'Online course platform structure focused on content organization.',
        'Interface designed for navigation, reading, and lesson or module consumption.',
        'Responsive experience for students across different screen sizes.',
        'Visual base prepared for future educational modules and learning flows.',
      ],
    },
  },
};

function normalizePath(pathname: string): Route {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  if (routes.includes(cleanPath) || cleanPath.startsWith('/work/')) return cleanPath;
  return '/';
}

export default function App() {
  const [language, setLanguage] = useState<Language>('pt');
  const [route, setRoute] = useState<Route>(() => normalizePath(window.location.pathname));
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[language];
  const isResumeRoute = route === '/resume';
  const toggleLanguage = () => setLanguage((current) => (current === 'pt' ? 'en' : 'pt'));

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  useEffect(() => {
    const onPopState = () => setRoute(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: Route) => {
    if (path !== route) {
      window.history.pushState({}, '', path);
      setRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const page = useMemo(() => {
    if (route === '/work') return <WorkPage language={language} t={t} />;
    if (route.startsWith('/work/')) {
      return <ProjectDetailPage language={language} navigate={navigate} slug={route.split('/').pop() || ''} t={t} />;
    }
    if (route === '/resume') return <ResumePage language={language} t={t} toggleLanguage={toggleLanguage} />;
    if (route === '/contact') return <ContactPage t={t} />;
    return <HomePage t={t} navigate={navigate} />;
  }, [language, route, t]);

  return (
    <div className={`site-shell ${isResumeRoute ? 'resume-shell' : ''}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      {!isResumeRoute && (
        <Header
          language={language}
          menuOpen={menuOpen}
          route={route}
          t={t}
          navigate={navigate}
          toggleLanguage={toggleLanguage}
          toggleMenu={() => setMenuOpen(!menuOpen)}
        />
      )}
      <main id="main" tabIndex={-1}>
        {page}
      </main>
      {route !== '/resume' && <Footer t={t} navigate={navigate} />}
    </div>
  );
}

function Header({
  language,
  menuOpen,
  route,
  t,
  navigate,
  toggleLanguage,
  toggleMenu,
}: {
  language: Language;
  menuOpen: boolean;
  route: Route;
  t: typeof copy.pt;
  navigate: (path: Route) => void;
  toggleLanguage: () => void;
  toggleMenu: () => void;
}) {
  return (
    <header className="site-header">
      <button className="wordmark" type="button" onClick={() => navigate('/')} aria-label="Ir para o início">
        ariel<span>.</span>
      </button>

      <div className="header-actions">
        <button className="language-toggle" type="button" onClick={toggleLanguage}>
          {language === 'pt' ? 'EN' : 'PT'}
        </button>
        <button
          aria-controls="contact-menu"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          type="button"
          onClick={toggleMenu}
        >
          <span />
          <span />
        </button>
      </div>

      <nav id="contact-menu" className={`menu-panel ${menuOpen ? 'is-open' : ''}`} aria-label="Menu principal">
        <ul className="menu-links">
          {t.nav.map((item) => (
            <li key={item.path}>
              <button
                className={(item.path === '/work' ? route.startsWith('/work') : route === item.path) ? 'active' : ''}
                type="button"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <ContactLinks t={t} />
        <SocialLinks compact />
      </nav>
    </header>
  );
}

function HomePage({ t, navigate }: { t: typeof copy.pt; navigate: (path: Route) => void }) {
  return (
    <section className="home-content">
      <h1>{t.homeTitle}</h1>
      {t.homeParagraphs.map((paragraph, index) => (
        <p key={paragraph}>
          {paragraph}
          {index === t.homeParagraphs.length - 1 ? (
            <>
              {' '}
              <button className="inline-link" type="button" onClick={() => navigate('/contact')}>
                {t.contactLink}
              </button>
              .
            </>
          ) : null}
        </p>
      ))}
    </section>
  );
}

function WorkPage({ language, t }: { language: Language; t: typeof copy.pt }) {
  const featured = FEATURED_PROJECTS[language].projects;
  const projects = PROJECTS_CONTENT[language].projects;
  const workItems = [...featured, ...projects].map((project, index) => ({
    ...project,
    slug: workSlugs[index],
  }));

  return (
    <>
      <PageHeader title={t.workTitle} description={t.workDescription} />
      <section className="work-grid" aria-label={t.workDescription}>
        {workItems.map((project) => (
          <article className="project-card" key={project.title}>
            <a className="project-card-link" href={`/work/${project.slug}`}>
              <span>{project.title}</span>
            </a>
            <figure>
              <img src={project.image} alt="" loading="lazy" />
            </figure>
            <div className="project-info">
              <h2>{project.title}</h2>
              <p>{project.description || project.subtitle}</p>
              {project.link ? (
                <a className="project-url" href={project.link} target="_blank" rel="noreferrer noopener">
                  {project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </a>
              ) : (
                <span>{project.cta}</span>
              )}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

function ProjectDetailPage({
  language,
  navigate,
  slug,
  t,
}: {
  language: Language;
  navigate: (path: Route) => void;
  slug: string;
  t: typeof copy.pt;
}) {
  const projects = [...FEATURED_PROJECTS[language].projects, ...PROJECTS_CONTENT[language].projects];
  const index = workSlugs.indexOf(slug);
  const project = projects[index];
  const details = projectDetails[language][slug as keyof typeof projectDetails.pt];

  if (!project || !details) return <WorkPage language={language} t={t} />;

  return (
    <article className="project-detail">
      <button className="back-link" type="button" onClick={() => navigate('/work')}>
        {t.backToWork}
      </button>

      <header className="project-detail-header">
        <h1>{project.title}</h1>
        <p>{project.description || project.subtitle}</p>
      </header>

      <figure className="project-detail-hero">
        <img src={project.image} alt="" />
      </figure>

      <div className="project-detail-layout">
        <section className="project-detail-copy">
          {details.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>

        <aside className="project-detail-meta">
          <h2>{t.projectRole}</h2>
          <p>{project.subtitle || project.title}</p>

          <h2>{t.projectStack}</h2>
          <ul>
            {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>

          <h2>{t.projectLinks}</h2>
          {project.link ? (
            <a href={project.link} target="_blank" rel="noreferrer noopener">
              {project.link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </a>
          ) : null}
          {'githubRepo' in project && project.githubRepo ? (
            <a href={project.githubRepo} target="_blank" rel="noreferrer noopener">GitHub</a>
          ) : null}
        </aside>
      </div>

      <section className="project-highlights">
        <h2>{t.projectHighlights}</h2>
        <ul>
          {details.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
      </section>

      <section className="project-cta">
        <div>
          <h2>{t.projectCtaTitle}</h2>
          <p>{t.projectCtaText}</p>
        </div>
        <button type="button" onClick={() => navigate('/contact')}>{t.projectCtaButton}</button>
      </section>
    </article>
  );
}

function ResumePage({
  language,
  t,
  toggleLanguage,
}: {
  language: Language;
  t: typeof copy.pt;
  toggleLanguage: () => void;
}) {
  const experience = EXPERIENCE_CONTENT[language];
  const skills = SKILLS_CONTENT[language].skills;
  const core = skills.filter((skill) => skill.category !== 'tools');
  const tools = skills.filter((skill) => skill.category === 'tools');

  return (
    <article className="resume-page">
      <nav className="resume-actions" aria-label="Ações do currículo">
        <a className="resume-linkedin" href="https://www.linkedin.com/in/ariel-aio/" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn">
          <Linkedin aria-hidden="true" />
        </a>
        <button className="resume-language" type="button" onClick={toggleLanguage} aria-label="Mudar idioma">
          {language === 'pt' ? 'EN' : 'PT'}
        </button>
        <a className="resume-download" href="/Curriculo_Ariel_Aio.pdf" target="_blank" rel="noreferrer noopener">
          <Download aria-hidden="true" />
          <span>{language === 'pt' ? 'Baixar' : 'Download'}</span>
        </a>
      </nav>

      <aside className="resume-sidebar">
        <section>
          <a href="/">{t.site}</a>
          <span>{t.location}</span>
          <a href={`mailto:${email}`}>{email}</a>
        </section>
        <SkillList title={t.techTitle} skills={core.map((skill) => skill.name)} />
        <SkillList title={t.otherTitle} skills={tools.map((skill) => skill.name)} />
      </aside>

      <div className="resume-main">
        <header className="resume-hero">
          <h1>{t.resumeTitle}</h1>
          <h2>{t.resumeRole}</h2>
          <p>{t.resumeSummary}</p>
        </header>

        <section className="resume-section">
          <h3>{t.experienceTitle}</h3>
          <p>{t.experienceIntro}</p>
          <ul className="resume-list">
            {experience.experience.map((item) => (
              <li key={item.id} className={item.company.includes('Prefeitura') ? 'resume-featured-experience' : undefined}>
                <header>
                  <h4>{item.company} <span>{item.role}</span></h4>
                  <span>{item.period}</span>
                </header>
                <p>{item.description}</p>
                {item.details && (
                  <ul>
                    {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="resume-section">
          <h3>{t.educationTitle}</h3>
          <ul className="resume-list">
            {experience.education.map((item) => (
              <li key={item.id}>
                <header>
                  <h4>{item.institution} <span>{item.degree}</span></h4>
                  <span>{item.period}</span>
                </header>
                {item.description && <p>{item.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}

function ContactPage({ t }: { t: typeof copy.pt }) {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [message, setMessage] = useState('');

  const openEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Contato via portfolio - ${name || 'sem nome'}`);
    const body = encodeURIComponent(`${message}\n\nNome: ${name}\nEmail: ${from}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-page">
      <h1>{t.contactTitle}</h1>
      <p>{t.contactDescription}</p>
      <form onSubmit={openEmail}>
        <label>
          {t.name}
          <input value={name} onChange={(event) => setName(event.target.value)} placeholder={t.name} required />
        </label>
        <label>
          {t.email}
          <input
            type="email"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            placeholder={t.email}
            required
          />
        </label>
        <label className="full">
          {t.message}
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t.message}
            required
          />
        </label>
        <button type="submit">{t.send}</button>
      </form>
    </section>
  );
}

function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

function SkillList({ title, skills }: { title: string; skills: string[] }) {
  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {skills.map((skill) => <li key={skill}>{skill}</li>)}
      </ul>
    </section>
  );
}

function ContactLinks({ t }: { t: typeof copy.pt }) {
  return (
    <div className="contact-links">
      <span>{t.hello}</span>
      <a href={`mailto:${email}`}>{email}</a>
      <a href="https://www.linkedin.com/in/ariel-aio/" target="_blank" rel="noreferrer noopener">
        linkedin.com/in/ariel-aio
      </a>
    </div>
  );
}

function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={`social-links ${compact ? 'compact' : ''}`}>
      {socialLinks.map((social) => (
        <li key={social.platform}>
          <a href={social.url} target="_blank" rel="noreferrer noopener" aria-label={social.platform}>
            <social.Icon aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Footer({ t, navigate }: { t: typeof copy.pt; navigate: (path: Route) => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <ContactLinks t={t} />
        <nav aria-label="Rodapé">
          {t.nav.map((item) => (
            <button key={item.path} type="button" onClick={() => navigate(item.path)}>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>{t.footerRights}</span>
        <SocialLinks />
      </div>
    </footer>
  );
}
