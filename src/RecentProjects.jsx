import { useEffect, useRef, useState } from "react";
import "./RecentProjects.css";
import useCarouselPlayback, { SLIDE_DURATION } from "./useCarouselPlayback";

const latestProjects = [
  {
    id: "nova-iptv",
    title: "Nova IPTV",
    category: "Cross-platform streaming player",
    intro: "One player for the living room, desktop and phone.",
    description:
      "A shared TypeScript app for Fire TV, Android TV, Windows, iPhone, iPad and the web. Bring your own M3U playlist or Xtream Codes account to browse live TV, movies and series.",
    stack: "React Native · Expo · TypeScript · Electron · SQLite",
    note: "Screens show the built-in demo playlist and public test content. Nova ships no channels or subscriptions.",
    screenshots: [
      {
        src: "/projects/nova-iptv/home.webp",
        alt: "Nova IPTV home with demo movies, resume progress and a remote-focused poster",
        caption: "Home and watch progress",
        width: 1440,
        height: 860,
      },
      {
        src: "/projects/nova-iptv/live-tv.webp",
        alt: "Nova IPTV electronic programme guide with fictional demo channels, timeline and live preview",
        caption: "Live TV programme guide",
        width: 1440,
        height: 860,
      },
    ],
    features: [
      {
        title: "Remote-first navigation",
        text: "A shared focus and input system supports D-pad remotes, keyboard, mouse and touch across the entire app.",
      },
      {
        title: "Live TV and on-demand",
        text: "An XMLTV programme guide, catch-up playback and live preview sit alongside movie libraries, series and saved watch progress.",
      },
      {
        title: "Platform-aware playback",
        text: "ExoPlayer on TV, AVPlayer with VLC fallback on iOS, and browser playback on web and Windows. QR pairing lets a phone handle TV playlist setup.",
      },
    ],
    link: {
      href: "https://github.com/TheLoop705/nova-iptv/releases",
      label: "Download Nova",
    },
  },
  {
    id: "beratungsstudio",
    title: "Beratungsstudio",
    category: "Local-first consulting workspace",
    intro: "From the first proposal to the evidence behind the delivery.",
    description:
      "A single-user workspace for independent IT consulting: customers, versioned proposals, deliverables, time tracking and project budgets, with documents and notes in the same project context.",
    stack: "React · Python · FastAPI · SQLite · Tiptap · PDF.js",
    note: "Screenshot uses synthetic customers and documents. The Consulting Workspace is an optional feature.",
    screenshots: [
      {
        src: "/projects/beratungsstudio/workspace.webp",
        alt: "Beratungsstudio consulting workspace with a synthetic architecture workshop, rich-text notes and two searchable PDF sources",
        caption: "Project notes and source documents",
        width: 1440,
        height: 900,
      },
    ],
    features: [
      {
        title: "Versioned proposals",
        text: "Create fixed-price or capped time-based proposals, freeze their contents on issue and generate PDFs. Accepted deliverables become trackable project work.",
      },
      {
        title: "Evidence beside the work",
        text: "A project PDF library with immutable revisions, full-text search and two independent document views supports structured notes and automatic saving.",
      },
      {
        title: "Connected project tools",
        text: "Track time and budget consumption, prepare invoice PDFs, and access the same consulting tools through the built-in assistant, CLI or MCP server.",
      },
    ],
  },
  {
    id: "cafepos",
    title: "CaféPOS",
    category: "Android point of sale & web administration",
    intro: "A café till built around the work behind the counter.",
    description:
      "An Android checkout app and a multi-tenant administration workspace for small cafés. Product selection, payment, receipts and shift closing connect to a shared Go backend.",
    stack: "Kotlin · Android · Room · Go · PostgreSQL · Svelte · TypeScript",
    note: "In development. Screens show a lab build with training/simulated data. Hardware and provider acceptance are pending; no fiscal certification is claimed.",
    screenshots: [
      {
        src: "/projects/cafepos/sale.webp",
        alt: "CaféPOS Android till in training mode with coffee product buttons, categories and a shopping basket",
        caption: "Touch-first café checkout",
        width: 1279,
        height: 799,
      },
      {
        src: "/projects/cafepos/payment.webp",
        alt: "CaféPOS lab payment screen with a simulated cash sale, change calculation and a SumUp card payment option",
        caption: "Payment flow in the simulator",
        width: 1279,
        height: 799,
      },
    ],
    features: [
      {
        title: "Resilient cash checkout",
        text: "Local Room storage, a durable command queue and an outbox keep offline cash sales available and synchronize them when connectivity returns.",
      },
      {
        title: "Café operations",
        text: "Large product targets, cash and card payment flows, receipt handling and shift closing support everyday counter work.",
      },
      {
        title: "Hardware integration",
        text: "Dedicated adapters connect receipt printers and cash drawers. SumUp and TSE integrations currently run against simulators while hardware acceptance is pending.",
      },
    ],
  },
];

