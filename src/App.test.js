import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('professional portfolio', () => {
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

  test('presents the open-source projects with source links', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Public systems, available to inspect/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'PAIA' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Pulse Observability/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Investment Research Agent/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Open full-size Finance screenshot/i })).toHaveAttribute(
      'href',
      '/projects/paia/finance.png',
    );
    expect(screen.getByAltText(/PAIA calendar screen/i)).toHaveAttribute(
      'src',
      '/projects/paia/calendar.png',
    );
    expect(screen.getAllByRole('link', { name: /View source/i })[0]).toHaveAttribute(
      'href',
      'https://github.com/TheLoop705/paia',
    );
  });

  test('shows the Pulse architecture diagrams and documentation link', () => {
    render(<App />);

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
