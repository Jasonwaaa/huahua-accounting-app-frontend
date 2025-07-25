import { type Meta, type StoryObj } from '@storybook/react'
import IconButton from './IconButton'

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      options: ['iconName', 'iconConfig'],
      mapping: {
        iconName: 'beer',
        iconConfig: { name: 'trash', label: 'Custom Icon Label' },
      },
      control: {
        type: 'select',
        labels: {
          iconName: 'Beer (Name)',
          iconConfig: 'trash (Config)',
        },
      },
    },
  },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    label: 'Beer',
    icon: 'beer',
  },
}
