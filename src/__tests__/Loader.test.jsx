import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Loader from '../components/Loader/Loader'

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

describe('Loader', () => {
  it('renders loader', async () => {
    render(<Loader />)
    const subtitle = screen.getByText("Loading...")

    const svgConfig = screen.getByTestId('loader-svg')

    expect(subtitle).toBeInTheDocument()
    expect(svgConfig).toBeInTheDocument()
  })
})