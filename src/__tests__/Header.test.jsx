import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '../components/Header/Header'

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

describe('Header', () => {
  it('renders header', async () => {
    render(<Header />)
    const title = screen.getByText('ForecastWeather')

    const svgConfig = screen.getByTestId('config-svg')
    const svgBack  = screen.queryByTestId('back-svg')

    const buttonWeather = screen.getByTestId('button-weather')

    expect(title).toBeInTheDocument()
    expect(svgConfig).toBeInTheDocument()
    expect(svgBack).not.toBeInTheDocument()
    expect(buttonWeather).toBeInTheDocument()
  })

  it('renders back button', async () => {
    render(<Header buttonBack={true} />)
    const title = screen.getByText('ForecastWeather')

    const svgConfig = screen.queryByTestId('config-svg')
    const svgBack  = screen.getByTestId('back-svg')

    const buttonWeather = screen.getByTestId('button-weather')

    expect(title).toBeInTheDocument()
    expect(svgBack).toBeInTheDocument()
    expect(svgConfig).not.toBeInTheDocument()
    expect(buttonWeather).toBeInTheDocument()
  })
})