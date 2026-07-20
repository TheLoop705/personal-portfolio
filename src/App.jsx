import { useEffect, useState } from 'react';
import './App.css';

const LINKS = {
  email: 'contact@sultandayani.com',
  github: 'https://github.com/TheLoop705',
  investmentLive: 'https://theloop705.github.io/investment-research-agent/',
  investmentSource: 'https://github.com/TheLoop705/investment-research-agent',
  linkedin: 'https://www.linkedin.com/in/sultan-dayani-3419a01b1',
  portfolioSource: 'https://github.com/TheLoop705/personal-portfolio',
  pulse: 'https://github.com/TheLoop705/pulse-observability',
};

function ArrowUpRight({ size = 15 }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 16 16"
      width={size}
    >
      <path d="M3 13 13 3M6 3h7v7" />
    </svg>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <nav aria-label="Primary navigation" className="nav shell">
        <a className="brand" href="#top" onClick={closeMenu}>Sultan Dayani</a>

        <button
          aria-controls="primary-menu"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          className="nav-toggle"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>

        <div className="nav-links" data-open={isOpen} id="primary-menu">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#open-source" onClick={closeMenu}>Open source</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero shell" id="top">
      <p className="hero__role">Technical Lead &amp; Software Engineer</p>
      <h1>Sultan Dayani</h1>
      <p className="hero__summary">
        I build production AI systems and the cloud platforms teams need to own them.
      </p>

      <div className="hero__meta">
        <span>Frankfurt, Germany</span>
        <span>AI enablement · Developer experience · Cloud platforms</span>
      </div>

      <div className="hero__links">
        <a href="#work">View selected work <span aria-hidden="true">↓</span></a>
        <a href={`mailto:${LINKS.email}`}>Email me <ArrowUpRight /></a>
      </div>
    </section>
  );
}

function SectionLead({ label, title, intro }) {
  return (
    <header className="section-lead">
      <p>{label}</p>
      <div>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </header>
  );
}

const leadershipScope = [
  {
    title: 'Product direction',
    detail: 'Roadmaps, backlogs and technical direction for new products.',
  },
  {
    title: 'Architecture',
    detail: 'Decisions, ADRs and reusable engineering patterns.',
  },
  {
    title: 'Team enablement',
    detail: 'Onboarding and continuous mentoring of three engineers.',
  },
  {
    title: 'Responsible AI',
    detail: 'Tool evaluation, governance and company-wide adoption.',
  },
];

const professionalWork = [
  {
    category: 'Production AI',
    context: 'Private product work',
    title: 'LLM capability for an aviation transcription product',
    description: 'Designed and technically led a workflow that turns large transcript volumes into useful summaries and focused human-review signals.',
    meta: 'Technical design & leadership · Python · OpenAI API · Validated structured output',
    note: 'Customer details, prompts, domain rules and source code remain confidential.',
  },
  {
    category: 'Cloud platform',
    context: 'Team modernization',
    title: 'Cloud deployment toolchain modernization',
    description: 'Led the move from shell-driven CloudFormation deployments to reusable AWS CDK components that teams could operate consistently.',
    meta: 'AWS CDK · EKS · Helm · Kubernetes · Team coordination',
  },
];

function WorkEntry({ project, children }) {
  return (
    <article className="work-entry">
      <div className="work-entry__label">
        <span>{project.category}</span>
        <span>{project.context}</span>
      </div>
      <div className="work-entry__body">
        <h3>{project.title}</h3>
        <p className="work-entry__description">{project.description}</p>
        <p className="work-entry__meta">{project.meta}</p>
        {project.note && <p className="work-entry__note">{project.note}</p>}
        {children}
      </div>
    </article>
  );
}

function Work() {
  return (
    <section className="section work shell" id="work">
      <SectionLead
        label="Selected work"
        title="Technical work that changed how a team operates."
        intro="A concise view of the product, architecture and enablement work behind the implementation."
      />

      <div className="scope" id="experience">
        <p className="scope__label">Leadership scope</p>
        <dl>
          {leadershipScope.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="work-list">
        {professionalWork.map((project) => <WorkEntry key={project.title} project={project} />)}
      </div>
    </section>
  );
}

const openSourceProjects = [
  {
    category: 'AI automation',
    context: 'Open source',
    title: 'Investment Research Agent',
    description: 'A local-first research pipeline that collects market signals, creates structured digests and publishes an inspectable dashboard.',
    meta: 'Python · FastAPI · GitHub Actions · Static publishing',
    links: [
      { href: LINKS.investmentLive, label: 'Open live system' },
      { href: LINKS.investmentSource, label: 'View source' },
    ],
  },
  {
    category: 'Observability',
    context: 'Reference platform',
    title: 'Pulse Observability',
    description: 'A containerized environment for exploring metrics, traces and logs through one coherent OpenTelemetry path.',
    meta: 'OpenTelemetry · Prometheus · Jaeger · OpenSearch · Grafana',
    links: [
      { href: LINKS.pulse, label: 'View source' },
    ],
  },
];

function OpenSourceLab() {
  return (
    <section className="section open-source shell" id="open-source">
      <SectionLead
        label="Open-source lab"
        title="Public systems, available to inspect."
        intro="Small, working environments where the implementation is visible alongside the outcome."
      />

      <div className="work-list">
        {openSourceProjects.map((project) => (
          <WorkEntry key={project.title} project={project}>
            <div className="work-entry__links">
              {project.links.map((link) => (
                <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                  {link.label} <ArrowUpRight />
                </a>
              ))}
            </div>
          </WorkEntry>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact shell" id="contact">
      <p className="contact__label">Contact</p>
      <h2>Let’s build systems teams can own.</h2>
      <a className="contact__email" href={`mailto:${LINKS.email}`}>
        {LINKS.email} <ArrowUpRight size={20} />
      </a>
      <div className="contact__links">
        <a href={LINKS.linkedin} rel="noreferrer" target="_blank">LinkedIn <ArrowUpRight /></a>
        <a href={LINKS.github} rel="noreferrer" target="_blank">GitHub <ArrowUpRight /></a>
        <a href={`mailto:${LINKS.email}?subject=Resume%20request`}>Request resume</a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner shell">
        <p>© {new Date().getFullYear()} Sultan Dayani · Frankfurt, Germany</p>
        <a href={LINKS.portfolioSource} rel="noreferrer" target="_blank">
          Site source <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const sectionId = window.location.hash.slice(1);
    const section = sectionId ? document.getElementById(sectionId) : null;
    section?.scrollIntoView?.({ behavior: 'instant', block: 'start' });
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <Work />
        <OpenSourceLab />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
