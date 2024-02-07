import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import AddForecast from '../app/add-forecast/page'
import FormAddForecast from '../templates/add-forecast/FormAddForecast'

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

describe('AddForecast Page', () => {
  it('renders header', () => {
    render(<AddForecast />)
    const title = screen.getByText('ForecastWeather')
    const buttonBack = screen.getByTestId('back-svg')
    const buttonWeather = screen.getByTestId('button-weather')

    expect(title).toBeInTheDocument()
    expect(buttonBack).toBeInTheDocument()
    expect(buttonWeather).toBeInTheDocument()
  })

  it('renders form', () => {
    render(<AddForecast />)

    const form = screen.getByRole('form')

    expect(form).toBeInTheDocument()

    const inputLatitude = screen.getByPlaceholderText('Latitude')

    expect(inputLatitude).toBeInTheDocument()

    const inputLongitude = screen.getByPlaceholderText('Longitude')

    expect(inputLongitude).toBeInTheDocument()
    
    const button = screen.getByTestId('button-submit')

    expect(button).toBeInTheDocument()
  })

  it('should fill out the form', async () => {
    render(<FormAddForecast/>)

    const form = screen.getByRole('form')

    expect(form).toBeInTheDocument()

    const inputLatitude = screen.getByPlaceholderText('Latitude')

    expect(inputLatitude).toBeInTheDocument()

    fireEvent.change(inputLatitude, { target: { value: -25.365617 } })

    expect(inputLatitude).toHaveValue(-25.365617)

    const inputLongitude = screen.getByPlaceholderText('Longitude')

    expect(inputLongitude).toBeInTheDocument()

    fireEvent.change(inputLongitude, { target: { value: -49.193972 } })

    expect(inputLongitude).toHaveValue(-49.193972)
    
    const button = screen.getByTestId('button-submit')

    expect(button).toBeInTheDocument()
  })
})