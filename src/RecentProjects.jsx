import './RecentProjects.css';

const projectIndex = [
  { href: '#saas-autohandel', label: 'Cartyators' },
  { href: '#ekko', label: 'Ekko' },
  { href: '#grano-bar', label: 'Grano Bar' },
  { href: '#sattari-automobile', label: 'Sattari Automobile' },
];

const dealershipFeatures = [
  {
    title: 'mobile.de API',
    text: 'Import dealer inventory with prices, descriptions and images. Publish and update listings through the Seller API, with sales insights in the same workspace.',
  },
  {
    title: 'MCP + LangChain',
    text: 'MCP tools and a LangChain4j assistant backend connect AI to dealership workflows, preserving role permissions and business audit records, with confirmation before changes.',
  },
  {
    title: 'Native iOS app',
    text: 'A SwiftUI companion brings vehicles, customers, appointments and daily tasks to iPhone and iPad. Currently in development.',
  },
];

const websites = [
  {
    id: 'grano-bar',
    title: 'Grano Bar',
    category: 'Hospitality website',
    description: 'An Italian café brought to the web through expressive typography and photography of the space. A browsable menu, opening hours and location make planning a visit simple.',
    stack: 'HTML, HTMX, custom CSS',
    url: 'https://granobar.de/',
    image: '/projects/grano-bar/website.webp',
    alt: 'Grano Bar homepage with large Italian café typography and a photograph of the Grano sign',
    width: 1269,
    height: 714,
  },
  {
    id: 'sattari-automobile',
    title: 'Sattari Automobile',
    category: 'Automotive website',
    description: 'A German and English dealership website with a vehicle showcase, customer reviews and a purchase inquiry flow with photo uploads.',
    stack: 'Next.js, React, TypeScript, Tailwind CSS',
    url: 'https://www.sattari-automobile.de/',
    image: '/projects/sattari-automobile/website.webp',
    alt: 'Sattari Automobile homepage with a full-width vehicle photograph, navigation and dealership headline',
    width: 1253,
    height: 705,
  },
];

function Screenshot({ src, alt, caption, width, height, className = '' }) {
  return (
    <figure className={`recent-screenshot ${className}`}>
      <a href={src} target="_blank" rel="noreferrer" aria-label={`Open full-size ${caption} screenshot`}>
        <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <svg className="icon" aria-hidden="true" fill="none" height="15" width="15" viewBox="0 0 16 16">
        <path d="M3 13 13 3M6 3h7v7" />
      </svg>
    </a>
  );
}

