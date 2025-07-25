import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Overlay from './_components/Overlay'
import Header from './_components/Header'

interface Props {
  onClose?: () => void
  children: ReactNode
  title: string
}

const Modal: FC<Props> = ({ onClose = undefined, children, title }) => {
  const portalRoot = document.getElementById('modal-root')

  if (!portalRoot) {
    return null
  }

  return createPortal(
    <div>
      <Overlay />
      <div className="fixed inset-0 flex h-full w-full items-center justify-center">
        <div
          role="dialog"
          aria-label="Modal"
          className="w-[410px] rounded-lg p-8 shadow-lg"
        >
          <Header onClose={onClose}>{title}</Header>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>,
    portalRoot
  )
}

export default Modal
