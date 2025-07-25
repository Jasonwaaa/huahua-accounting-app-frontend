import getAsset, { SPRITE_SIZE } from '@/utils/getAsset'

const draw = async (
  canvas: HTMLCanvasElement | null,
  texture: 'grass' | 'wood'
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

  const image = await getAsset('ground')

  const sx = 0
  const sy = ['wood', 'grass'].indexOf(texture) * SPRITE_SIZE

  context.save()

  context.drawImage(
    image,
    sx,
    sy,
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
