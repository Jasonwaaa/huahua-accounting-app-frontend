import { type Meta, type StoryObj } from '@storybook/react'
import Input from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const WithPrefix: Story = {
  args: {
    prefix: {
      name: 'search',
      label: 'Search',
    },
  },
}

export const WithPasswordRevealToggle: Story = {
  args: {
    type: 'password',
  },
}
