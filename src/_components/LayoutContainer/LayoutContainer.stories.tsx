import { type Meta, type StoryObj } from '@storybook/react'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'
import LayoutContainer from './LayoutContainer'

const meta = {
  title: 'Components/LayoutContainer',
  component: LayoutContainer,
  tags: ['autodocs'],
} satisfies Meta<typeof LayoutContainer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <p className="text-center">
        This content is wrapped in LayoutContainer with
        <br />
        <b>mx-auto max-w-[1690px] px-4</b>.
      </p>
    ),
    className: 'h-32 bg-blue-300',
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        bigScreen: {
          name: '2K Screen',
          styles: {
            width: '2560px',
            height: '1440px',
          },
          type: 'desktop',
        },
        ...MINIMAL_VIEWPORTS,
      },
      defaultViewport: 'bigScreen',
    },
  },
}
