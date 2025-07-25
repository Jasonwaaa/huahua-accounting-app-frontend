import { FC, ReactNode } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import GradientBackground from '../GradientBackground'
import Logo from '../Logo'
import waveImage from './assets/wave.webp'
import BigStar from './assets/big-star.svg'
import BiggestStar from './assets/biggest-star.svg'
import SmallStar from './assets/smaller-star.svg'

interface Props {
  children: ReactNode
  className?: string
}

const WaveAndStarBackground: FC<Props> = ({ children, className = '' }) => (
  <GradientBackground className={clsx('flex min-h-dvh flex-col', className)}>
    <Logo
      variant="dark"
      className="ml-4 mt-5 md:ml-8 md:mt-8 lg:ml-12 lg:mt-10"
    />
    <BigStar className="absolute right-24 top-48 md:right-48 md:top-64 lg:right-72" />
    <BiggestStar className="absolute left-8 top-32 md:left-32 md:top-48 lg:left-64" />
    <SmallStar className="absolute right-16 top-16 md:right-32 md:top-24 lg:right-48" />
    <div className="absolute bottom-0 h-64 w-full md:h-2/3">
      <Image src={waveImage} alt="Wave Background" fill />
    </div>
    {children}
  </GradientBackground>
)

export default WaveAndStarBackground
