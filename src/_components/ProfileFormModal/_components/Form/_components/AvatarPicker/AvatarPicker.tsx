import { FC } from 'react'
import Avatar, { Character, CHARACTERS } from '@/_components/Avatar'
import Button from '@/_components/Button'

export const ANIMALS = [
  'bird',
  'cat',
  'dog',
  'fish',
  'rabbit',
  'snail',
  'squirrel',
  'turtle',
  'worm',
  'rat',
] as const

interface Props {
  value: string
  onChange: (value: Character) => void
}

const AvatarPicker: FC<Props> = ({ onChange, value }) => (
  <div className="flex flex-wrap gap-1">
    {CHARACTERS.map((character) => (
      <Button
        key={character}
        onClick={() => onChange(character)}
        variant={value === character ? 'success' : 'secondary'}
      >
        <Avatar character={character} name={character} />
      </Button>
    ))}
  </div>
)

export default AvatarPicker
