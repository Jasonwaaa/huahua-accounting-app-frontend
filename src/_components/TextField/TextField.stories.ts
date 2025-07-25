import { type Meta, type StoryObj } from '@storybook/react'
import TextField from './TextField'

const meta = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof TextField>

export const Default: Story = {
  args: {
    label: 'Text Field',
  },
}

export const WithPrefixIcon: Story = {
  args: {
    label: 'With Input Props',
    prefix: {
      name: 'search',
      label: 'Search',
    },
  },
}

export const ErrorState: Story = {
  args: {
    label: 'Text Field',
    errorMessage: 'Incorrect entry',
  },
}
