import { act, fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

describe('professional portfolio', () => {
  beforeEach(() => window.history.replaceState(null, '', '/'));

  test('leads with a concise role, thesis and recruiter actions', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /Sultan Dayani/i })).toBeInTheDocument();
    expect(screen.getByText('Technical Lead & Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(/build production AI systems/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /View selected work/i })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('link', { name: /Email me/i })).toHaveAttribute(
      'href',
      'mailto:contact@sultandayani.com',
    );
  });

  test('keeps leadership evidence and selected professional work', () => {
    render(<App />);

    expect(screen.getByText(/continuous mentoring of three engineers/i)).toBeInTheDocument();
    expect(screen.getByText(/governance and company-wide adoption/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /LLM capability for an aviation transcription product/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Cloud deployment toolchain modernization/i })).toBeInTheDocument();
  });

  test('presents Cartyators as private while making its architecture available', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('link', { name: 'Cartyators' }));
    const project = screen.getByRole('article', { name: /Cartyators saas-autohandel/i });
    fireEvent.click(within(project).getByText('Explore the project and architecture'));
    expect(within(project).getByText('Private repository')).toBeInTheDocument();
    expect(project.closest('#open-source')).toBeNull();
    expect(within(project).getAllByRole('link').some((link) => link.href.includes('github.com'))).toBe(false);
    expect(within(project).getByRole('link', { name: /Open full-size Cartyators architecture diagram/i })).toHaveAttribute(
      'href', '/projects/saas-autohandel/architecture.svg',
    );
    expect(within(project).queryByRole('link', { name: /Open diagram in full size/i })).not.toBeInTheDocument();
    expect(within(project).queryByRole('link', { name: /Download editable Excalidraw/i })).not.toBeInTheDocument();
  });

  test('shows one expose at a time, wraps navigation and updates the project link', () => {
    render(<App />);
    const carousel = screen.getByRole('region', { name: 'Project showcase' });
    expect(within(carousel).getAllByRole('article')).toHaveLength(1);
    expect(within(carousel).getByRole('heading', { name: 'Nova IPTV' })).toBeInTheDocument();
    fireEvent.click(within(carousel).getByRole('button', { name: 'Previous project' }));
    expect(within(carousel).getByRole('heading', { name: 'Sattari Automobile' })).toBeInTheDocument();
    fireEvent.click(within(carousel).getByRole('button', { name: 'Next project' }));
    expect(window.location.hash).toBe('#nova-iptv');
    expect(within(carousel).getByRole('link', { name: 'Nova IPTV' })).toHaveAttribute('aria-current', 'true');
  });

  test('enlarges images in a dismissible dialog and restores focus and scrolling', () => {
    render(<App />);
    const imageLink = screen.getByRole('link', { name: /Open full-size Home and watch progress screenshot/i });
    act(() => imageLink.focus());
    expect(imageLink).not.toHaveAttribute('target');
    fireEvent.click(imageLink);
    let dialog = screen.getByRole('dialog', { name: 'Enlarged image' });
    expect(within(dialog).getByRole('img')).toHaveAttribute('src', '/projects/nova-iptv/home.webp');
    expect(within(dialog).getByRole('button', { name: 'Close enlarged image' })).toHaveFocus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(within(dialog).getByRole('button', { name: 'Close enlarged image' })).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
    fireEvent.click(within(dialog).getByRole('img'));
    expect(dialog).toBeInTheDocument();
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    expect(imageLink).toHaveFocus();

    fireEvent.click(imageLink);
    fireEvent.click(screen.getByRole('button', { name: 'Close enlarged image' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(imageLink);
    dialog = screen.getByRole('dialog');
    fireEvent.click(dialog);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('uses the same image viewer for work screenshots and architecture diagrams', () => {
    render(<App />);
    for (const name of [/Open full-size Flow dashboard/i, /Open the full-size diagram: System architecture/i]) {
      const link = screen.getByRole('link', { name });
      expect(link).not.toHaveAttribute('target');
      fireEvent.click(link);
      expect(within(screen.getByRole('dialog')).getByRole('img')).toHaveAttribute('src', link.getAttribute('href'));
      fireEvent.click(screen.getByRole('button', { name: 'Close enlarged image' }));
    }
  });

  test('supports keyboard selection and resets screenshot and details when switching projects', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: 'Live TV programme guide' }));
    expect(screen.getByAltText(/Nova IPTV electronic programme guide/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText('About this project'));
    expect(document.querySelector('#nova-iptv details')).toHaveAttribute('open');
    const novaLink = screen.getByRole('link', { name: 'Nova IPTV' });
    fireEvent.keyDown(novaLink, { key: 'ArrowRight' });
    expect(screen.getByRole('link', { name: 'Beratungsstudio' })).toHaveFocus();
    expect(screen.getByRole('heading', { name: 'Beratungsstudio' })).toBeInTheDocument();
    fireEvent.keyDown(document.activeElement, { key: 'Home' });
    expect(screen.getByRole('button', { name: 'Home and watch progress' })).toHaveAttribute('aria-pressed', 'true');
    expect(document.querySelector('#nova-iptv details')).not.toHaveAttribute('open');
  });

  test('opens a direct project link and supports touch swipes without hijacking vertical scrolling', () => {
    window.history.replaceState(null, '', '/#cafepos');
    render(<App />);
    expect(screen.getByRole('heading', { name: 'CaféPOS' })).toBeInTheDocument();
    const slide = document.getElementById('project-slide');
    fireEvent.touchStart(slide, { touches: [{ clientX: 250, clientY: 200 }] });
    fireEvent.touchEnd(slide, { changedTouches: [{ clientX: 230, clientY: 70 }] });
    expect(screen.getByRole('heading', { name: 'CaféPOS' })).toBeInTheDocument();
    fireEvent.touchStart(slide, { touches: [{ clientX: 250, clientY: 200 }] });
    fireEvent.touchEnd(slide, { changedTouches: [{ clientX: 100, clientY: 210 }] });
    expect(screen.getByRole('heading', { name: /Cartyators/i })).toBeInTheDocument();
  });

  test('presents Options Workstation as an independent product with safe screenshots', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Options Workstation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Options Workstation' }).closest('article')).toHaveAttribute(
      'id',
      'options-workstation',
    );
    expect(screen.getByText(/deterministic synthetic market and portfolio data/i)).toBeInTheDocument();
    expect(screen.getByRole('group', { name: /Options Workstation screenshots/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Open full-size Flow dashboard/i })).toHaveAttribute(
      'href',
      '/projects/options-workstation/flow-dashboard.png',
    );
    expect(screen.getByAltText(/research evidence desk/i)).toHaveAttribute(
      'src',
      '/projects/options-workstation/research-evidence-desk.png',
    );
  });

  test('presents PAIA as a private project with synthetic screenshots', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'PAIA' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PAIA' }).closest('article')).toHaveAttribute(
      'id',
      'paia',
    );
    expect(screen.getByText('Private project')).toBeInTheDocument();
    expect(screen.getByText(/PAIA is currently a private project/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Open full-size Finance screenshot/i })).toHaveAttribute(
      'href',
      '/projects/paia/finance.png',
    );
    expect(screen.getByAltText(/PAIA calendar screen/i)).toHaveAttribute(
      'src',
      '/projects/paia/calendar.png',
    );
    expect(document.querySelector('a[href="https://github.com/TheLoop705/paia"]')).not.toBeInTheDocument();
  });

  test('presents the open-source projects with source links', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Public systems, available to inspect/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Pulse Observability/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Investment Research Agent/i })).not.toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /View source/i })[0]).toHaveAttribute(
      'href',
      'https://github.com/TheLoop705/pulse-observability',
    );
  });

  test('shows the Pulse architecture diagrams and documentation link', () => {
    render(<App />);

    expect(screen.queryByAltText(/Pulse Grafana dashboard/i)).not.toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Open the full-size diagram: System architecture/i })).toHaveAttribute(
      'href',
      '/projects/pulse/system-architecture.svg',
    );
    expect(screen.getByAltText(/Layered architecture diagram/i)).toHaveAttribute(
      'src',
      '/projects/pulse/system-architecture.svg',
    );
    expect(screen.getByAltText(/one HTTP request broken into spans/i)).toHaveAttribute(
      'src',
      '/projects/pulse/signal-correlation.svg',
    );
    expect(screen.getByRole('link', { name: /Read the architecture/i })).toHaveAttribute(
      'href',
      'https://github.com/TheLoop705/pulse-observability/blob/master/docs/architecture.md',
    );
  });

  test('links to the portfolio source and resume request', () => {
    render(<App />);

    expect(screen.getByRole('link', { name: /Site source/i })).toHaveAttribute(
      'href',
      'https://github.com/TheLoop705/personal-portfolio',
    );
    expect(screen.getByRole('link', { name: /Request resume/i })).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:contact@sultandayani.com'),
    );
  });

  test('exposes an accessible mobile navigation state', () => {
    render(<App />);

    const toggle = screen.getByRole('button', { name: /Open navigation/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveAccessibleName('Close navigation');

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
