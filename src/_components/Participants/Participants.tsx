import { FC } from 'react'
import useUserPresences from '@/hooks/useUserPresences'
import Indicator from './_components/Indicator'

interface Props {
  spaceId: string
}

const Participants: FC<Props> = ({ spaceId }) => {
  const { data: userPresences } = useUserPresences(spaceId)

  const userPresenceCount =
    userPresences?.filter((userPresence) => userPresence.status === 'ONLINE')
      .length ?? 0

  return (
    <div className="flex items-center gap-1 rounded-2xl bg-neutral-300 px-2 py-0.5">
      <Indicator status={userPresenceCount > 0 ? 'online' : 'offline'} />
      <span className="text-xs">{userPresenceCount}</span>
    </div>
  )
}

export default Participants
