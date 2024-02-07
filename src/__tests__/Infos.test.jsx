import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Infos from '../templates/details/Infos'

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

beforeEach(() => {
  window.localStorage.clear();
});

describe('Location', () => {
  it('renders information without description', async () => {
    render(<Infos title="Info" />)

    const subtitle = screen.queryByTestId('subtitle-info')

    expect(screen.getByText('Info')).toBeInTheDocument()
    expect(subtitle).not.toBeInTheDocument()
  })

  it('renders information with description', async () => {
    render(<Infos title="Info" subtitle="Subtitle" />)

    expect(screen.getByText('Info')).toBeInTheDocument()
    expect(screen.getByText('Subtitle')).toBeInTheDocument()
  })
})