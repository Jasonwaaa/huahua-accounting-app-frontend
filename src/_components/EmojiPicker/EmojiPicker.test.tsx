import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmojiPicker from './EmojiPicker'
import createGroupedEmojis, { GroupedEmoji } from './_utils/createGroupedEmojis'

vi.mock('./_utils/createGroupedEmojis')
const createGroupedEmojisMock = vi.mocked(createGroupedEmojis)

describe('EmojiPicker', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders header', async () => {
    createGroupedEmojisMock.mockReturnValue([] as GroupedEmoji[])

    render(<EmojiPicker onEmojiClick={vi.fn()} />)

    expect(createGroupedEmojis).toHaveBeenCalled()

    expect(
      await screen.findByRole('button', { name: 'Search' })
    ).toBeInTheDocument()
  })

  test('renders search textbox', () => {
    createGroupedEmojisMock.mockReturnValue([] as GroupedEmoji[])

    render(<EmojiPicker onEmojiClick={vi.fn()} />)

    expect(screen.getByPlaceholderText('Search all emojis')).toBeInTheDocument()
  })

  test('does not render search field when a group is selected', async () => {
    createGroupedEmojisMock.mockReturnValue([
      {
        key: 'smileys-emotion',
        icon: 'dog',
        group: 0,
        label: 'Smileys & Emotion',
        emojis: [],
      },
    ] as GroupedEmoji[])

    const user = userEvent.setup()

    render(<EmojiPicker onEmojiClick={vi.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'Smileys & Emotion' })
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Smileys & Emotion' }))

    expect(
      screen.queryByPlaceholderText('Search all emojis')
    ).not.toBeInTheDocument()
  })

  test('renders formatted group title when a group is selected', async () => {
    createGroupedEmojisMock.mockReturnValue([
      {
        key: 'smileys-emotion',
        icon: 'dog',
        label: 'Smileys & Emotion',
        emojis: [],
      },
    ] as GroupedEmoji[])

    const user = userEvent.setup()

    render(<EmojiPicker onEmojiClick={vi.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'Smileys & Emotion' })
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Smileys & Emotion' }))

    expect(screen.getByLabelText('Smileys & Emotion')).toBeInTheDocument()
  })

  test('renders emojis', () => {
    const emoji = '😀'

    createGroupedEmojisMock.mockReturnValue([
      {
        key: 'smileys-emotion',
        icon: 'dog',
        group: 0,
        label: 'Smileys & Emotion',
        emojis: [{ unicode: emoji }],
      },
    ] as GroupedEmoji[])

    render(<EmojiPicker onEmojiClick={vi.fn()} />)

    expect(screen.getByText(emoji)).toBeInTheDocument()
  })

  test('does not render emojis from other groups when a group is selected', async () => {
    const emoji = '👌'

    createGroupedEmojisMock.mockReturnValue([
      {
        key: 'smileys-emotion',
        icon: 'dog',
        group: 0,
        label: 'Smileys & Emotion',
        emojis: [{ unicode: '😀' }],
      },
      {
        key: 'people-body',
        icon: 'dog',
        group: 1,
        label: 'People & Body',
        emojis: [{ unicode: emoji }],
      },
    ] as GroupedEmoji[])

    const user = userEvent.setup()

    render(<EmojiPicker onEmojiClick={vi.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'Smileys & Emotion' })
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Smileys & Emotion' }))

    expect(screen.queryByText(emoji)).not.toBeInTheDocument()
  })

  test('calls onEmojiClick when an emoji is clicked', async () => {
    const emoji = {
      unicode: '😀',
      label: 'smile',
    }

    createGroupedEmojisMock.mockReturnValue([
      {
        key: 'smileys-emotion',
        icon: 'dog',
        group: 0,
        label: 'Smileys & Emotion',
        emojis: [emoji],
      },
    ] as GroupedEmoji[])

    const user = userEvent.setup()

    const onEmojiClick = vi.fn()

    render(<EmojiPicker onEmojiClick={onEmojiClick} />)

    expect(
      await screen.findByRole('button', { name: 'Smileys & Emotion' })
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Smileys & Emotion' }))

    await user.click(screen.getByText(emoji.unicode))

    expect(onEmojiClick).toHaveBeenCalledWith(emoji)
  })
})
