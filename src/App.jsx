import React, { useEffect, useRef, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────
   PALETTE & TOKENS
   Warm ivory / charcoal editorial palette
   with a single copper-rust accent
   ───────────────────────────────────────────── */
const T = {
  bg:        '#F5F0EB',
  bgAlt:     '#EDE7E0',
  surface:   '#FDFBF9',
  ink:       '#1A1714',
  inkSoft:   '#5C564E',
  inkMuted:  '#9B9489',
  accent:    '#C4572A',
  accentSoft:'#E8764A',
  rule:      '#D6CFC6',
  serif:     '"Instrument Serif", Georgia, serif',
  sans:      '"DM Sans", system-ui, sans-serif',
  mono:      '"JetBrains Mono", monospace',
};

/* ─────────────────────────────────────────────
   INTERSECTION-OBSERVER HOOK
   ───────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.unobserve(el); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─────────────────────────────────────────────
   ANIMATED WRAPPER
   ───────────────────────────────────────────── */
function Reveal({ children, delay = 0, direction = 'up', style = {}, ...rest }) {
  const [ref, visible] = useReveal(0.1);
  const translate = {
    up: 'translateY(48px)',
    down: 'translateY(-48px)',
    left: 'translateX(48px)',
    right: 'translateX(-48px)',
    none: 'none',
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : translate[direction],
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   GRAIN OVERLAY (SVG noise texture)
   ───────────────────────────────────────────── */
function GrainOverlay() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none',
      opacity: 0.035,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }} />
  );
}

