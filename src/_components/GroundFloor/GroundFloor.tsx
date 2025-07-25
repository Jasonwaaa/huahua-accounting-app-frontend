import { FC, useEffect, useRef } from 'react'
import draw from './_utils/draw'

interface Props {
  texture: 'grass' | 'wood'
}

const GroundFloor: FC<Props> = ({ texture }) => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current

    void draw(canvas, texture)
  }, [texture])

  return (
    <canvas ref={ref} role="img" aria-label={`Ground Floor - ${texture}`} />
  )
}

export default GroundFloor
