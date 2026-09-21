import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, BarChart3, Braces, Check, ChevronDown, Code2, Database, ExternalLink, GitBranch, CodeXml as Github, GraduationCap, HeartHandshake, SquareUserRound as Linkedin, Mail, Menu, Terminal, X } from 'lucide-react';
import { academicProjects, dataProjects, profile } from './data/portfolio';
import { AcademicProjectModal } from './AcademicProjectModal';
import type { AcademicProject, DataProject } from './data/portfolio';

const navigation = [['sobre', 'Sobre'], ['habilidades', 'Habilidades'], ['projetos', 'Projetos'], ['experiencia', 'Experiência']] as const;
const skills = [
  { name: 'Python', detail: 'Análise & automação', icon: Terminal, color: 'blue' },
  { name: 'pandas', detail: 'Manipulação de dados', icon: Braces, color: 'purple' },
  { name: 'Matplotlib', detail: 'Visualização de dados', icon: BarChart3, color: 'orange' },
  { name: 'SQL / PostgreSQL', detail: 'Consultas & bancos de dados', icon: Database, color: 'blue' },
  { name: 'Git / GitHub', detail: 'Versionamento & colaboração', icon: GitBranch, color: 'dark' },
];

function Tags({ items }: { items: string[] }) { return <div className="flex flex-wrap gap-2">{items.map(item => <span className="tag" key={item}>{item}</span>)}</div>; }