const dealershipFeatures = [
  {
    title: "mobile.de API",
    text: "Import dealer inventory with prices, descriptions and images. Publish and update listings through the Seller API, with sales insights in the same workspace.",
  },
  {
    title: "MCP + LangChain",
    text: "MCP tools and a LangChain4j assistant backend connect AI to dealership workflows, preserving role permissions and business audit records, with confirmation before changes.",
  },
  {
    title: "Native iOS app",
    text: "A SwiftUI companion brings vehicles, customers, appointments and daily tasks to iPhone and iPad. Currently in development.",
  },
];

const websites = [
  {
    id: "grano-bar",
    title: "Grano Bar",
    category: "Hospitality website",
    description:
      "An Italian café brought to the web through expressive typography and photography of the space. A browsable menu, opening hours and location make planning a visit simple.",
    stack: "HTML, HTMX, custom CSS",
    url: "https://granobar.de/",
    image: "/projects/grano-bar/website.webp",
    alt: "Grano Bar homepage with large Italian café typography and a photograph of the Grano sign",
    width: 1269,
    height: 714,
  },
  {
    id: "sattari-automobile",
    title: "Sattari Automobile",
    category: "Automotive website",
    description:
      "A German and English dealership website with a vehicle showcase, customer reviews and a purchase inquiry flow with photo uploads.",
    stack: "Next.js, React, TypeScript, Tailwind CSS",
    url: "https://www.sattari-automobile.de/",
    image: "/projects/sattari-automobile/website.webp",
    alt: "Sattari Automobile homepage with a full-width vehicle photograph, navigation and dealership headline",
    width: 1253,
    height: 705,
  },
];

