import { type Meta, type StoryObj } from '@storybook/react-vite'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Suffix: Story = {
  args: {
    children: 'Button with Suffix',
    suffix: {
      label: 'Camera',
      icon: 'camera',
    },
  },
}

export const Prefix: Story = {
  args: {
    children: 'Button with Prefix',
    prefix: {
      label: 'Camera',
      icon: 'camera',
    },
  },
}

export const PrefixSuffix: Story = {
  args: {
    children: 'Button with Suffix and Prefix',
    prefix: {
      label: 'Camera',
      icon: 'camera',
    },
    suffix: {
      label: 'Apple',
      icon: 'apple',
    },
  },
}
