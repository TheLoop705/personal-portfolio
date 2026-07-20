import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

describe('professional portfolio', () => {
  test('leads with the target role and recruiter actions', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: /Sultan Dayani/i })).toBeInTheDocument();
    expect(screen.getByText('Technical Lead & Software Engineer')).toBeInTheDocument();
    expect(screen.getAllByText(/AI Enablement/i).length).toBeGreaterThan(0);

    expect(screen.getByRole('link', { name: /View experience/i })).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: /View projects/i })).toHaveAttribute('href', '#work');
    expect(screen.getAllByRole('link', { name: /Request resume/i })[0]).toHaveAttribute(
      'href',
      expect.stringContaining('mailto:contact@sultandayani.com'),
    );
  });

  test('shows leadership evidence and the three selected case studies', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Technical leadership & enablement/i })).toBeInTheDocument();
    expect(screen.getByText(/continuous mentoring of three engineers/i)).toBeInTheDocument();
    expect(screen.getByText(/company-wide AI pilot team/i)).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /Production LLM capability/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Cloud deployment toolchain modernization/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /OpenTelemetry observability reference platform/i })).toBeInTheDocument();
  });

  test('renders the safe LLM system flow and the verified Pulse link', () => {
    render(<App />);

    const flowCaption = screen.getByText(/Safe architecture overview/i);
    const flow = flowCaption.closest('figure');
    expect(flow).not.toBeNull();
    expect(within(flow).getAllByRole('listitem')).toHaveLength(6);
    expect(within(flow).getByText(/Validated structured output/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /View Pulse on GitHub/i })).toHaveAttribute(
      'href',
      'https://github.com/TheLoop705/pulse-observability',
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