function Screenshot({ src, alt, caption, width, height, className = "" }) {
  return (
    <figure className={`recent-screenshot ${className}`}>
      <a
        href={src}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open full-size ${caption} screenshot`}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <svg
        className="icon"
        aria-hidden="true"
        fill="none"
        height="15"
        width="15"
        viewBox="0 0 16 16"
      >
        <path d="M3 13 13 3M6 3h7v7" />
      </svg>
    </a>
  );
}

const projects = [
  ...latestProjects,
  {
    id: "saas-autohandel",
    title: "Cartyators",
    subtitle: "saas-autohandel",
    category: "Dealership management software",
    visibility: "Private repository",
    intro:
      "One workspace for the dealership: inventory, customers, sales and the workflows that connect them.",
    description:
      "A modular Spring Boot core serves the web and native apps, with shared business operations and permissions.",
    stack: "Next.js · Spring Boot · PostgreSQL · MCP · LangChain4j · SwiftUI",
    note: "Screens show demo data. The AI assistant backend is opt-in; the iOS companion is in development.",
    features: dealershipFeatures,
    screenshots: [
      {
        src: "/projects/saas-autohandel/mobile-de-inventory.webp",
        alt: "Cartyators mobile.de inventory import with demo vehicles, VIN matching and import validation",
        caption: "mobile.de inventory import",
        width: 1440,
        height: 1148,
      },
      {
        src: "/projects/saas-autohandel/ios-iphone.webp",
        alt: "Cartyators native iOS app with demo inventory and appointments",
        caption: "SwiftUI companion",
        width: 660,
        height: 1434,
      },
    ],
  },
  {
    id: "ekko",
    title: "Ekko",
    category: "Connected display & native app",
    intro: "A personal dashboard, on your display and in your pocket.",
    description:
      "A local 4K HDMI dashboard and a SwiftUI companion for iPhone and iPad bring embedded Linux and native iOS together.",
    stack: "SwiftUI · iOS / iPadOS · Python / FastAPI · Embedded Linux",
    note: "In development. Music analytics use preview data; layouts are currently saved in the companion app.",
    features: [
      {
        title: "A display of your own",
        text: "A local dashboard runs on embedded Linux and connects to a 4K HDMI display.",
      },
      {
        title: "Secure QR pairing",
        text: "Pair and manage displays from a native companion for iPhone and iPad.",
      },
      {
        title: "Dashboard editor",
        text: "Arrange cards and choose what appears in each display’s companion view.",
      },
    ],
    screenshots: [
      {
        src: "/projects/ekko/swiftui-home.webp",
        alt: "Ekko iPhone home with a paired living room display and preview music data",
        caption: "Display companion",
        width: 460,
        height: 1000,
      },
      {
        src: "/projects/ekko/editor-current.webp",
        alt: "Ekko dashboard editor for arranging visible cards",
        caption: "Dashboard editor",
        width: 660,
        height: 1435,
      },
    ],
  },
  ...websites.map((website) => ({
    ...website,
    intro:
      website.id === "grano-bar"
        ? "A little Italian café, with a presence of its own."
        : "A clear route from finding a car to making an inquiry.",
    screenshots: [
      {
        src: website.image,
        alt: website.alt,
        caption: `${website.title} website`,
        width: website.width,
        height: website.height,
      },
    ],
    features:
      website.id === "grano-bar"
        ? [
            {
              title: "A sense of place",
              text: "Expressive typography and photography bring the café’s character onto the screen.",
            },
            {
              title: "Plan a visit",
              text: "A browsable menu, opening hours and location put practical information within reach.",
            },
            {
              title: "Lightweight by design",
              text: "Custom HTML, CSS and HTMX keep the website focused and responsive.",
            },
          ]
        : [
            {
              title: "Vehicle showcase",
              text: "A dedicated presentation for the dealership and its vehicles.",
            },
            {
              title: "German and English",
              text: "Visitors can explore the website in either language.",
            },
            {
              title: "Purchase inquiries",
              text: "An inquiry flow with photo uploads, alongside customer reviews.",
            },
          ],
    link: { href: website.url, label: `Visit ${website.title}` },
  })),
];

function projectFromHash() {
  const index = projects.findIndex(
    (project) => `#${project.id}` === window.location.hash,
  );
  return index < 0 ? 0 : index;
}

function CartyatorsDetails() {
  return (
    <>
      <section
        className="project-architecture"
        aria-labelledby="cartyators-architecture-title"
      >
        <h4 id="cartyators-architecture-title">Architecture</h4>
        <p>
          A modular Spring Boot core serves the web and native apps. Independent
          MCP and LangChain4j paths reuse the same business operations and
          permissions.
        </p>
        <figure className="architecture-figure">
          <div
            className="architecture-figure__frame"
            role="region"
            aria-label="Scrollable Cartyators architecture diagram"
            tabIndex={0}
          >
            <a
              href="/projects/saas-autohandel/architecture.svg"
              target="_blank"
              rel="noreferrer"
              aria-label="Open full-size Cartyators architecture diagram"
            >
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
          <figcaption>
            Private project. This overview combines current local
            implementations, including the optional AI backend and native app in
            development.
          </figcaption>
        </figure>
      </section>
      <div className="project-details">
        <h4>Dashboard and mobile.de sales insights</h4>
        <div
          className="project-details__gallery"
          role="group"
          aria-label="More Cartyators screenshots"
        >
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
      </div>
    </>
  );
}