/* ─────────────────────────────────────────────
   NAV
   ───────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = ['About', 'Tech Stack', 'Projects', 'Contact'];

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? 'rgba(245,240,235,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? `1px solid ${T.rule}` : '1px solid transparent',
      transition: 'all 0.4s ease',
      padding: '0 clamp(24px, 5vw, 80px)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: scrolled ? 60 : 72, transition: 'height 0.4s ease',
      }}>
        <button onClick={() => scrollTo('hero')} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          fontFamily: T.serif, fontSize: 22, color: T.ink, letterSpacing: '-0.02em',
        }}>SD.</button>

        {/* Desktop links */}
        <div style={{
          display: 'flex', gap: 32, alignItems: 'center',
        }} className="nav-desktop">
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: T.sans, fontSize: 13, fontWeight: 500,
              color: T.inkSoft, letterSpacing: '0.04em', textTransform: 'uppercase',
              padding: '4px 0', position: 'relative',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => e.target.style.color = T.accent}
            onMouseLeave={e => e.target.style.color = T.inkSoft}
            >{l}</button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none', background: 'none', border: 'none', cursor: 'pointer',
            padding: 8, color: T.ink,
          }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen
              ? <path d="M6 6l12 12M6 18L18 6" />
              : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="nav-mobile-menu" style={{
          background: 'rgba(245,240,235,0.98)', backdropFilter: 'blur(16px)',
          padding: '16px 0 24px', borderBottom: `1px solid ${T.rule}`,
        }}>
          {links.map(l => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())} style={{
              display: 'block', width: '100%', textAlign: 'left',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: T.sans, fontSize: 15, fontWeight: 400,
              color: T.inkSoft, padding: '10px 0',
            }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);

  const anim = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'none' : 'translateY(40px)',
    transition: `opacity 1s cubic-bezier(.16,1,.3,1) ${delay}s, transform 1s cubic-bezier(.16,1,.3,1) ${delay}s`,
  });

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: 'clamp(100px, 15vh, 180px) clamp(24px, 5vw, 80px) clamp(60px, 10vh, 120px)',
      maxWidth: 1200, margin: '0 auto', position: 'relative',
    }}>
      <div style={anim(0.1)}>
        <span style={{
          fontFamily: T.mono, fontSize: 13, color: T.accent,
          letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500,
        }}>Software Engineer</span>
      </div>

      <h1 style={{
        fontFamily: T.serif, fontWeight: 400, color: T.ink,
        fontSize: 'clamp(56px, 10vw, 130px)', lineHeight: 0.95,
        letterSpacing: '-0.03em', margin: '24px 0 0',
        ...anim(0.25),
      }}>
        Sultan Dayani
      </h1>

      <div style={{
        width: 80, height: 2, background: T.accent,
        margin: '40px 0', ...anim(0.4),
      }} />

      <p style={{
        fontFamily: T.sans, fontSize: 'clamp(17px, 2vw, 21px)', lineHeight: 1.6,
        color: T.inkSoft, maxWidth: 540, fontWeight: 300,
        ...anim(0.5),
      }}>
        Building full-stack applications and data pipelines — from Spring Boot
        microservices to AI-powered automation tools.
      </p>

      <div style={{ marginTop: 48, display: 'flex', gap: 16, flexWrap: 'wrap', ...anim(0.65) }}>
        <button
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            fontFamily: T.sans, fontSize: 14, fontWeight: 500,
            background: T.ink, color: T.bg, border: 'none',
            padding: '14px 36px', cursor: 'pointer',
            letterSpacing: '0.03em',
            transition: 'background 0.3s',
          }}
          onMouseEnter={e => e.target.style.background = T.accent}
          onMouseLeave={e => e.target.style.background = T.ink}
        >View Work</button>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            fontFamily: T.sans, fontSize: 14, fontWeight: 500,
            background: 'transparent', color: T.ink,
            border: `1px solid ${T.rule}`, padding: '14px 36px',
            cursor: 'pointer', letterSpacing: '0.03em',
            transition: 'border-color 0.3s',
          }}
          onMouseEnter={e => e.target.style.borderColor = T.accent}
          onMouseLeave={e => e.target.style.borderColor = T.rule}
        >Get in Touch</button>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        ...anim(1.0),
      }}>
        <span style={{ fontFamily: T.mono, fontSize: 10, color: T.inkMuted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{
          width: 1, height: 40, background: `linear-gradient(to bottom, ${T.inkMuted}, transparent)`,
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADER
   ───────────────────────────────────────────── */
function SectionHeader({ number, title, align = 'left' }) {
  return (
    <Reveal style={{ marginBottom: 56, textAlign: align }}>
      <span style={{
        fontFamily: T.mono, fontSize: 12, color: T.accent,
        letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>{number}</span>
      <h2 style={{
        fontFamily: T.serif, fontWeight: 400, fontSize: 'clamp(36px, 5vw, 56px)',
        color: T.ink, letterSpacing: '-0.02em', margin: '8px 0 0', lineHeight: 1.1,
      }}>{title}</h2>
      <div style={{
        width: 48, height: 2, background: T.accent,
        margin: align === 'center' ? '20px auto 0' : '20px 0 0',
      }} />
    </Reveal>
  );
}

/* ─────────────────────────────────────────────
   ABOUT
   ───────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{
      padding: 'clamp(80px, 12vh, 140px) clamp(24px, 5vw, 80px)',
      maxWidth: 1200, margin: '0 auto',
    }}>
      <SectionHeader number="01" title="About" />
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: 'clamp(32px, 5vw, 80px)', alignItems: 'start',
      }}>
        <Reveal delay={0.1}>
          <p style={{
            fontFamily: T.serif, fontStyle: 'italic', fontSize: 'clamp(22px, 3vw, 30px)',
            color: T.ink, lineHeight: 1.45, letterSpacing: '-0.01em',
          }}>
            I build software that solves real problems — from restaurant websites
            to AI-powered options flow analysis.
          </p>
        </Reveal>
        <div>
          <Reveal delay={0.2}>
            <p style={{
              fontFamily: T.sans, fontSize: 16, lineHeight: 1.75, color: T.inkSoft, fontWeight: 300,
              marginBottom: 24,
            }}>
              I work across the full stack with Java, TypeScript, and Python. My projects
              range from Spring Boot backends and Angular frontends to async data collectors
              processing thousands of options trades in real-time. I enjoy turning complex
              ideas into clean, working software.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p style={{
              fontFamily: T.sans, fontSize: 16, lineHeight: 1.75, color: T.inkSoft, fontWeight: 300,
              marginBottom: 24,
            }}>
              When I'm not coding, I'm tinkering with home automation on my Raspberry Pi,
              analyzing options flow data, or planning trips to Iceland. I believe great
              software comes from curiosity and building things you actually want to use.
            </p>
          </Reveal>
          {/* Stats removed */}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SKILLS
   ───────────────────────────────────────────── */
const skillsData = [
  {
    category: 'Backend',
    icon: '{}',
    items: ['Java', 'Spring Boot', 'Python', 'FastAPI', 'Node.js', 'REST APIs'],
  },
  {
    category: 'Frontend',
    icon: '</>',
    items: ['Angular', 'TypeScript', 'React', 'Next.js', 'HTMX', 'HTML/CSS'],
  },
  {
    category: 'Cloud & DevOps',
    icon: '>>',
    items: ['Docker', 'Kubernetes', 'Podman', 'CI/CD', 'GitHub Actions', 'Linux'],
  },
  {
    category: 'Data & AI',
    icon: '[]',
    items: ['PostgreSQL', 'MongoDB', 'OpenAI/Whisper', 'ML Pipelines', 'Async Python'],
  },
];

function Skills() {
  return (
    <section id="tech stack" style={{
      padding: 'clamp(80px, 12vh, 140px) clamp(24px, 5vw, 80px)',
      background: T.bgAlt, position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader number="02" title="Tech Stack" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: 24,
        }}>
          {skillsData.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.12} style={{ height: '100%' }}>
              <div style={{
                background: T.surface, padding: 'clamp(28px, 3vw, 40px)',
                border: `1px solid ${T.rule}`,
                position: 'relative', overflow: 'hidden', height: '100%',
                display: 'flex', flexDirection: 'column',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = T.accent;
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,87,42,0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = T.rule;
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {/* Big decorative character */}
                <span style={{
                  position: 'absolute', top: -8, right: 12,
                  fontFamily: T.mono, fontSize: 80, color: T.rule,
                  opacity: 0.4, fontWeight: 400, lineHeight: 1, userSelect: 'none',
                }}>{group.icon}</span>

                <span style={{
                  fontFamily: T.mono, fontSize: 11, color: T.accent,
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8,
                }}>0{gi + 1}</span>
                <h3 style={{
                  fontFamily: T.serif, fontSize: 24, color: T.ink,
                  fontWeight: 400, margin: '0 0 24px', letterSpacing: '-0.01em',
                }}>{group.category}</h3>

                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto',
                }}>
                  {group.items.map(item => (
                    <span key={item} style={{
                      fontFamily: T.sans, fontSize: 13, fontWeight: 400,
                      color: T.inkSoft, padding: '6px 14px',
                      border: `1px solid ${T.rule}`, background: T.bg,
                      transition: 'all 0.25s',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.target.style.background = T.accent;
                      e.target.style.color = '#fff';
                      e.target.style.borderColor = T.accent;
                    }}
                    onMouseLeave={e => {
                      e.target.style.background = T.bg;
                      e.target.style.color = T.inkSoft;
                      e.target.style.borderColor = T.rule;
                    }}
                    >{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS
   ───────────────────────────────────────────── */
const projectsData = [
  {
    title: 'Options Flow Tracker',
    desc: 'Full-stack options flow analysis platform. Async Python collectors pulling from Unusual Whales API, React dashboard with anomaly detection, FastAPI backend. 16+ data collectors running 24/7.',
    tags: ['Python', 'FastAPI', 'React', 'Unusual Whales API', 'ML'],
    color: '#4A3B6B',
    link: null,
  },
  {
    title: 'Grano Bar',
    desc: 'Restaurant website for a local Frankfurt bar. Clean, modern design with HTMX for smooth interactivity. Lightweight and fast.',
    tags: ['HTMX', 'Python', 'HTML/CSS', 'Web Design'],
    color: '#6B3B3B',
    link: null,
  },
  {
    title: 'Spotify Insights',
    desc: 'Next.js dashboard that analyzes your Spotify listening data. PostgreSQL backend with rich data visualizations and listening history.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Spotify API'],
    color: '#1DB954',
    link: null,
  },
  {
    title: 'COVID QR Registration',
    desc: 'Flutter mobile apps for QR-code based COVID contact tracing. Owner app generates scannable codes, customer app registers visits. Built during the pandemic.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Mobile'],
    color: '#3B5A6B',
    link: 'https://github.com/TheLoop705/covid-owner-app',
  },
  {
    title: 'OpenClaw Skills',
    desc: 'Collection of AI agent skills for the OpenClaw platform: options flow intelligence, newsletter automation, Home Assistant control, and LLM memory management.',
    tags: ['Python', 'OpenClaw', 'AI Agents', 'Automation'],
    color: '#C4572A',
    link: 'https://github.com/TheLoop705/openclaw-skills',
  },
];

function Projects() {
  return (
    <section id="projects" style={{
      padding: 'clamp(80px, 12vh, 140px) clamp(24px, 5vw, 80px)',
      maxWidth: 1200, margin: '0 auto',
    }}>
      <SectionHeader number="03" title="Projects" />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: 24,
      }}>
        {projectsData.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1} style={{ height: '100%' }}>
            <a href={p.link || '#!'} target={p.link ? '_blank' : undefined} rel={p.link ? 'noopener noreferrer' : undefined} style={{
              display: 'flex', flexDirection: 'column',
              border: `1px solid ${T.rule}`, overflow: 'hidden',
              textDecoration: 'none', color: 'inherit', height: '100%',
              transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = T.accent;
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = T.rule;
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              {/* Color band header */}
              <div style={{
                background: p.color, padding: '40px 32px 36px',
                position: 'relative', overflow: 'hidden',
              }}>
                <span style={{
                  position: 'absolute', top: -10, right: -10,
                  fontFamily: T.serif, fontSize: 120, color: 'rgba(255,255,255,0.07)',
                  lineHeight: 1, fontStyle: 'italic', userSelect: 'none',
                }}>{p.title.charAt(0)}</span>
                <span style={{
                  fontFamily: T.mono, fontSize: 11, color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                }}>Project 0{i + 1}</span>
                <h3 style={{
                  fontFamily: T.serif, fontSize: 28, color: '#fff',
                  fontWeight: 400, margin: '8px 0 0', letterSpacing: '-0.01em',
                }}>{p.title}</h3>
              </div>

              {/* Body */}
              <div style={{
                padding: '28px 32px 32px', background: T.surface,
                flex: 1, display: 'flex', flexDirection: 'column',
              }}>
                <p style={{
                  fontFamily: T.sans, fontSize: 15, lineHeight: 1.7,
                  color: T.inkSoft, fontWeight: 300, flex: 1,
                }}>{p.desc}</p>

                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 20,
                  paddingTop: 16, borderTop: `1px solid ${T.rule}`,
                }}>
                  {p.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: T.mono, fontSize: 11, color: T.inkMuted,
                      padding: '4px 10px', background: T.bg,
                      letterSpacing: '0.02em',
                    }}>{tag}</span>
                  ))}
                </div>

                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  marginTop: 16, fontFamily: T.sans, fontSize: 13,
                  fontWeight: 500, color: T.accent,
                }}>
                  {p.link ? 'View on GitHub' : 'Private Project'}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 7h12M8 2l5 5-5 5" />
                  </svg>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}



/* ─────────────────────────────────────────────
   CONTACT
   ───────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" style={{
      padding: 'clamp(80px, 12vh, 140px) clamp(24px, 5vw, 80px)',
      maxWidth: 1200, margin: '0 auto', textAlign: 'center',
    }}>
      <SectionHeader number="04" title="Get in Touch" align="center" />

      <Reveal delay={0.1}>
        <p style={{
          fontFamily: T.serif, fontStyle: 'italic', fontSize: 'clamp(20px, 3vw, 28px)',
          color: T.ink, lineHeight: 1.5, maxWidth: 560, margin: '0 auto 48px',
          letterSpacing: '-0.01em',
        }}>
          Always open to interesting conversations, collaborations, or just a good tech debate.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <a href="mailto:contact@sultandayani.com" style={{
          fontFamily: T.sans, fontSize: 'clamp(16px, 2vw, 20px)',
          color: T.accent, textDecoration: 'none', fontWeight: 500,
          borderBottom: `1px solid transparent`,
          transition: 'border-color 0.3s',
          paddingBottom: 2,
        }}
        onMouseEnter={e => e.target.style.borderColor = T.accent}
        onMouseLeave={e => e.target.style.borderColor = 'transparent'}
        >contact@sultandayani.com</a>
      </Reveal>

      <Reveal delay={0.3}>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 32, marginTop: 48,
        }}>
          {[
            { label: 'GitHub', href: 'https://github.com/TheLoop705' },
            { label: 'LinkedIn', href: '#' },
          ].map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: T.mono, fontSize: 13, color: T.inkSoft,
              textDecoration: 'none', letterSpacing: '0.04em',
              padding: '10px 24px', border: `1px solid ${T.rule}`,
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.target.style.borderColor = T.accent;
              e.target.style.color = T.accent;
            }}
            onMouseLeave={e => {
              e.target.style.borderColor = T.rule;
              e.target.style.color = T.inkSoft;
            }}
            >{link.label}</a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{
      padding: '40px clamp(24px, 5vw, 80px)',
      borderTop: `1px solid ${T.rule}`,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <span style={{
          fontFamily: T.sans, fontSize: 13, color: T.inkMuted, fontWeight: 300,
        }}>&copy; {new Date().getFullYear()} Sultan Dayani. Built in Frankfurt.</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none', border: `1px solid ${T.rule}`,
            padding: '8px 20px', cursor: 'pointer',
            fontFamily: T.mono, fontSize: 11, color: T.inkMuted,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            transition: 'border-color 0.3s, color 0.3s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = T.accent; e.target.style.color = T.accent; }}
          onMouseLeave={e => { e.target.style.borderColor = T.rule; e.target.style.color = T.inkMuted; }}
        >Back to Top</button>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   GLOBAL STYLES (injected via <style>)
   ───────────────────────────────────────────── */
function GlobalStyles() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      html {
        scroll-behavior: smooth;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        background: ${T.bg};
        color: ${T.ink};
        font-family: ${T.sans};
        overflow-x: hidden;
      }

      ::selection {
        background: ${T.accent};
        color: #fff;
      }

      @keyframes scrollPulse {
        0%, 100% { opacity: 1; transform: scaleY(1); }
        50% { opacity: 0.3; transform: scaleY(0.6); }
      }

      /* Responsive nav */
      @media (max-width: 768px) {
        .nav-desktop { display: none !important; }
        .nav-mobile-toggle { display: block !important; }

      }
      @media (min-width: 769px) {
        .nav-mobile-menu { display: none !important; }
      }

      /* Smooth scrollbar */
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: ${T.bg}; }
      ::-webkit-scrollbar-thumb { background: ${T.rule}; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: ${T.inkMuted}; }

      /* Focus visible for accessibility */
      *:focus-visible {
        outline: 2px solid ${T.accent};
        outline-offset: 2px;
      }
    `}</style>
  );
}

/* ─────────────────────────────────────────────
   APP
   ───────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <GlobalStyles />
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
