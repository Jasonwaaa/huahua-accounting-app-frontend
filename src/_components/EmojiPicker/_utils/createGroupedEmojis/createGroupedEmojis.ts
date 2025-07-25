import { CompactEmoji, GroupKey } from 'emojibase'
import compactEmojis from 'emojibase-data/en/compact.json'
import groupsSubgroups from 'emojibase-data/en/messages.json'
import { IconName } from 'lucide-react/dynamic'

export const EMOJI_GROUPS: EmojiGroup[] = [
  {
    key: 'smileys-emotion',
    label: 'Smileys & Emotion',
    icon: 'smile',
  },
  {
    key: 'people-body',
    label: 'People & Body',
    icon: 'baby',
  },
  {
    key: 'animals-nature',
    label: 'Animals & Nature',
    icon: 'leafy-green',
  },
  {
    key: 'food-drink',
    label: 'Food & Drink',
    icon: 'ham',
  },
  {
    key: 'travel-places',
    label: 'Travel & Places',
    icon: 'plane',
  },
  {
    key: 'activities',
    label: 'Activities',
    icon: 'dumbbell',
  },
  {
    key: 'objects',
    label: 'Objects',
    icon: 'lightbulb',
  },
  {
    key: 'symbols',
    label: 'Symbols',
    icon: 'badge-percent',
  },
  {
    key: 'flags',
    label: 'Flags',
    icon: 'flag',
  },
]

interface EmojiGroup {
  key: GroupKey
  label: string
  icon: IconName
}

export interface GroupedEmoji extends EmojiGroup {
  emojis: CompactEmoji[]
  group?: number
}

const createGroupedEmojis = (): GroupedEmoji[] =>
  EMOJI_GROUPS.map((emojiGroup) => {
    const order = groupsSubgroups.groups.find(
      (group) => group.key === emojiGroup.key
    )?.order

    const emojis = compactEmojis.filter(
      (compactEmoji) => compactEmoji.group === order
    )

    return { ...emojiGroup, group: order, emojis }
  })

export default createGroupedEmojis
