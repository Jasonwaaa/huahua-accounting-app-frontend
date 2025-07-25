import { render, screen } from '@testing-library/react'
import GlobalLoading from './GlobalLoading'

describe('GlobalLoading', () => {
  test('renders the loading message', () => {
    render(<GlobalLoading />)

    expect(
      screen.getByText('Please wait, we are syncing the metaverse...')
    ).toBeInTheDocument()
  })

  test('renders the spinner element', () => {
    render(<GlobalLoading />)

    expect(screen.getByLabelText('Loading indicator')).toBeInTheDocument()
  })
})
