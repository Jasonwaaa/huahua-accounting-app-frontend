import { FC, useState, useRef, useEffect } from 'react'
import Button from '@/_components/Button'
import { GroupedEmoji } from '../../_utils/createGroupedEmojis'

interface Emoji {
  label: string
  unicode: string
}

interface Props {
  selectedGroupedEmoji: GroupedEmoji | GroupedEmoji[]
  onEmojiClick: (emoji: Emoji) => void
}

export const EMOJIS_PER_PAGE = 40

const Emojis: FC<Props> = ({ selectedGroupedEmoji, onEmojiClick }) => {
  const emojis = Array.isArray(selectedGroupedEmoji)
    ? selectedGroupedEmoji.flatMap((groupedEmoji) => groupedEmoji.emojis)
    : selectedGroupedEmoji.emojis
  const [count, setCount] = useState(EMOJIS_PER_PAGE)
  const loadRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!loadRef.current) {
      return
    }

    const observer = new IntersectionObserver(
      (): void => {
        setCount((prev) => prev + 40)
      },
      { rootMargin: '100px' }
    )

    observer.observe(loadRef.current)

    return (): void => {
      observer.disconnect()
    }
  }, [count])

  const lazyEmojis = emojis.slice(0, count)
  const hasMore = emojis.length > count

  return (
    <div role="region" aria-label="Emojis" className="grid grid-cols-8 gap-1">
      {lazyEmojis.map((emoji) => (
        <Button
          variant="naked"
          title={emoji.label}
          key={emoji.unicode}
          onClick={() =>
            onEmojiClick({
              label: emoji.label,
              unicode: emoji.unicode,
            })
          }
        >
          <span className="size-full text-2xl">{emoji.unicode}</span>
        </Button>
      ))}
      {hasMore && (
        <div ref={loadRef} role="status" aria-label="Loading more emojis" />
      )}
    </div>
  )
}

export default Emojis
