import { type Meta, type StoryObj } from '@storybook/react'
import GlobalLoading from './GlobalLoading'

const meta = {
  title: 'Components/GlobalLoading',
  component: GlobalLoading,
  tags: ['autodocs'],
} satisfies Meta<typeof GlobalLoading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
