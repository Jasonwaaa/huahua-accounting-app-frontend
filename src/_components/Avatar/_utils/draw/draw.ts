import getCharacter, { Character, SPRITE_SIZE } from '@/utils/getCharacter'

const draw = async (
  canvas: HTMLCanvasElement | null,
  character: Character
): Promise<void> => {
  if (!canvas) {
    return
  }

  canvas.width = SPRITE_SIZE
  canvas.height = SPRITE_SIZE

  const context = canvas.getContext('2d')

  if (!context) {
    return
  }

  const image = await getCharacter(character)

  context.save()

  context.drawImage(
    image,
    SPRITE_SIZE,
    0,
    SPRITE_SIZE,
    SPRITE_SIZE,
    0,
    0,
    SPRITE_SIZE,
    SPRITE_SIZE
  )

  context.restore()
}

export default draw
