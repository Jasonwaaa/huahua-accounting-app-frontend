import { render } from '@testing-library/react'
import Item, { PLACEMENT } from './Item'

describe('Item', () => {
  test('renders children', () => {
    const { getByRole } = render(<Item>Item</Item>, {
      container: document.createElement('ul'),
    })

    expect(getByRole('listitem')).toHaveTextContent('Item')
  })

  test.each(['left', 'full', 'right'] as const)(
    'renders list item with %s placement',

    (placement) => {
      const { getByRole } = render(<Item placement={placement}>Item</Item>, {
        container: document.createElement('ul'),
      })

      expect(getByRole('listitem')).toHaveTextContent('Item')
      expect(getByRole('listitem')).toHaveClass(PLACEMENT[placement])
    }
  )
})
