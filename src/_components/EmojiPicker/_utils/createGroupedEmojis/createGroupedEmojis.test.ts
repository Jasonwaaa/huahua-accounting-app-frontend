import createGroupedEmojis from './createGroupedEmojis'

vi.mock('emojibase-data/en/compact.json', () => ({
  default: [{ unicode: '😀', group: 0 }],
}))

vi.mock('emojibase-data/en/messages.json', () => ({
  default: {
    groups: [{ key: 'smileys-emotion', label: 'Smileys & Emotion', order: 0 }],
  },
}))

describe('createGroupedEmojis', () => {
  test('returns groupedEmojis', () => {
    const groupedEmojis = createGroupedEmojis()

    expect(groupedEmojis).toEqual([
      {
        emojis: [
          {
            group: 0,
            unicode: '😀',
          },
        ],
        group: 0,
        icon: 'smile',
        key: 'smileys-emotion',
        label: 'Smileys & Emotion',
      },
      {
        emojis: [],
        icon: 'baby',
        key: 'people-body',
        label: 'People & Body',
      },
      {
        emojis: [],
        icon: 'leafy-green',
        key: 'animals-nature',
        label: 'Animals & Nature',
      },
      {
        emojis: [],
        icon: 'ham',
        key: 'food-drink',
        label: 'Food & Drink',
      },
      {
        emojis: [],
        icon: 'plane',
        key: 'travel-places',
        label: 'Travel & Places',
      },
      {
        emojis: [],
        icon: 'dumbbell',
        key: 'activities',
        label: 'Activities',
      },
      {
        emojis: [],
        icon: 'lightbulb',
        key: 'objects',
        label: 'Objects',
      },
      {
        emojis: [],
        icon: 'badge-percent',
        key: 'symbols',
        label: 'Symbols',
      },
      {
        emojis: [],
        icon: 'flag',
        key: 'flags',
        label: 'Flags',
      },
    ])
  })
})
