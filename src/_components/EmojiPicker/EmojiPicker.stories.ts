import { type Meta, type StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import EmojiPicker from './EmojiPicker'

const meta = {
  title: 'Components/EmojiPicker',
  component: EmojiPicker,
  tags: ['autodocs'],
} satisfies Meta<typeof EmojiPicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onEmojiClick: fn(),
  },
}
