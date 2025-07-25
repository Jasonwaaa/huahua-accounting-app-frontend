import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useSession from '@/hooks/useSession'
import useSessionUser from '@/hooks/useSessionUser'
import upsertUser from '@/db/upsertUser'
import { VARIANT as BUTTON_VARIANT } from '@/_components/Button'
import Form from './Form'

vi.mock('@/hooks/useSession')
const useSessionMock = vi.mocked(useSession)

vi.mock('@/hooks/useSessionUser')
const useSessionUserMock = vi.mocked(useSessionUser)

vi.mock('@/db/upsertUser')
const upsertUserMock = vi.mocked(upsertUser)

describe('Form', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders display name text box', () => {
    useSessionUserMock.mockReturnValue({
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<Form />)

    expect(
      screen.getByRole('textbox', { name: 'Your display name' })
    ).toBeInTheDocument()
  })

  test('renders AvatarPicker', async () => {
    useSessionUserMock.mockReturnValue({
      data: {
        avatar: 'MALE_01',
        id: 'ID',
        displayName: 'John Doe',
      },
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<Form />)

    expect(await screen.findByRole('button', { name: 'MALE_01' })).toHaveClass(
      BUTTON_VARIANT.success
    )
  })

  test('renders form with create user button when user is not created', () => {
    useSessionUserMock.mockReturnValue({
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<Form />)

    expect(
      screen.getByRole('button', { name: 'Create user' })
    ).toBeInTheDocument()
  })

  test('renders form with save changes button when user is created', () => {
    useSessionUserMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    useSessionMock.mockReturnValue({
      data: {},
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    render(<Form />)

    expect(
      screen.getByRole('button', { name: 'Save Changes' })
    ).toBeInTheDocument()
  })

  test('renders null if session is null', () => {
    useSessionUserMock.mockReturnValue({
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    useSessionMock.mockReturnValue({
      data: null,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    const { container } = render(<Form />)

    expect(container).toBeEmptyDOMElement()
  })

  test('calls upsertUser on form submit', async () => {
    const mutate = vi.fn()
    const session = { user: { id: 'AUTH_ID' } }

    useSessionMock.mockReturnValue({
      data: session,
    } as unknown as ReturnType<typeof useSession>)

    useSessionUserMock.mockReturnValue({
      mutate,
    } as unknown as ReturnType<typeof useSessionUser>)

    upsertUserMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 50))
    )

    const user = userEvent.setup()

    render(<Form />)

    await user.type(
      screen.getByPlaceholderText('Your display name'),
      'John Doe'
    )

    await user.click(screen.getByRole('button', { name: 'FEMALE_01' }))

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Create user' })
      ).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Create user' }))

    expect(screen.getByRole('button', { name: 'Loading' })).toBeDisabled()

    expect(upsertUser).toHaveBeenCalledWith({
      displayName: 'John Doe',
      avatar: 'FEMALE_01',
      authId: session.user.id,
    })

    await waitFor(() => expect(mutate).toHaveBeenCalled())

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Create user' })
      ).not.toBeDisabled()
    })
  })

  test('shows validation errors message when form is submitted with empty fields', async () => {
    const session = { user: { id: 'AUTH_ID' } }

    useSessionMock.mockReturnValue({
      data: session,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    useSessionUserMock.mockReturnValue({
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    const user = userEvent.setup()

    render(<Form />)

    await user.click(screen.getByRole('button', { name: 'Create user' }))

    expect(
      screen.getByText('Please enter your display name')
    ).toBeInTheDocument()
  })

  test('shows validation error message when display name is too short', async () => {
    const session = { user: { id: 'AUTH_ID' } }

    useSessionMock.mockReturnValue({
      data: session,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    useSessionUserMock.mockReturnValue({
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    const user = userEvent.setup()

    render(<Form />)

    await user.type(screen.getByLabelText('Your display name'), 'S')

    await user.click(screen.getByRole('button', { name: 'Create user' }))

    expect(
      screen.getByText('The display name must be at least 2 characters long')
    ).toBeInTheDocument()
  })

  test('shows validation error message when avatar animal not selected', async () => {
    const session = { user: { id: 'AUTH_ID' } }

    useSessionMock.mockReturnValue({
      data: session,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    useSessionUserMock.mockReturnValue({
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    const user = userEvent.setup()

    render(<Form />)

    await user.type(screen.getByLabelText('Your display name'), 'SS')

    await user.click(screen.getByRole('button', { name: 'Create user' }))

    expect(screen.getByText('Please select an animal')).toBeInTheDocument()
  })

  test('calls onCreated if function provided', async () => {
    const session = { user: { id: 'AUTH_ID' } }
    const onCreated = vi.fn()

    useSessionUserMock.mockReturnValue({
      data: {},
      mutate: vi.fn(),
      isLoading: false,
    } as unknown as ReturnType<typeof useSessionUser>)

    useSessionMock.mockReturnValue({
      data: session,
      isLoading: false,
    } as unknown as ReturnType<typeof useSession>)

    const user = userEvent.setup()

    render(<Form onUpsert={onCreated} />)

    await user.type(screen.getByLabelText('Your display name'), 'SS')
    await user.click(screen.getByRole('button', { name: 'MALE_01' }))
    await user.click(screen.getByRole('button', { name: 'Save Changes' }))

    await waitFor(() => expect(onCreated).toHaveBeenCalled())
  })
})
