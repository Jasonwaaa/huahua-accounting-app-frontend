'use client'

import { FC } from 'react'
import Modal from '@/_components/Modal'
import Form from './_components/Form'

interface Props {
  title: string
  spaceId?: string
  onClose: () => void
  onUpsert?: (upsertedSpace: { id: string } | null) => void
}

const SpaceFormModal: FC<Props> = ({
  title,
  spaceId = undefined,
  onClose,
  onUpsert = undefined,
}) => (
  <Modal title={title} onClose={onClose}>
    <Form
      onUpsert={(upsertedSpace) => {
        onClose()
        onUpsert?.(upsertedSpace)
      }}
      spaceId={spaceId}
    />
  </Modal>
)

export default SpaceFormModal
