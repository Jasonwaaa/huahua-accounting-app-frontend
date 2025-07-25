import { FC } from 'react'
import Logo from '@/_components/Logo'

const GlobalLoading: FC = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center">
      <div className="mb-10">
        <Logo />
      </div>
      <div className="mb-4">
        <div
          className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-black"
          aria-label="Loading indicator"
        />
      </div>
      <p className="text-lg font-medium text-slate-800">
        Please wait, we are syncing the metaverse...
      </p>
    </div>
  </div>
)

export default GlobalLoading
