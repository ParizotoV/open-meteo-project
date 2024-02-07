import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Forecasts from '../app/forecasts/page'
import { mockWeather }from '../utils/util'

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

beforeEach(() => {
  window.localStorage.clear();
});

describe('Forecasts Page', () => {
  it('renders header', async () => {
    render(<Forecasts />)
    const title = screen.getByText("ForecastWeather")

    const svgConfig = screen.getByTestId('config-svg')
    const svgBack  = screen.queryByTestId('back-svg')

    const buttonWeather = screen.getByTestId('button-weather')

    expect(title).toBeInTheDocument()
    expect(svgConfig).toBeInTheDocument()
    expect(svgBack).not.toBeInTheDocument()
    expect(buttonWeather).toBeInTheDocument()
  })

  it ('renders button add' , () => {
    render(<Forecasts />)
    const title = screen.getByText('Add new location')

    expect(title).toBeInTheDocument()
  })

  it('renders not found', async () => {
    render(<Forecasts />)
    const title = screen.getByText('My widgets')

    expect(title).toBeInTheDocument()

    const notFound = screen.getByText('Not found Widgets')

    expect(notFound).toBeInTheDocument()

    const div = screen.queryByRole('feed')

    expect(div).not.toBeInTheDocument()
  })

  it('renders cards', async () => {
    window.localStorage.setItem('weathers', JSON.stringify([mockWeather, mockWeather]))
    render(<Forecasts />)
    const title = screen.getByText('My widgets')

    expect(title).toBeInTheDocument()

    const notFound = screen.queryByText('Not found Widgets')

    expect(notFound).not.toBeInTheDocument()

    const div = screen.queryAllByRole('feed')

    expect(div).toHaveLength(2)
  })
})