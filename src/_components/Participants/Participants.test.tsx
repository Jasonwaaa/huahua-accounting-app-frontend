import { render, screen } from '@testing-library/react'
import useUserPresences from '@/hooks/useUserPresences'
import { STATUS } from './_components/Indicator'
import Participants from './Participants'

vi.mock('@/hooks/useUserPresences')
const useUserPresencesMock = vi.mocked(useUserPresences)

describe('Participant', () => {
  test('render Indicator', () => {
    const spaceId = 'SPACE_ID'

    useUserPresencesMock.mockReturnValue({
      data: [],
    } as unknown as ReturnType<typeof useUserPresences>)

    render(<Participants spaceId={spaceId} />)

    expect(useUserPresences).toHaveBeenCalledWith(spaceId)

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  test('renders the count number', () => {
    const spaceId = 'SPACE_ID'

    useUserPresencesMock.mockReturnValue({
      data: [
        {
          id: 'ID',
          userId: 'USER_ID',
          spaceId: 'SPACE_ID',
          status: 'OFFLINE',
          lastSeenAt: 'LAST_SEEN_AT',
        },
        {
          id: 'ID1',
          userId: 'USER_ID1',
          spaceId: 'SPACE_ID',
          status: 'ONLINE',
          lastSeenAt: 'LAST_SEEN_AT',
        },
      ],
    } as unknown as ReturnType<typeof useUserPresences>)

    render(<Participants spaceId={spaceId} />)

    expect(useUserPresences).toHaveBeenCalledWith(spaceId)

    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('renders the count number to 0 if userPresences is null', () => {
    const spaceId = 'SPACE_ID'

    useUserPresencesMock.mockReturnValue({
      data: null,
    } as unknown as ReturnType<typeof useUserPresences>)

    render(<Participants spaceId={spaceId} />)

    expect(useUserPresences).toHaveBeenCalledWith(spaceId)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  test('renders the offline Indicator when count number is 0', () => {
    const spaceId = 'SPACE_ID'

    useUserPresencesMock.mockReturnValue({
      data: [
        {
          id: 'ID',
          userId: 'USER_ID',
          spaceId: 'SPACE_ID',
          status: 'OFFLINE',
          lastSeenAt: 'LAST_SEEN_AT',
        },
        {
          id: 'ID1',
          userId: 'USER_ID1',
          spaceId: 'SPACE_ID',
          status: 'OFFLINE',
          lastSeenAt: 'LAST_SEEN_AT',
        },
      ],
    } as unknown as ReturnType<typeof useUserPresences>)

    render(<Participants spaceId={spaceId} />)

    expect(useUserPresences).toHaveBeenCalledWith(spaceId)

    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveClass(STATUS.offline)
  })

  test('renders the online Indicator when count number is large than 0', () => {
    const spaceId = 'SPACE_ID'

    useUserPresencesMock.mockReturnValue({
      data: [
        {
          id: 'ID',
          userId: 'USER_ID',
          spaceId: 'SPACE_ID',
          status: 'OFFLINE',
          lastSeenAt: 'LAST_SEEN_AT',
        },
        {
          id: 'ID1',
          userId: 'USER_ID1',
          spaceId: 'SPACE_ID',
          status: 'ONLINE',
          lastSeenAt: 'LAST_SEEN_AT',
        },
      ],
    } as unknown as ReturnType<typeof useUserPresences>)

    render(<Participants spaceId={spaceId} />)

    expect(useUserPresences).toHaveBeenCalledWith(spaceId)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveClass(STATUS.online)
  })
})
