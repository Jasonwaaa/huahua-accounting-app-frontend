import { type Meta, type StoryObj } from '@storybook/react'
import Chip from './Chip'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
} satisfies Meta<typeof Chip>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Project practice, job search, interview',
  },
}
