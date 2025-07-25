import { type Meta, type StoryObj } from '@storybook/react'
import Button from '../Button'
import Tooltip from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  args: {
    text: 'Tooltip',
    position: 'bottom',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
}
