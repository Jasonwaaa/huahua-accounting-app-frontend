import { type Meta, type StoryObj } from '@storybook/react'
import GradientBackground from './GradientBackground'

const meta = {
  title: 'Components/GradientBackground',
  component: GradientBackground,
  tags: ['autodocs'],
} satisfies Meta<typeof GradientBackground>

export default meta

type Story = StoryObj<typeof GradientBackground>

export const Default: Story = {
  args: {
    children: <div className="h-96 w-96" />,
  },
}
