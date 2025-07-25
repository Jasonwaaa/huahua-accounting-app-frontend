import { FC, useState } from 'react'
import TextField from '@/_components/TextField'
import Emojis from './_components/Emojis'
import Header from './_components/Header'
import createGroupedEmojis, { GroupedEmoji } from './_utils/createGroupedEmojis'

interface Emoji {
  label: string
  unicode: string
}

interface Props {
  onEmojiClick: (emoji: Emoji) => void
}

const EmojiPicker: FC<Props> = ({ onEmojiClick }) => {
  const groupedEmojis = createGroupedEmojis()

  const [selectedGroupedEmoji, setSelectedGroupedEmoji] = useState<
    GroupedEmoji[] | GroupedEmoji
  >(groupedEmojis)

  return (
    <div>
      <Header
        selectedGroupedEmoji={selectedGroupedEmoji}
        onSelectGroupedEmoji={setSelectedGroupedEmoji}
        groupedEmojis={groupedEmojis}
      />
      <hr />
      <div className="flex h-64 flex-col space-y-2 overflow-auto p-4">
        {!Array.isArray(selectedGroupedEmoji) ? (
          <span className="col-span-full pl-2 text-neutral-500">
            {selectedGroupedEmoji.label}
          </span>
        ) : (
          <TextField placeholder="Search all emojis" />
        )}
        <Emojis
          selectedGroupedEmoji={selectedGroupedEmoji}
          onEmojiClick={onEmojiClick}
        />
      </div>
    </div>
  )
}

export default EmojiPicker
