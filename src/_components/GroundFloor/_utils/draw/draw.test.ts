import getAsset, { SPRITE_SIZE } from '@/utils/getAsset'
import draw from '.'

vi.mock('@/utils/getAsset')
const getAssetMock = vi.mocked(getAsset)

describe('draw', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test.each(['wood', 'grass'] as const)(
    'draws ground in texture %s',
    async (texture) => {
      const canvas = document.createElement('canvas')

      const context = {
        save: jest.fn(),
        drawImage: jest.fn(),
        restore: jest.fn(),
      } as unknown as CanvasRenderingContext2D

      vi.spyOn(canvas, 'getContext').mockReturnValue(context)

      const image = new Image()
      getAssetMock.mockResolvedValue(image)

      await draw(canvas, texture)

      expect(canvas.width).toBe(SPRITE_SIZE)
      expect(canvas.height).toBe(SPRITE_SIZE)

      expect(getAsset).toHaveBeenCalled()

      expect(context.save).toHaveBeenCalled()

      expect(context.drawImage).toHaveBeenCalledWith(
        image,
        0,
        ['wood', 'grass'].indexOf(texture) * SPRITE_SIZE,
        SPRITE_SIZE,
        SPRITE_SIZE,
        0,
        0,
        SPRITE_SIZE,
        SPRITE_SIZE
      )

      expect(context.restore).toHaveBeenCalled()
    }
  )

  test('does not draw if context is not available', async () => {
    const canvas = document.createElement('canvas')

    vi.spyOn(canvas, 'getContext').mockReturnValue(null)

    await draw(canvas, 'grass')

    expect(getAsset).not.toHaveBeenCalled()
  })

  test('does not draw if canvas is null', async () => {
    await draw(null, 'grass')

    expect(getAsset).not.toHaveBeenCalled()
  })
})
