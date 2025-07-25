import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import upsertSpace from '@/db/upsertSpace'
import useOwnedSpaces from '@/hooks/useOwnedSpaces'
import useSessionUser from '@/hooks/useSessionUser'
import useSpace from '@/hooks/useSpace'
import Form from './Form'

vi.mock('@/hooks/useSpace')
const useSpaceMock = vi.mocked(useSpace)

vi.mock('@/hooks/useOwnedSpaces')
const useOwnedSpacesMock = vi.mocked(useOwnedSpaces)

vi.mock('@/hooks/useSessionUser')
const useSessionUserMock = vi.mocked(useSessionUser)

vi.mock('@/db/upsertSpace')
const upsertSpaceMock = vi.mocked(upsertSpace)

vi.mock('@/utils/navigate')

describe('Form', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders create space form if there is no space', () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useSpaceMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSpace>)

    useOwnedSpacesMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    render(<Form onUpsert={vi.fn()} />)

    expect(screen.getByRole('textbox', { name: 'Space name' })).toHaveValue('')

    expect(useSpace).toHaveBeenCalledWith(undefined)

    expect(
      screen.getByRole('button', { name: 'Create Space' })
    ).toBeInTheDocument()
  })

  test('renders change space name form if there is a space', () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID' },
    } as unknown as ReturnType<typeof useSessionUser>)

    const spaceId = 'SPACE_ID'
    const space = { id: spaceId, name: 'Old space name' }
    useSpaceMock.mockReturnValue({
      data: space,
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSpace>)

    useOwnedSpacesMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    render(<Form onUpsert={vi.fn()} spaceId={spaceId} />)

    expect(useSpaceMock).toHaveBeenCalledWith(spaceId)

    expect(screen.getByRole('textbox', { name: 'Space name' })).toHaveValue(
      space.name
    )
  })

  test('renders null when there is no user', () => {
    useSessionUserMock.mockReturnValue(
      {} as unknown as ReturnType<typeof useSessionUser>
    )

    useSpaceMock.mockReturnValue({
      data: {
        id: 'SPACE_ID',
      },
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSpace>)

    useOwnedSpacesMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    const { container } = render(<Form onUpsert={vi.fn()} />)

    expect(useSessionUser).toHaveBeenCalled()

    expect(container).toBeEmptyDOMElement()
  })

  test('submits form', async () => {
    const sessionUser = { id: 'USER_ID' }
    useSessionUserMock.mockReturnValue({
      data: sessionUser,
    } as unknown as ReturnType<typeof useSessionUser>)

    const space = { id: 'SPACE_ID', name: 'Old space name' }
    const spaceMutate = vi.fn()
    useSpaceMock.mockReturnValue({
      mutate: spaceMutate,
      data: space,
    } as unknown as ReturnType<typeof useSpace>)

    const ownedSpacesMutate = vi.fn()
    useOwnedSpacesMock.mockReturnValue({
      mutate: ownedSpacesMutate,
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    upsertSpaceMock.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 50))
    )

    const user = userEvent.setup()

    render(<Form spaceId="SPACE_ID" />)

    await user.clear(screen.getByRole('textbox', { name: 'Space name' }))

    const spaceName = 'NEW_SPACE_NAME'
    await user.type(
      screen.getByRole('textbox', { name: 'Space name' }),
      spaceName
    )

    await user.click(screen.getByRole('button', { name: 'Save Changes' }))

    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Loading' })).toBeDisabled()
    )

    expect(upsertSpace).toHaveBeenCalledWith({
      name: spaceName,
      ownerId: sessionUser.id,
      id: space.id,
    })

    await waitFor(() => expect(spaceMutate).toHaveBeenCalled())
    await waitFor(() => expect(ownedSpacesMutate).toHaveBeenCalled())

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Save Changes' })
      ).not.toBeDisabled()
    })
  })

  test('submits form with onUpsert provided', async () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useSpaceMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSpace>)

    useOwnedSpacesMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    const upsertedSpace = { id: 'UPSERT_SPACE_ID' }
    upsertSpaceMock.mockResolvedValue(upsertedSpace)

    const user = userEvent.setup()

    const onUpsert = vi.fn()
    render(<Form onUpsert={onUpsert} />)

    await user.type(
      screen.getByRole('textbox', { name: 'Space name' }),
      'UPSERT_SPACE_NAME'
    )

    await user.click(screen.getByRole('button', { name: 'Create Space' }))

    expect(onUpsert).toHaveBeenCalledWith(upsertedSpace)
  })

  test('validates form', async () => {
    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useSpaceMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSpace>)

    useOwnedSpacesMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    const user = userEvent.setup()

    render(<Form onUpsert={vi.fn()} spaceId="SPACE_ID" />)

    await user.click(screen.getByRole('button', { name: 'Save Changes' }))

    expect(screen.getByText('Please enter space name')).toBeInTheDocument()

    expect(upsertSpace).not.toHaveBeenCalled()
  })
})
