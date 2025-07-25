import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VARIANT as BUTTON_VARIANT } from '@/_components/Button'
import { CHARACTERS } from '@/utils/getCharacter'
import AvatarPicker from './AvatarPicker'

describe('AvatarPicker', () => {
  test.each(CHARACTERS)('renders %s character', (character) => {
    render(<AvatarPicker onChange={vi.fn()} value="" />)

    expect(screen.getByRole('button', { name: character })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: character })).toHaveClass(
      BUTTON_VARIANT.secondary
    )
  })

  test('selects the character with provided value', () => {
    const value = 'FEMALE_01'

    render(<AvatarPicker onChange={vi.fn()} value={value} />)

    expect(screen.getByRole('button', { name: value })).toHaveClass(
      BUTTON_VARIANT.success
    )
  })

  test('selects character on click', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<AvatarPicker onChange={onChange} value="" />)

    await user.click(screen.getByRole('button', { name: 'FEMALE_01' }))

    expect(onChange).toHaveBeenCalledWith('FEMALE_01')
  })
})