export default function RecentProjects() {
  return (
    <section className="section recent-projects shell" id="projects" aria-labelledby="projects-title">
      <header className="section-lead">
        <p>Recent projects</p>
        <div>
          <h2 id="projects-title">From the API to the interface.</h2>
          <p>Dealership software, native apps and websites for local businesses. A closer look at what I’ve been building.</p>
        </div>
      </header>

      <nav className="project-index" aria-label="Recent projects">
        {projectIndex.map((project) => <a key={project.href} href={project.href}>{project.label}</a>)}
      </nav>

      <article className="recent-project dealership-project" id="saas-autohandel" aria-labelledby="dealership-title">
        <header className="recent-project__header">
          <div>
            <p className="recent-project__category">Dealership management software</p>
            <p className="project-visibility">Private repository</p>
            <h3 id="dealership-title">Cartyators <span>saas-autohandel</span></h3>
          </div>
          <p className="recent-project__intro">One workspace for the dealership: inventory, customers, sales and the workflows that connect them.</p>
        </header>

        <div className="dealership-stage" role="group" aria-label="Cartyators web and iOS screenshots">
          <Screenshot
            src="/projects/saas-autohandel/mobile-de-inventory.webp"
            alt="Cartyators mobile.de inventory import with demo vehicles, VIN matching and import validation"
            caption="mobile.de inventory import"
            width={1440}
            height={1148}
            className="dealership-stage__web"
          />
          <Screenshot
            src="/projects/saas-autohandel/ios-iphone.webp"
            alt="Cartyators native iOS app showing fictional dealership inventory counts and today’s appointments"
            caption="SwiftUI companion"
            width={660}
            height={1434}
            className="dealership-stage__phone"
          />
        </div>

        <div className="project-features">
          {dealershipFeatures.map((feature) => (
            <div key={feature.title}>
              <h4>{feature.title}</h4>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="recent-project__stack">Next.js · Spring Boot · PostgreSQL · MCP · LangChain4j · SwiftUI</p>
        <p className="recent-project__note">Screens show demo data. The AI assistant backend is opt-in; the iOS companion is in development.</p>
        <section className="project-architecture" aria-labelledby="cartyators-architecture-title">
          <h4 id="cartyators-architecture-title">Architecture</h4>
          <p>A modular Spring Boot core serves the web and native apps. Independent MCP and LangChain4j paths reuse the same business operations and permissions.</p>
          <figure className="architecture-figure">
            <div className="architecture-figure__frame" role="region" aria-label="Scrollable Cartyators architecture diagram" tabIndex={0}>
              <a href="/projects/saas-autohandel/architecture.svg" target="_blank" rel="noreferrer" aria-label="Open full-size Cartyators architecture diagram">
                <img
                  src="/projects/saas-autohandel/architecture.svg"
                  alt="Cartyators architecture: browser and SwiftUI clients connect through Caddy to Next.js and Spring Boot, backed by PostgreSQL and the mobile.de Seller API. An independent MCP adapter and an opt-in LangChain4j backend share a business tool contract."
                  width={1612}
                  height={1292}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
            <figcaption>Private project. This overview combines current local implementations, including the optional AI backend and native app in development.</figcaption>
          </figure>
        </section>
        <details className="project-details">
          <summary>Explore the dashboard and mobile.de sales insights</summary>
          <div className="project-details__gallery" role="group" aria-label="More Cartyators screenshots">
            <Screenshot
              src="/projects/saas-autohandel/dashboard.webp"
              alt="Cartyators web dashboard with demo inventory, sales, appointments and tasks"
              caption="Dealership dashboard"
              width={1440}
              height={1440}
            />
            <Screenshot
              src="/projects/saas-autohandel/mobile-de-sales-check.webp"
              alt="Cartyators mobile.de sales check displaying demo listing statistics, price rating and quality checks"
              caption="mobile.de sales insights"
              width={1440}
              height={1000}
            />
          </div>
        </details>
      </article>

      <article className="recent-project ekko-project" id="ekko" aria-labelledby="ekko-title">
        <div className="ekko-project__copy">
          <p className="recent-project__category">Connected display &amp; native app</p>
          <h3 id="ekko-title">Ekko</h3>
          <p className="recent-project__intro">A personal dashboard, on your display and in your pocket.</p>
          <p className="recent-project__description">A local 4K HDMI dashboard and a SwiftUI companion for iPhone and iPad. Secure QR pairing and device management bring embedded Linux and native iOS together.</p>
          <p className="recent-project__description">The latest app adds a local editor for arranging dashboard cards and choosing what appears in each display’s companion view.</p>
          <p className="recent-project__stack">SwiftUI · iOS / iPadOS · Python / FastAPI · Embedded Linux</p>
          <p className="recent-project__note">In development. Music analytics use preview data; layouts are currently saved in the companion app.</p>
        </div>
        <div className="ekko-stage" role="group" aria-label="Ekko iOS screenshots">
          <Screenshot
            src="/projects/ekko/swiftui-home.webp"
            alt="Ekko iPhone home screen with a paired living room display and preview music data"
            caption="Display companion"
            width={460}
            height={1000}
          />
          <Screenshot
            src="/projects/ekko/editor-current.webp"
            alt="Ekko dashboard editor with controls for reordering and choosing visible cards"
            caption="Dashboard editor"
            width={660}
            height={1435}
          />
        </div>
      </article>

      <div className="website-projects">
        {websites.map((website) => (
          <article className="website-project" key={website.id} id={website.id} aria-labelledby={`${website.id}-title`}>
            <Screenshot
              src={website.image}
              alt={website.alt}
              caption={`${website.title} website`}
              width={website.width}
              height={website.height}
            />
            <p className="recent-project__category">{website.category}</p>
            <h3 id={`${website.id}-title`}>{website.title}</h3>
            <p className="recent-project__description">{website.description}</p>
            <p className="recent-project__stack">{website.stack}</p>
            <div className="work-entry__links">
              <ExternalLink href={website.url}>Visit {website.title}</ExternalLink>
            </div>
          </article>
        ))}
      </div>

      <div className="more-projects">
        <p>More from the workbench</p>
        <div>
          <a href="#options-workstation">Options Workstation</a>
          <a href="#paia">PAIA</a>
          <a href="#pulse">Pulse Observability</a>
        </div>
      </div>
    </section>
  );
}
