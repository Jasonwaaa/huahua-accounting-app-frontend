import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GroupedEmoji } from '../../_utils/createGroupedEmojis'
import Emojis, { EMOJIS_PER_PAGE } from './Emojis'

describe('Emojis', () => {
  test('renders all emojis', () => {
    const smileysEmotion = '😀'
    const peopleBody = '👌'

    const groupedEmojis = [
      {
        key: 'smileys-emotion',
        icon: 'dog',
        group: 0,
        label: 'Smileys & Emotion',
        emojis: [{ unicode: smileysEmotion }],
      },
      {
        key: 'people-body',
        icon: 'dog',
        group: 1,
        label: 'People & Body',
        emojis: [{ unicode: peopleBody }],
      },
    ] as GroupedEmoji[]

    render(
      <Emojis selectedGroupedEmoji={groupedEmojis} onEmojiClick={vi.fn()} />
    )
    expect(screen.getByText(smileysEmotion)).toBeInTheDocument()
    expect(screen.getByText(peopleBody)).toBeInTheDocument()
  })

  test('renders emojis belongs to the given group', () => {
    const smileysEmotion = '😀'
    const peopleBody = '👌'

    const selectedGroupedEmoji = {
      key: 'people-body',
      icon: 'dog',
      group: 1,
      label: 'People & Body',
      emojis: [{ unicode: peopleBody }],
    } as unknown as GroupedEmoji

    render(
      <Emojis
        selectedGroupedEmoji={selectedGroupedEmoji}
        onEmojiClick={vi.fn()}
      />
    )

    expect(screen.queryByText(smileysEmotion)).not.toBeInTheDocument()
    expect(screen.getByText(peopleBody)).toBeInTheDocument()
  })

  test('calls onEmojiClick when an emoji is clicked', async () => {
    const unicode = '👌'

    const selectedGroupedEmoji = {
      key: 'people-body',
      icon: 'dog',
      group: 1,
      label: 'People & Body',
      emojis: [
        {
          unicode,
          label: 'ok',
        },
      ],
    } as unknown as GroupedEmoji

    const onEmojiClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Emojis
        selectedGroupedEmoji={selectedGroupedEmoji}
        onEmojiClick={onEmojiClick}
      />
    )

    expect(screen.getByText(unicode)).toBeInTheDocument()
    await user.click(screen.getByText(unicode))
    expect(onEmojiClick).toHaveBeenCalledWith({
      label: 'ok',
      unicode,
    })
  })

  test('renders only EMOJIS_PER_PAGE emojis when emojis are first loaded', () => {
    const selectedGroupedEmoji = {
      key: 'smileys-emotion',
      icon: 'dog',
      group: 0,
      label: 'Smileys & Emotion',
      emojis: Array.from({ length: 200 }, (_, i) => ({
        unicode: '😀' + i,
        label: `ok-${i + 1}`,
      })),
    } as unknown as GroupedEmoji

    render(
      <Emojis
        selectedGroupedEmoji={selectedGroupedEmoji}
        onEmojiClick={vi.fn()}
      />
    )

    expect(screen.getAllByRole('button')).toHaveLength(EMOJIS_PER_PAGE)
  })

  test('renders more emojis when IntersectionObserver callback is triggered', () => {
    const selectedGroupedEmoji = {
      key: 'smileys-emotion',
      icon: 'dog',
      group: 0,
      label: 'Smileys & Emotion',
      emojis: Array.from({ length: 200 }, (_, i) => ({
        unicode: '😀' + i,
        label: `ok-${i + 1}`,
      })),
    } as unknown as GroupedEmoji
    let callback: (entry: IntersectionObserverEntry[]) => void

    const entry = [
      { isIntersecting: true } as unknown as IntersectionObserverEntry,
    ]

    const IntersectionObserverMock = vi.fn(
      (cb: (entry: IntersectionObserverEntry[]) => void) => {
        const observer = {
          disconnect: vi.fn(),
          observe: vi.fn(),
          unobserve: vi.fn(),
        }
        callback = cb

        return observer
      }
    )
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
    render(
      <Emojis
        selectedGroupedEmoji={selectedGroupedEmoji}
        onEmojiClick={vi.fn()}
      />
    )
    expect(screen.getAllByRole('button')).toHaveLength(EMOJIS_PER_PAGE)
    expect(
      screen.getByRole('status', { name: 'Loading more emojis' })
    ).toBeInTheDocument()

    act(() => {
      callback(entry)
    })

    expect(screen.getAllByRole('button')).toHaveLength(
      EMOJIS_PER_PAGE + EMOJIS_PER_PAGE
    )
  })

  test('disconnects observer after all emojis are loaded', () => {
    const count = 79

    const selectedGroupedEmoji = {
      key: 'smileys-emotion',
      icon: 'dog',
      group: 0,
      label: 'Smileys & Emotion',
      emojis: Array.from({ length: count }, (_, i) => ({
        unicode: '😀' + i,
        label: `ok-${i + 1}`,
      })),
    } as unknown as GroupedEmoji

    const entry = [
      { isIntersecting: true } as unknown as IntersectionObserverEntry,
    ]

    const disconnect = vi.fn()

    const IntersectionObserverMock = vi.fn(
      (cb: (entry: IntersectionObserverEntry[]) => void) => {
        const observer = {
          disconnect,
          observe: vi.fn(),
          unobserve: vi.fn(),
        }
        cb(entry)

        return observer
      }
    )
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
    render(
      <Emojis
        selectedGroupedEmoji={selectedGroupedEmoji}
        onEmojiClick={vi.fn()}
      />
    )

    expect(screen.getAllByRole('button')).toHaveLength(count)
    expect(disconnect).toHaveBeenCalled()
    expect(
      screen.queryByRole('status', { name: 'Loading more emojis' })
    ).not.toBeInTheDocument()
  })
})
