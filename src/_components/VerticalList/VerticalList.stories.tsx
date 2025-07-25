import { type Meta, type StoryObj } from '@storybook/react'
import Button from '../Button'
import IconButton from '../IconButton'
import Dropdown from '../Dropdown'
import VerticalList from './VerticalList'

const meta = {
  title: 'Components/VerticalList',
  component: VerticalList,
  tags: ['autodocs'],
} satisfies Meta<typeof VerticalList>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <></>,
  },

  render: () => (
    <Dropdown
      trigger={(toggle, isOpen) => (
        <Button
          onClick={toggle}
          variant={isOpen ? 'secondary' : 'primary'}
          suffix={{ icon: 'chevron-down', label: 'Toggle dropdown' }}
        >
          Menu
        </Button>
      )}
    >
      <VerticalList>
        <VerticalList.Item>
          <Button variant="primary" prefix={{ icon: 'nut', label: 'Nut' }}>
            Button
          </Button>
        </VerticalList.Item>
        <VerticalList.Divider />
        <VerticalList.Item>
          <Button variant="secondary" suffix={{ icon: 'bell', label: 'Bell' }}>
            Button
          </Button>
        </VerticalList.Item>
        <VerticalList.Divider />
        <VerticalList.Item>Plain Text</VerticalList.Item>
        <VerticalList.Divider />
        <VerticalList.Item placement="right">
          <IconButton icon="apple" label="Apple" variant="secondary" />
        </VerticalList.Item>
      </VerticalList>
    </Dropdown>
  ),
}
