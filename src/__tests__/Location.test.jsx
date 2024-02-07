import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Location from '../templates/forecasts/components/Location'
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

describe('Location', () => {
  it('renders InfosWeather', async () => {
    render(<Location weather={mockWeather} />)

    expect(screen.getByText('Curitiba/PR')).toBeInTheDocument()
    expect(screen.getByTestId('map-pin-svg')).toBeInTheDocument()
  })
})