import { render, screen } from '@testing-library/react'
import useSession from '@/hooks/useSession'
import useSessionUser from '@/hooks/useSessionUser'
import ProfileFormModal from './ProfileFormModal'

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

vi.mock('@/hooks/useSessionUser')
const useSessionUserMock = vi.mocked(useSessionUser)

describe('ProfileFormModal', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders Modal', () => {
    useSessionUserMock.mockReturnValue({
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<ProfileFormModal title="Create user" />)

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { level: 2, name: 'Create user' })
    ).toBeInTheDocument()
  })

  test('renders Form', () => {
    useSessionUserMock.mockReturnValue({
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<ProfileFormModal title="Create user" />)

    expect(
      screen.getByRole('textbox', { name: 'Your display name' })
    ).toBeInTheDocument()
  })

  test('renders the Close button if the onClose prop is given', async () => {
    const onClose = vi.fn()

    useSessionUserMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<ProfileFormModal title="Edit Profile" onClose={onClose} />)

    expect(
      await screen.findByRole('button', { name: 'Close' })
    ).toBeInTheDocument()
  })

  test('does not render the Close button if the onClose prop is not given', () => {
    useSessionUserMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<ProfileFormModal title="Edit Profile" />)

    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument()
  })
})
