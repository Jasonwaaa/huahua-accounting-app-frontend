import { type StoryObj, type Meta } from '@storybook/react'
import WaveAndStarBackground from './WaveAndStarBackground'

const meta = {
  title: 'Components/WaveAndStarBackground',
  component: WaveAndStarBackground,
  tags: ['autodocs'],
} satisfies Meta<typeof WaveAndStarBackground>

export default meta

type Story = StoryObj<typeof WaveAndStarBackground>

export const Default: Story = {
  args: {
    children: <div className="h-96 w-96" />,
  },
}
