import { GroupedEmoji } from '@/_components/EmojiPicker/_utils/createGroupedEmojis'
import isSelectedGroup from './isSelectedGroup'

describe('isSelectedGroup', () => {
  test('returns true if selected is the same group', () => {
    const groupA = { group: 0 } as GroupedEmoji
    const groupB = { group: 0 } as GroupedEmoji

    expect(isSelectedGroup(groupA, groupB)).toBeTruthy()
  })

  test('returns false if selected is Array', () => {
    const groupA = [{ group: 0 }] as GroupedEmoji[]
    const groupB = { group: 0 } as GroupedEmoji

    expect(isSelectedGroup(groupA, groupB)).toBeFalsy()
  })

  test('returns false if selected has a different group property', () => {
    const groupA = { group: 0 } as GroupedEmoji
    const groupB = { group: 1 } as GroupedEmoji

    expect(isSelectedGroup(groupA, groupB)).toBeFalsy()
  })
})
