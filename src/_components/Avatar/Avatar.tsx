import { FC, useEffect, useRef } from 'react'
import { isCharacter } from '@/utils/getCharacter'
import draw from './_utils/draw'

interface Props {
  character: string
  name: string
}

const Avatar: FC<Props> = ({ character, name }) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current

    if (!isCharacter(character)) {
      return
    }

    void draw(canvas, character)
  }, [character])

  if (!isCharacter(character)) {
    return null
  }

  return <canvas role="img" aria-label={name} ref={ref} />
}

export default Avatar
