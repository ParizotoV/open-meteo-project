import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Card from '../templates/forecasts/Card'
import { mockWeather }from '../utils/util'


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

describe('Card', () => {
  it('renders card', async () => {
    render(<Card weather={mockWeather} />)

    expect(screen.getByText('Wednesday')).toBeInTheDocument()
    expect(screen.getByText('20 °C')).toBeInTheDocument()
    expect(screen.getByText('15.8 °C')).toBeInTheDocument()
    expect(screen.getByText('27.9 °C')).toBeInTheDocument()
    expect(screen.getByText('9.7 km/h')).toBeInTheDocument()
    expect(screen.getByText('9 %')).toBeInTheDocument()

    expect(screen.getByText(`Lat: ${mockWeather.latitude} Long: ${mockWeather.longitude}`)).toBeInTheDocument()

    expect(screen.getByText('Curitiba/PR')).toBeInTheDocument()
    expect(screen.getByTestId('map-pin-svg')).toBeInTheDocument()
  })

  it('renders options menu', () => {
    render(<Card weather={mockWeather} />)

    expect(screen.queryByText('Details')).not.toBeInTheDocument()
    expect(screen.queryByText('Delete')).not.toBeInTheDocument()
    expect(screen.queryByText('Reload')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('button-menu'))
    
    expect(screen.getByText('Details')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.getByText('Reload')).toBeInTheDocument()
  })

  it ('renders loading...', () => {
    render(<Card weather={mockWeather} />)

    fireEvent.click(screen.getByTestId('button-menu'))
    fireEvent.click(screen.getByText('Reload'))

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})