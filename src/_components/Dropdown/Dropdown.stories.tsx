import { type Meta, type StoryObj } from '@storybook/react'
import Button from '../Button'
import IconButton from '../IconButton'
import Dropdown from './Dropdown'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: (toggle: () => void, isOpen: boolean) => (
      <Button
        onClick={toggle}
        variant={isOpen ? 'secondary' : 'primary'}
        suffix={{ icon: 'chevron-down', label: 'Toggle dropdown' }}
      >
        Menu
      </Button>
    ),
    children: (
      <div className="w-[300px] space-y-4 rounded border border-neutral-300 bg-white px-2 py-4">
        <div className="space-y-2">
          <div className="px-2">
            <span>Primary</span>
          </div>
          <Button
            variant="primary"
            prefix={{ icon: 'nut', label: 'Nut' }}
            className="w-full"
          >
            Button
          </Button>
        </div>

        <hr className="border-neutral-300" />

        <div className="space-y-2">
          <div className="px-2">
            <span>Title</span>
          </div>
          <Button
            variant="secondary"
            suffix={{ icon: 'ham', label: 'Ham' }}
            className="w-full"
          >
            Button
          </Button>
        </div>

        <hr className="border-neutral-300" />

        <div className="flex justify-end">
          <IconButton icon="apple" label="Apple" variant="secondary" />
        </div>
      </div>
    ),
    position: 'bottom-left',
  },
}
