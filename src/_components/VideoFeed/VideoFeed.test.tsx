import { render, screen } from '@testing-library/react'
import VideoFeed from './VideoFeed'

describe('VideoFeed', () => {
  test('renders video attached to stream', () => {
    const stream = {} as unknown as MediaStream
    render(<VideoFeed stream={stream} />)

    expect(
      screen.getByLabelText<HTMLVideoElement>('Video Feed').srcObject
    ).toBe(stream)

    expect(screen.getByLabelText<HTMLVideoElement>('Video Feed').muted).toBe(
      false
    )
  })

  test('renders className', () => {
    const stream = {} as unknown as MediaStream
    const className = 'CLASS_NAME'
    render(<VideoFeed stream={stream} className={className} />)

    expect(screen.getByLabelText<HTMLVideoElement>('Video Feed')).toHaveClass(
      className
    )
  })

  test('renders muted video', () => {
    const stream = {} as unknown as MediaStream
    render(<VideoFeed stream={stream} isMuted />)

    expect(screen.getByLabelText<HTMLVideoElement>('Video Feed').muted).toBe(
      true
    )
  })
})
