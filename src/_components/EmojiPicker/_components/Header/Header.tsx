import { FC } from 'react'
import IconButton from '@/_components/IconButton'
import { GroupedEmoji } from '../../_utils/createGroupedEmojis'
import isSelectedGroup from './_utils/isSelectedGroup'

interface Props {
  selectedGroupedEmoji: GroupedEmoji | GroupedEmoji[]
  onSelectGroupedEmoji: (
    selectedGroupedEmoji: GroupedEmoji | GroupedEmoji[]
  ) => void
  groupedEmojis: GroupedEmoji[]
}

const Header: FC<Props> = ({
  selectedGroupedEmoji,
  onSelectGroupedEmoji,
  groupedEmojis,
}) => (
  <div className="flex flex-row justify-between space-x-2 p-3">
    <IconButton
      tooltip={{ position: 'top' }}
      icon="search"
      label="Search"
      variant={Array.isArray(selectedGroupedEmoji) ? 'primary' : 'naked'}
      size="small"
      circle
      onClick={() => onSelectGroupedEmoji(groupedEmojis)}
    />
    {groupedEmojis.map((groupedEmoji) => (
      <div key={groupedEmoji.key}>
        <IconButton
          tooltip={{ position: 'top' }}
          icon={groupedEmoji.icon}
          label={groupedEmoji.label}
          variant={
            isSelectedGroup(selectedGroupedEmoji, groupedEmoji)
              ? 'primary'
              : 'naked'
          }
          size="small"
          circle
          onClick={() => onSelectGroupedEmoji(groupedEmoji)}
        />
      </div>
    ))}
  </div>
)

export default Header
