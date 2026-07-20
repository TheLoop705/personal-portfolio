import { useEffect, useState } from 'react';
import './App.css';

const LINKS = {
  email: 'contact@sultandayani.com',
  github: 'https://github.com/TheLoop705',
  linkedin: 'https://www.linkedin.com/in/sultan-dayani-3419a01b1',
  pulse: 'https://github.com/TheLoop705/pulse-observability',
};

function ArrowUpRight({ size = 16 }) {
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

function ArrowRight({ size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 18 18"
      width={size}
    >
      <path d="M2 9h13M10.5 4.5 15 9l-4.5 4.5" />
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
        <a aria-label="Sultan Dayani, back to top" className="brand" href="#top" onClick={closeMenu}>
          <span className="brand__mark" aria-hidden="true">SD</span>
          <span className="brand__copy">
            <strong>Sultan Dayani</strong>
            <small>Technical Lead</small>
          </span>
        </a>

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
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#work" onClick={closeMenu}>Case studies</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <a className="nav-links__external" href={LINKS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>
    </header>
  );
}

function CapabilityMap() {
  const routes = [
    { code: 'AI', title: 'Production capability', detail: 'Useful, governed and measurable' },
    { code: 'DX', title: 'Developer experience', detail: 'Patterns teams can adopt' },
    { code: 'CLD', title: 'Cloud platforms', detail: 'Reliable paths to production' },
  ];

  return (
    <aside aria-label="How Sultan creates engineering leverage" className="capability-map hero-enter hero-enter--four">
      <div className="capability-map__header">
        <span>Operating model</span>
        <span className="status"><i /> Production-minded</span>
      </div>

      <div className="system-map">
        <div className="system-node system-node--origin">
          <span>Input</span>
          <strong>Complex product need</strong>
        </div>

        <div className="system-routes">
          {routes.map((route) => (
            <div className="route" key={route.code}>
              <span className="route__code">{route.code}</span>
              <strong>{route.title}</strong>
              <small>{route.detail}</small>
            </div>
          ))}
        </div>

        <div className="system-node system-node--outcome">
          <span>Outcome</span>
          <strong>Change the team can own</strong>
        </div>
      </div>

      <div className="capability-map__footer" aria-label="Working sequence">
        <span>Design</span>
        <ArrowRight size={15} />
        <span>Align</span>
        <ArrowRight size={15} />
        <span>Enable</span>
        <ArrowRight size={15} />
        <span>Operate</span>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section className="hero shell" id="top">
      <div className="hero__copy">
        <p className="eyebrow hero-enter hero-enter--one">Technical Lead &amp; Software Engineer</p>
        <h1 className="hero-enter hero-enter--two">Sultan Dayani<span>.</span></h1>
        <p className="hero__disciplines hero-enter hero-enter--two">
          <span>AI Enablement</span><i aria-hidden="true" />
          <span>Developer Experience</span><i aria-hidden="true" />
          <span>Cloud Platforms</span>
        </p>
        <p className="hero__summary hero-enter hero-enter--three">
          I design production AI capabilities, modernize engineering platforms, and help development teams adopt new tools and practices effectively.
        </p>

        <div className="hero__actions hero-enter hero-enter--three">
          <a className="button button--primary" href="#experience">
            View experience <ArrowRight />
          </a>
          <a className="button button--secondary" href="#work">View projects</a>
        </div>

        <div className="hero__utility hero-enter hero-enter--four" aria-label="Professional links">
          <a href={`mailto:${LINKS.email}?subject=Resume%20request`}>Request resume</a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
          <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
        </div>
      </div>

      <CapabilityMap />

      <div className="hero__footnote hero-enter hero-enter--four">
        <span>Based in Frankfurt, Germany</span>
        <a href="#work">Explore selected work <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}

function SectionHeading({ label, title, intro, light = false }) {
  return (
    <div className={`section-heading${light ? ' section-heading--light' : ''}`}>
      <p className="eyebrow">{label}</p>
      <div className="section-heading__row">
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  );
}

const leadershipAreas = [
  {
    label: 'Product direction',
    items: [
      'Technical Lead responsibility for a new product',
      'Roadmap and backlog ownership',
    ],
  },
  {
    label: 'Architecture practice',
    items: [
      'Architecture decisions and ADRs',
      'Engineering guidelines that make decisions reusable',
    ],
  },
  {
    label: 'Team enablement',
    items: [
      'Onboarding and continuous mentoring of three engineers',
      'Turning new tools into practices teams can sustain',
    ],
  },
  {
    label: 'Responsible AI',
    items: [
      'Selected member of a company-wide AI pilot team',
      'Tool evaluation, governance requirements and responsible adoption',
    ],
  },
];

function Leadership() {
  return (
    <section className="leadership" id="experience">
      <div className="shell">
        <SectionHeading
          label="Experience / scope"
          light
          title="Technical leadership & enablement"
          intro="Moving a capability into production takes more than implementation. I connect product direction, architecture, team development and responsible adoption."
        />

        <div className="leadership-grid">
          {leadershipAreas.map((area) => (
            <article className="leadership-card" key={area.label}>
              <h3>{area.label}</h3>
              <ul>
                {area.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="leadership-band" aria-label="Leadership scope">
          <span>Product</span><i />
          <span>Architecture</span><i />
          <span>People</span><i />
          <span>Governance</span>
        </div>
      </div>
    </section>
  );
}

function CaseFacts({ children }) {
  return <dl className="case-facts">{children}</dl>;
}

function Fact({ label, children }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

const llmFlow = [
  'Transcription platform',
  'Structured speaker segments',
  'Python AI service',
  'Managed prompt and LLM',
  'Validated structured output',
  'Summary and review highlights',
];

function LlmCaseStudy() {
  return (
    <article className="case-study case-study--featured">
      <header className="case-study__header">
        <p className="record-label"><span>AI systems</span> Private production work</p>
        <h3>Production LLM capability for an aviation transcription product</h3>
        <p className="case-study__lede">
          Designed and technically led an LLM-powered workflow that turns large transcript volumes into useful summaries and focused human-review signals.
        </p>
      </header>

      <CaseFacts>
        <Fact label="Role">Technical design &amp; leadership</Fact>
        <Fact label="Integration">Python service · OpenAI API</Fact>
        <Fact label="Output">Validated JSON · Review highlights</Fact>
      </CaseFacts>

      <figure className="architecture">
        <figcaption>
          <span>System flow</span>
          Safe architecture overview
        </figcaption>
        <ol>
          {llmFlow.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </figure>

      <p className="confidentiality-note">
        <span aria-hidden="true">◈</span>
        Shown intentionally at system level. Customer details, prompts, domain rules, schemas, screenshots and source code remain confidential.
      </p>
    </article>
  );
}

function PlatformCaseStudy() {
  return (
    <article className="case-study case-study--compact">
      <header className="case-study__header">
        <p className="record-label"><span>Cloud platform</span> Team modernization</p>
        <h3>Cloud deployment toolchain modernization</h3>
        <p className="case-study__lede">
          Led the transition from shell-driven CloudFormation deployments to reusable AWS CDK components integrating EKS, Helm and Kubernetes operations.
        </p>
      </header>

      <div className="transition-map" aria-label="Deployment approach transition">
        <div>
          <span>From</span>
          <strong>Shell-driven deployments</strong>
        </div>
        <ArrowRight size={22} />
        <div>
          <span>To</span>
          <strong>Reusable infrastructure patterns</strong>
        </div>
      </div>

      <CaseFacts>
        <Fact label="Leadership">Target approach &amp; team coordination</Fact>
        <Fact label="Platform">AWS CDK · EKS · Helm · Kubernetes</Fact>
      </CaseFacts>
    </article>
  );
}

function ObservabilityCaseStudy() {
  return (
    <article className="case-study case-study--compact case-study--pulse">
      <header className="case-study__header">
        <p className="record-label"><span>Open source</span> Reference platform</p>
        <h3>OpenTelemetry observability reference platform</h3>
        <p className="case-study__lede">
          Pulse is a containerized reference stack for exploring metrics, traces and logs through one coherent observability path.
        </p>
      </header>

      <div className="signal-map" aria-label="Pulse signal types">
        <div><i className="signal-map__metric" /> Metrics</div>
        <div><i className="signal-map__trace" /> Traces</div>
        <div><i className="signal-map__log" /> Logs</div>
        <span>OpenTelemetry → backends → Grafana</span>
      </div>

      <CaseFacts>
        <Fact label="Stack">Prometheus · Jaeger · OpenSearch · Grafana</Fact>
        <Fact label="Delivery">Containerized, local-first reference environment</Fact>
      </CaseFacts>

      <a className="case-link" href={LINKS.pulse} target="_blank" rel="noreferrer">
        View Pulse on GitHub <ArrowUpRight />
      </a>
    </article>
  );
}

function Work() {
  return (
    <section className="work shell" id="work">
      <SectionHeading
        label="Selected work"
        title="Evidence, not a technology inventory"
        intro="Three examples of how I frame a problem, shape the technical path and leave behind a capability others can operate."
      />

      <div className="case-list">
        <LlmCaseStudy />
        <div className="case-list__secondary">
          <PlatformCaseStudy />
          <ObservabilityCaseStudy />
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact shell" id="contact">
      <p className="eyebrow">Start a conversation</p>
      <div className="contact__grid">
        <h2>Looking for technical leadership that connects architecture with adoption?</h2>
        <div className="contact__details">
          <p>
            I’m interested in conversations around AI enablement, developer experience, cloud platforms and production engineering.
          </p>
          <a className="contact__email" href={`mailto:${LINKS.email}`}>
            {LINKS.email} <ArrowUpRight size={20} />
          </a>
          <div className="contact__links">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a>
            <a href={LINKS.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
            <a href={`mailto:${LINKS.email}?subject=Resume%20request`}>Request resume</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner shell">
        <p>© {new Date().getFullYear()} Sultan Dayani <span>Frankfurt, Germany</span></p>
        <nav aria-label="Footer navigation">
          <a href="#top">Top</a>
          <a href="#experience">Experience</a>
          <a href="#work">Case studies</a>
          <a href="#contact">Contact</a>
        </nav>
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
        <Leadership />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
