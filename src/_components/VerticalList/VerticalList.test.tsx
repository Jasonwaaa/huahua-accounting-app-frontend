import { render, screen } from '@testing-library/react'
import VerticalList from './VerticalList'

describe('VerticalList', () => {
  test('renders children', () => {
    render(
      <VerticalList>
        <VerticalList.Item>Test item</VerticalList.Item>
      </VerticalList>
    )

    expect(screen.getByRole('listitem')).toHaveTextContent('Test item')
  })
})
