import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { VARIANT } from '@/_components/Button'
import { GroupedEmoji } from '../../_utils/createGroupedEmojis'
import Header from './Header'
import isSelectedGroup from './_utils/isSelectedGroup'

vi.mock('./_utils/isSelectedGroup')
const isSelectedGroupMock = vi.mocked(isSelectedGroup)

describe('Header', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders the search button', async () => {
    const groupedEmojis = [] as GroupedEmoji[]

    render(
      <Header
        onSelectGroupedEmoji={vi.fn()}
        selectedGroupedEmoji={groupedEmojis}
        groupedEmojis={groupedEmojis}
      />
    )

    expect(
      await screen.findByRole('button', { name: 'Search' })
    ).toBeInTheDocument()
  })

  test('selects groupedEmojis when clicking search button', async () => {
    const onSelectGroupedEmoji = vi.fn()
    const groupedEmojis = [] as GroupedEmoji[]

    const user = userEvent.setup()

    render(
      <Header
        onSelectGroupedEmoji={onSelectGroupedEmoji}
        selectedGroupedEmoji={groupedEmojis}
        groupedEmojis={groupedEmojis}
      />
    )

    await waitFor(async () => {
      await user.click(screen.getByLabelText('Search'))
    })

    expect(onSelectGroupedEmoji).toHaveBeenCalledWith(groupedEmojis)
  })

  test.each(['Smileys & Emotion', 'People & Body'] as const)(
    'renders emoji %s group button',
    async (message) => {
      const groupedEmojis = [
        {
          key: 'smileys-emotion',
          icon: 'dog',
          label: 'Smileys & Emotion',
          emojis: [],
        },
        {
          key: 'people-body',
          icon: 'dog',
          label: 'People & Body',
          emojis: [],
        },
      ] as GroupedEmoji[]

      render(
        <Header
          onSelectGroupedEmoji={vi.fn()}
          selectedGroupedEmoji={groupedEmojis}
          groupedEmojis={groupedEmojis}
        />
      )

      expect(
        await screen.findByRole('button', { name: message })
      ).toBeInTheDocument()
    }
  )

  test('selects emoji groups when user click emoji group', async () => {
    const groupedEmojis = [
      {
        key: 'smileys-emotion',
        icon: 'dog',
        label: 'Smileys & Emotion',
        group: 0,
        emojis: [],
      },
    ] as GroupedEmoji[]

    isSelectedGroupMock.mockReturnValue(false)

    const onSelectGroupedEmoji = vi.fn()

    const user = userEvent.setup()

    render(
      <Header
        onSelectGroupedEmoji={onSelectGroupedEmoji}
        selectedGroupedEmoji={groupedEmojis[0]}
        groupedEmojis={groupedEmojis}
      />
    )

    expect(
      await screen.findByRole('button', { name: groupedEmojis[0].label })
    ).toHaveClass(VARIANT.naked)

    await user.click(
      await screen.findByRole('button', { name: groupedEmojis[0].label })
    )

    expect(onSelectGroupedEmoji).toHaveBeenCalledWith(groupedEmojis[0])
  })

  test('renders selected emoji with primary variant', async () => {
    const groupedEmojis = [
      {
        key: 'smileys-emotion',
        icon: 'dog',
        label: 'Smileys & Emotion',
        group: 0,
        emojis: [],
      },
    ] as GroupedEmoji[]

    isSelectedGroupMock.mockReturnValue(true)

    render(
      <Header
        onSelectGroupedEmoji={vi.fn()}
        selectedGroupedEmoji={groupedEmojis[0]}
        groupedEmojis={groupedEmojis}
      />
    )

    expect(
      await screen.findByRole('button', { name: groupedEmojis[0].label })
    ).toHaveClass(VARIANT.primary)

    expect(isSelectedGroup).toHaveBeenCalledWith(
      groupedEmojis[0],
      groupedEmojis[0]
    )
  })
})
