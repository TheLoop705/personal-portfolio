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

  test('presents the open-source projects with live and source links', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /Public systems, available to inspect/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Investment Research Agent/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Pulse Observability/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Open live system/i })).toHaveAttribute(
      'href',
      'https://theloop705.github.io/investment-research-agent/',
    );
    expect(screen.getAllByRole('link', { name: /View source/i })[0]).toHaveAttribute(
      'href',
      'https://github.com/TheLoop705/investment-research-agent',
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
