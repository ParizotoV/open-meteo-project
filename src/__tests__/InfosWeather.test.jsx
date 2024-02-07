import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import InfosWeather from '../templates/forecasts/components/InfosWeather'
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

describe('InfosWeather', () => {
  it('renders InfosWeather', async () => {
    render(<InfosWeather weather={mockWeather} />)

    expect(screen.getByText('Wednesday')).toBeInTheDocument()
    expect(screen.getByText('20 °C')).toBeInTheDocument()
    expect(screen.getByText('15.8 °C')).toBeInTheDocument()
    expect(screen.getByText('27.9 °C')).toBeInTheDocument()
    expect(screen.getByText('9.7 km/h')).toBeInTheDocument()
    expect(screen.getByText('9 %')).toBeInTheDocument()
  })
})