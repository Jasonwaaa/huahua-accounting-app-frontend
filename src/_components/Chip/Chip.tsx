import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Chip: FC<Props> = ({ children }) => (
  <div className="inline-flex items-center justify-center rounded-3xl border border-[#6459e5] bg-[rgba(100,89,229,0.1)] px-4 py-[6px] text-xs text-[#6459e5] md:px-6 md:py-2 md:text-lg">
    {children}
  </div>
)

export default Chip