function ProjectCard({ project, index }: { project: DataProject; index: number }) {
  const [chart, setChart] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const charts = project.charts ?? [];
  const activeChart = charts[chart];
  return <article className={`project-card ${project.featured ? 'featured-project' : ''} ${activeChart ? '' : 'project-without-visual'}`}>
    <div className="project-content">
      <div className="flex flex-wrap items-center gap-3"><span className="project-number">{String(index + 1).padStart(2, '0')}</span><span className="eyebrow">{project.category}</span>{project.featured && <span className="featured-badge">Em destaque</span>}</div>
      <h3>{project.title}</h3><p className="muted project-description">{project.description}</p>
      <Tags items={project.tools} />
      <div className="project-questions"><span className="small-label">PERGUNTAS QUE GUIARAM A ANÁLISE</span>{project.questions.map(question => <p key={question}><Check size={15} aria-hidden="true" />{question}</p>)}</div>
      <div className="project-actions">{project.repository && <a className="button button-dark" href={project.repository} target="_blank" rel="noreferrer"><Github size={17} /> Ver projeto no GitHub <ArrowUpRight size={16} /></a>}
      {project.findings.length > 0 && <button className="text-button" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={expanded ? `findings-${project.id}` : undefined}>{expanded ? 'Fechar conclusões' : 'Ler conclusões'}<ChevronDown className={expanded ? 'rotated' : ''} size={16} /></button>}</div>
    </div>
    {activeChart && <div className="project-visual">
      <div className="visual-top"><span className={project.id === 'netflix' ? 'netflix-logo' : 'eyebrow'}>{project.visualLabel ?? 'ANÁLISE DE DADOS'}</span><span className="mono">EXPLORAÇÃO / {String(index + 1).padStart(2, '0')}</span></div>
      <div className="chart-sheet"><div className="chart-heading"><BarChart3 size={16} /><span>{activeChart.title}</span></div>
        {failedImages.includes(activeChart.src) ? <div className="chart-fallback"><BarChart3 size={32} /><p>Confira o gráfico original no repositório.</p><a href={activeChart.url} target="_blank" rel="noreferrer">Abrir gráfico <ExternalLink size={14} /></a></div> : <a className="chart-image-link" href={activeChart.url} target="_blank" rel="noreferrer" aria-label={`Abrir gráfico: ${activeChart.title}`}><img src={activeChart.src} alt={activeChart.alt} onError={() => setFailedImages(images => [...images, activeChart.src])} /></a>}
        <div className="chart-selectors" aria-label="Selecionar gráfico">{charts.map((item, i) => <button key={item.src} onClick={() => setChart(i)} aria-pressed={chart === i} className={chart === i ? 'selected' : ''}>{item.label}</button>)}</div>
      </div><div className="visual-bottom"><span>{project.source ? `Fonte · ${project.source.label}` : 'Visualização de dados'}</span><span>{project.tools.join(' + ')}</span></div>
    </div>}
    {expanded && <div className="project-findings" id={`findings-${project.id}`}><div><span className="eyebrow">Da exploração às conclusões</span><h4>O que encontrei nos dados</h4>{project.scope && <p>{project.scope}</p>}</div><ol>{project.findings.map((finding, i) => <li key={finding}><span>0{i + 1}</span>{finding}</li>)}</ol>{project.source && <a href={project.source.url} target="_blank" rel="noreferrer">Consultar dataset · {project.source.label} <ArrowUpRight size={15} /></a>}</div>}
  </article>;
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState<AcademicProject | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0c1422' : '#f7f8fa');
    try { localStorage.setItem('portfolio-theme', theme); } catch { /* O tema funciona mesmo sem armazenamento. */ }
  }, [theme]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 801px)');
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    desktop.addEventListener('change', closeOnDesktop);
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      desktop.removeEventListener('change', closeOnDesktop);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);
  return <>
    {selectedProject && <AcademicProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <header className="site-header"><div className="container header-inner"><a href="#inicio" className="brand" aria-label="Luís Gustavo, início"><span className="brand-mark">lg<span>.</span></span><span>Luís Gustavo<span className="brand-subtitle">PORTFÓLIO DE DADOS</span></span></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{navigation.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <a className="header-contact" href="#contato">Vamos conversar <ArrowUpRight size={15} /></a>
      <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'} title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</button>
      <button ref={menuButtonRef} className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls={menuOpen ? 'mobile-menu' : undefined}>{menuOpen ? <X /> : <Menu />}</button></div>
      {menuOpen && <nav id="mobile-menu" className="mobile-nav" aria-label="Navegação móvel">{[...navigation, ['contato', 'Contato']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
    </header>
    <main id="conteudo" tabIndex={-1}>
      <section id="inicio" className="hero container">
        <div className="hero-copy"><div className="availability"><span /> Em busca da primeira oportunidade em dados</div>
          <p className="hero-intro">OLÁ, EU SOU O LUÍS GUSTAVO</p>
          <h1>Curiosidade que vira<br />{' '}<span>análise.</span><br />{' '}Dados que contam<br className="desktop-break" /> histórias.</h1>
          <p className="hero-description">Estudante de Sistemas de Informação na PUC Minas, construindo meu caminho como <strong>analista de dados.</strong></p>
          <div className="hero-actions"><a href="#projetos" className="button button-primary">Conheça meus projetos <ArrowDown size={17} /></a><a href={profile.github} className="hero-github" target="_blank" rel="noreferrer"><Github size={19} /> GitHub <ArrowUpRight size={15} /></a></div>
        </div>
        <div className="hero-art" aria-label="Meu processo: explorar, analisar e comunicar dados">
          <div className="art-kicker"><span className="mono">UM OLHAR ANALÍTICO</span><span className="tiny-cross">+</span></div>
          <div className="analysis-window"><div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span>meu_processo.py</span><Code2 size={14} /></div>
            <div className="code-lines"><div><span>01</span><code><em>import</em> pandas <em>as</em> pd</code></div><div><span>02</span><code><em>import</em> matplotlib.pyplot <em>as</em> plt</code></div><div><span>03</span></div><div><span>04</span><code className="code-comment"># Toda análise começa com uma pergunta.</code></div><div><span>05</span><code>dados = pd.read_csv(<b>"possibilidades.csv"</b>)</code></div><div><span>06</span><code>dados.head()</code></div></div>
            <div className="process-flow"><div><Database /><span>01 / EXPLORAR</span><strong>Fazer perguntas</strong></div><ArrowRight className="flow-arrow" /><div><BarChart3 /><span>02 / ANALISAR</span><strong>Encontrar padrões</strong></div><ArrowRight className="flow-arrow" /><div><Braces /><span>03 / COMUNICAR</span><strong>Contar histórias</strong></div></div>
            <div className="window-footer"><span className="status-line"><Check size={13} /> Aprendizado contínuo</span><span>Python 3</span></div>
          </div>
          <div className="learning-note"><span className="note-icon"><GraduationCap size={22} /></span><span><strong>Transformando aprendizado em prática.</strong><small>Sistemas de Informação · PUC Minas</small></span></div>
          <span className="art-footnote mono">PERGUNTAR. EXPLORAR. DESCOBRIR.</span>
        </div>
        <div className="hero-bottom"><span>APRENDENDO COM DADOS. COMPARTILHANDO DESCOBERTAS.</span><a href="#sobre">Explore o portfólio <ArrowDown size={14} /></a></div>
      </section>

      <section id="sobre" className="section container about-section"><div><span className="section-label">01 — SOBRE MIM</span><h2>Uma mente curiosa.<br />{' '}Um caminho em <span>construção.</span></h2></div><div className="about-copy"><p>Sou estudante de <strong>Sistemas de Informação na PUC Minas</strong> e estou construindo minha carreira em análise de dados. Gosto de fazer perguntas, investigar padrões e transformar informações em algo que faça sentido.</p><p>Meu aprendizado acontece na prática: explorando bases de dados com Python, criando visualizações e desenvolvendo projetos durante a graduação. Também compartilho o que aprendo como professor voluntário de lógica de programação.</p><div className="education-line"><GraduationCap size={21} /><span>Sistemas de Informação <span className="muted">/ PUC Minas</span></span><span className="studying-badge">Em formação</span></div></div></section>

      <section id="habilidades" className="section container skills-section"><div className="section-heading"><div><span className="section-label">02 — HABILIDADES TÉCNICAS</span><h2>As ferramentas do meu dia a dia<span>.</span></h2></div><p className="muted">Da preparação dos dados<br />{' '}à comunicação dos resultados.</p></div><div className="skills-grid">{skills.map(({ name, detail, icon: Icon, color }) => <div className="skill-card" key={name}><span className={`skill-icon ${color}`}><Icon size={24} strokeWidth={1.7} /></span><h3>{name}</h3><p>{detail}</p></div>)}</div></section>

      <section id="projetos" className="projects-section"><div className="container"><div className="section-heading"><div><span className="section-label">03 — PROJETOS DE DADOS</span><h2>Menos achismos.<br />{' '}Mais <span>descobertas.</span></h2></div><p className="muted">Perguntas reais, dados abertos e muita curiosidade.<br />{' '}Um pouco do que venho construindo com análise de dados.</p></div><div className="projects-list">{dataProjects.map((project, index) => <ProjectCard project={project} index={index} key={project.id} />)}</div><div className="projects-note"><span>O próximo insight começa com uma boa pergunta.</span><a href={profile.github} target="_blank" rel="noreferrer">Acompanhe no GitHub <ArrowUpRight size={15} /></a></div></div></section>

      <section id="outros-projetos" className="section container other-projects"><div className="section-heading"><div><span className="section-label">04 — OUTROS PROJETOS</span><h2>Além dos dados<span>.</span></h2></div><p className="muted">Uma base construída na graduação.</p></div><div className="academic-grid">{academicProjects.map((project, i) => <article className="academic-card" key={project.title}><span className="academic-icon">{i === 0 ? <Code2 size={23} /> : <Braces size={23} />}</span><div><span className="small-label">{project.category}</span><h3>{project.title}</h3><p className="muted">{project.description}</p><Tags items={project.tools} /><button type="button" className="academic-link" aria-haspopup="dialog" aria-label={`Ver mais sobre ${project.title}`} onClick={() => setSelectedProject(project)}>Ver mais <ArrowUpRight size={15} /></button></div></article>)}</div><a href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer" className="text-button academic-all">Explorar meus repositórios <ArrowUpRight size={15} /></a></section>

      <section id="experiencia" className="section container experience-section"><div><span className="section-label">05 — EXPERIÊNCIA</span><h2>Aprender.<br />{' '}E ajudar a <span>aprender.</span></h2><p className="muted">Minha trajetória profissional está começando.<br />{' '}Minha vontade de contribuir, já está em prática.</p></div><article className="experience-card"><div className="experience-top"><span className="experience-icon"><HeartHandshake size={25} /></span><span className="volunteer-badge">Voluntariado</span></div><span className="small-label">PROJETO DE EXTENSÃO COMUNITÁRIA</span><h3>Professor voluntário</h3><span className="organization">Projeto Beira-Linha</span><p>Ensino Introdução à Lógica de Programação com C#, ajudando os alunos a dar os primeiros passos no desenvolvimento do raciocínio lógico.</p><div className="experience-bottom"><span>Comunicação</span><span>Didática</span><span>Colaboração</span></div></article></section>

      <section id="contato" className="container contact-section"><div className="contact-card"><div><span className="section-label">06 — VAMOS CONVERSAR?</span><h2>O próximo passo<br />{' '}pode começar com um <span>olá.</span></h2><p>Busco minha primeira oportunidade em análise de dados.<br />{' '}Se você tem uma oportunidade ou uma ideia, vamos conversar.</p><a className="button button-primary" href={`mailto:${profile.email}`}><Mail size={18} /> Entre em contato <ArrowUpRight size={17} /></a></div><div className="contact-links"><a href={`mailto:${profile.email}`}><Mail /><span><small>E-MAIL</small>{profile.email}</span><ArrowUpRight size={18} /></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin /><span><small>LINKEDIN</small>Vamos nos conectar</span><ArrowUpRight size={18} /></a><a href={profile.github} target="_blank" rel="noreferrer"><Github /><span><small>GITHUB</small>@Luismonx1</span><ArrowUpRight size={18} /></a></div></div></section>
    </main>
    <footer className="container site-footer"><div><a className="brand footer-brand" href="#inicio"><span className="brand-mark">lg<span>.</span></span><span>Luís Gustavo</span></a><p>© {new Date().getFullYear()} · Feito com curiosidade e código.</p></div><div className="resume-area">{profile.resume ? <a href={`${import.meta.env.BASE_URL}${profile.resume}`} download className="resume-button"><ArrowDownToLine size={17} /> Baixar currículo <span>PDF</span></a> : <><button className="resume-button" disabled aria-describedby="resume-note"><ArrowDownToLine size={17} /> Baixar currículo <span>PDF</span></button><small id="resume-note">Currículo disponível em breve.</small></>}</div></footer>
  </>;
}

