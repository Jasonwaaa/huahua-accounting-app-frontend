import { GroupedEmoji } from '@/_components/EmojiPicker/_utils/createGroupedEmojis'

const isSelectedGroup = (
  selected: GroupedEmoji | GroupedEmoji[],
  group: GroupedEmoji
): boolean => !Array.isArray(selected) && selected.group === group.group

export default isSelectedGroup
