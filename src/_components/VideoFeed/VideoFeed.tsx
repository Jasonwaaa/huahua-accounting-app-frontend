import { FC, useEffect, useRef } from 'react'

interface Props {
  stream: MediaStream
  className?: string
  isMuted?: boolean
}

const VideoFeed: FC<Props> = ({
  stream,
  className = undefined,
  isMuted = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  return (
    <video
      aria-label="Video Feed"
      className={className}
      ref={videoRef}
      autoPlay
      muted={isMuted}
    />
  )
}

export default VideoFeed
