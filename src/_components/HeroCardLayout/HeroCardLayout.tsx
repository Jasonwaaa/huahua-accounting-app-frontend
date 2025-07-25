import { FC, ReactNode } from 'react'
import StarGroup from './assets/star-group.svg'

interface Props {
  title?: string
  subtitle?: string
  children: ReactNode
}

const HeroCardLayout: FC<Props> = ({ children, title = '', subtitle = '' }) => (
  <div className="flex flex-1 items-center justify-center">
    <div className="md:min-w-xl relative min-w-[345px] space-y-4 rounded-3xl bg-white px-5 py-8 md:my-24 md:space-y-6 md:px-8 md:py-12 lg:my-28 lg:space-y-8 lg:px-16 lg:py-16">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-center space-x-1 md:space-x-2 lg:space-x-3">
          <StarGroup className="hidden md:block" />
          <p className="font-stretch-expanded text-2xl font-bold text-neutral-800 md:text-3xl">
            {title}
          </p>
        </div>
        {subtitle && (
          <p className="text-2xl font-bold md:text-3xl">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  </div>
)

export default HeroCardLayout