function ProjectExpose({ project, onDetailsChange }) {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <article
      className={`project-expose project-expose--${project.id}`}
      id={project.id}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="project-expose__main">
        <div className="project-expose__visual">
          <div
            className="project-expose__stage"
            role="group"
            aria-label={`${project.title} screenshots`}
          >
            <Screenshot {...project.screenshots[imageIndex]} />
          </div>
          <div
            className="project-expose__views"
            aria-label={`${project.title} screenshot selection`}
          >
            {project.screenshots.map((shot, index) => (
              <button
                type="button"
                key={shot.src}
                aria-pressed={imageIndex === index}
                onClick={() => setImageIndex(index)}
              >
                {shot.caption}
              </button>
            ))}
          </div>
        </div>
        <div className="project-expose__copy">
          <p className="recent-project__category">{project.category}</p>
          <h3 id={`${project.id}-title`}>
            {project.title}
            {project.subtitle && <span>{project.subtitle}</span>}
          </h3>
          <p className="recent-project__intro">{project.intro}</p>
          <div className="project-features">
            {project.features.map((feature) => (
              <div key={feature.title}>
                <span aria-hidden="true">✓</span>
                <h4>{feature.title}</h4>
              </div>
            ))}
          </div>
          {project.link && (
            <div className="work-entry__links">
              <ExternalLink href={project.link.href}>
                {project.link.label}
              </ExternalLink>
            </div>
          )}
        </div>
      </div>
      <footer className="project-expose__footer">
        <p className="recent-project__stack">{project.stack}</p>
        {project.visibility && (
          <p className="project-visibility">{project.visibility}</p>
        )}
      </footer>
      {project.note && <p className="recent-project__note">{project.note}</p>}
      <details
        className="project-details"
        onToggle={(event) => onDetailsChange(event.currentTarget.open)}
      >
        <summary>
          {project.id === "saas-autohandel"
            ? "Explore the project and architecture"
            : "About this project"}
        </summary>
        <p className="recent-project__description">{project.description}</p>
        <div className="project-feature-details">
          {project.features.map((feature) => (
            <div key={feature.title}>
              <h4>{feature.title}</h4>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>
        {project.id === "saas-autohandel" && <CartyatorsDetails />}
      </details>
    </article>
  );
}

export default function RecentProjects() {
  const [active, setActive] = useState(projectFromHash);
  const touchStart = useRef(null);
  const containerRef = useRef(null);
  const [cycle, setCycle] = useState(0);
  const [reading, setReading] = useState(false);
  const [direction, setDirection] = useState("next");
  const project = projects[active];
  const projectLinks = useRef([]);
  const previous = projects[(active - 1 + projects.length) % projects.length];
  const next = projects[(active + 1) % projects.length];
  const playback = useCarouselPlayback({
    containerRef,
    cycle,
    reading,
    onAdvance: () => select(active + 1, false),
  });

  useEffect(() => {
    const syncHash = () => {
      const index = projects.findIndex(
        (item) => `#${item.id}` === window.location.hash,
      );
      if (index >= 0) {
        setActive(index);
        setCycle((value) => value + 1);
        setReading(false);
      }
    };
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  function select(index, manual = true) {
    const next = (index + projects.length) % projects.length;
    setDirection(index < active ? "previous" : "next");
    setActive(next);
    setCycle((value) => value + 1);
    if (next !== active) setReading(false);
    if (
      manual ||
      projects.some((item) => `#${item.id}` === window.location.hash)
    ) {
      window.history.replaceState(null, "", `#${projects[next].id}`);
    }
  }

  function handleKeys(event, fromIndex = active) {
    let next;
    if (event.key === "ArrowRight") next = (fromIndex + 1) % projects.length;
    if (event.key === "ArrowLeft")
      next = (fromIndex - 1 + projects.length) % projects.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = projects.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    select(next);
    projectLinks.current[next]?.focus({ preventScroll: true });
  }

  return (
    <section
      className="section recent-projects shell"
      id="projects"
      aria-labelledby="projects-title"
    >
      <header className="section-lead">
        <p>Recent projects</p>
        <div>
          <h2 id="projects-title">Projects, in focus.</h2>
          <p>
            Apps, platforms and websites. Take a closer look, one project at a
            time.
          </p>
        </div>
      </header>
      <div
        className="project-carousel"
        ref={containerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Project showcase"
        onMouseEnter={() => playback.setHovered(true)}
        onMouseLeave={() => playback.setHovered(false)}
        onFocusCapture={() => playback.setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            playback.setFocused(false);
        }}
      >
        <div className="project-carousel__toolbar">
          <div
            className="project-carousel__position"
            role="status"
            aria-live={playback.playing ? "off" : "polite"}
            aria-atomic="true"
          >
            <span className="project-carousel__count">
              {String(active + 1).padStart(2, "0")}
              <span> / {String(projects.length).padStart(2, "0")}</span>
            </span>
            <span className="project-carousel__current">
              {project.title}
              <small>
                {playback.stopped
                  ? "Slideshow paused"
                  : playback.playing
                    ? "Auto-play · 8s per project"
                    : "Paused while reading"}
              </small>
            </span>
          </div>
          <div className="project-carousel__arrows">
            <button
              type="button"
              className="project-carousel__play"
              aria-label={
                playback.stopped ? "Play slideshow" : "Pause slideshow"
              }
              onClick={playback.toggle}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                {playback.stopped ? (
                  <path d="m8 5 11 7-11 7Z" />
                ) : (
                  <path d="M7 5h4v14H7zm7 0h4v14h-4z" />
                )}
              </svg>
            </button>
            <button
              type="button"
              aria-label="Previous project"
              aria-controls="project-slide"
              onClick={() => select(active - 1)}
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              aria-label="Next project"
              aria-controls="project-slide"
              onClick={() => select(active + 1)}
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
        <nav className="project-index" aria-label="Choose a project">
          {projects.map((item, index) => (
            <a
              key={item.id}
              ref={(element) => {
                projectLinks.current[index] = element;
              }}
              href={`#${item.id}`}
              aria-label={item.title}
              data-state={
                index < active
                  ? "complete"
                  : index === active
                    ? "current"
                    : "upcoming"
              }
              aria-current={index === active ? "true" : undefined}
              onKeyDown={(event) => handleKeys(event, index)}
              onClick={(event) => {
                if (
                  !event.metaKey &&
                  !event.ctrlKey &&
                  !event.shiftKey &&
                  !event.altKey
                ) {
                  event.preventDefault();
                  select(index);
                }
              }}
            >
              <span className="project-index__track" aria-hidden="true">
                <span
                  key={index === active ? cycle : "idle"}
                  className="project-index__fill"
                  style={{
                    animationDuration: `${SLIDE_DURATION}ms`,
                    animationPlayState: playback.playing ? "running" : "paused",
                  }}
                />
              </span>
              <span className="project-index__label">{item.title}</span>
            </a>
          ))}
        </nav>
        <div className="project-coverflow" data-direction={direction}>
          <button
            type="button"
            className={`project-coverflow__neighbor project-coverflow__neighbor--previous project-coverflow__neighbor--${previous.id}`}
            aria-label={`Previous project: ${previous.title}`}
            onClick={() => select(active - 1)}
          >
            <img
              src={previous.screenshots[0].src}
              alt=""
              width={previous.screenshots[0].width}
              height={previous.screenshots[0].height}
            />
            <span>{previous.title}</span>
          </button>
          <button
            type="button"
            className={`project-coverflow__neighbor project-coverflow__neighbor--next project-coverflow__neighbor--${next.id}`}
            aria-label={`Next project: ${next.title}`}
            onClick={() => select(active + 1)}
          >
            <img
              src={next.screenshots[0].src}
              alt=""
              width={next.screenshots[0].width}
              height={next.screenshots[0].height}
            />
            <span>{next.title}</span>
          </button>
          <div
            id="project-slide"
            className="project-carousel__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${active + 1} of ${projects.length}: ${project.title}`}
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.target === event.currentTarget) handleKeys(event);
            }}
            onTouchStart={(event) => {
              playback.setTouching(true);
              touchStart.current = null;
              if (
                event.touches.length !== 1 ||
                event.target.closest(
                  "button, summary, input, textarea, select, .architecture-figure__frame",
                )
              )
                return;
              const touch = event.touches[0];
              touchStart.current = { x: touch.clientX, y: touch.clientY };
            }}
            onTouchCancel={() => {
              touchStart.current = null;
              playback.setTouching(false);
            }}
            onTouchEnd={(event) => {
              playback.setTouching(false);
              const start = touchStart.current;
              touchStart.current = null;
              if (!start || !event.changedTouches.length) return;
              const touch = event.changedTouches[0];
              const dx = touch.clientX - start.x;
              const dy = touch.clientY - start.y;
              if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5)
                select(active + (dx < 0 ? 1 : -1));
            }}
          >
            <ProjectExpose
              key={project.id}
              project={project}
              onDetailsChange={setReading}
            />
          </div>
        </div>
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
