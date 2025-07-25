import { type Meta, type StoryObj } from '@storybook/react'
import { type ComponentProps } from 'react'
import ButtonConfigurable from './ButtonConfigurable'

type ButtonConfigurableProps = ComponentProps<typeof ButtonConfigurable>

const meta: Meta<ButtonConfigurableProps> = {
  title: 'Components/ButtonConfigurable',
  component: ButtonConfigurable,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
    },
  },
}

export default meta

type Story = StoryObj<ButtonConfigurableProps>

export const Default: Story = {
  args: {
    icon: 'video',
    label: 'Video',
  },
}

export const Button: Story = {
  args: {
    children: 'Button',
  },
}
