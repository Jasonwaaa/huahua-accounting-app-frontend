import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useParams } from 'next/navigation'
import useOwnedSpaces from '@/hooks/useOwnedSpaces'
import useSessionUser from '@/hooks/useSessionUser'
import useSpace from '@/hooks/useSpace'
import upsertSpace from '@/db/upsertSpace'
import SpaceFormModal from './SpaceFormModal'

vi.mock('@/hooks/useOwnedSpaces')
const useOwnedSpacesMock = vi.mocked(useOwnedSpaces)

vi.mock('@/hooks/useSessionUser')
const useSessionUserMock = vi.mocked(useSessionUser)

vi.mock('next/navigation')
const useParamsMock = vi.mocked(useParams)

vi.mock('@/hooks/useSpace')
const useSpaceMock = vi.mocked(useSpace)

vi.mock('@/db/upsertSpace')
const upsertSpaceMock = vi.mocked(upsertSpace)

describe('SpaceFormModal', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders space form modal', () => {
    const spaceId = 'SPACE_ID'
    const title = 'Title'

    useSessionUserMock.mockReturnValue({
      data: {},
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    } as unknown as ReturnType<typeof useParams>)

    useSpaceMock.mockReturnValue({
      data: {
        id: 'SPACE_ID',
      },
    } as unknown as ReturnType<typeof useSpace>)

    useOwnedSpacesMock.mockReturnValue(
      {} as unknown as ReturnType<typeof useOwnedSpaces>
    )

    render(<SpaceFormModal title={title} onClose={vi.fn()} spaceId={spaceId} />)

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument()

    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()

    expect(useSpace).toHaveBeenCalledWith(spaceId)
  })

  test('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    useSessionUserMock.mockReturnValue({
      data: {},
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    } as unknown as ReturnType<typeof useParams>)

    useSpaceMock.mockReturnValue({} as unknown as ReturnType<typeof useSpace>)

    useOwnedSpacesMock.mockReturnValue(
      {} as unknown as ReturnType<typeof useOwnedSpaces>
    )

    render(<SpaceFormModal title="Title" onClose={onClose} />)

    await user.click(await screen.findByRole('button', { name: 'Close' }))

    expect(onClose).toHaveBeenCalled()
  })

  test('calls onClose when form is successfully submitted', async () => {
    const onClose = vi.fn()

    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    } as unknown as ReturnType<typeof useParams>)

    useSpaceMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSpace>)

    useOwnedSpacesMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    const user = userEvent.setup()

    render(<SpaceFormModal title="Title" onClose={onClose} />)

    await user.type(
      screen.getByRole('textbox', { name: 'Space name' }),
      'UPSERT_SPACE_NAME'
    )

    await user.click(screen.getByRole('button', { name: 'Create Space' }))

    expect(onClose).toHaveBeenCalled()
  })

  test('calls onUpsert with onUpsert provided when form is successfully submitted', async () => {
    const onClose = vi.fn()
    const onUpsert = vi.fn()

    const user = userEvent.setup()

    useSessionUserMock.mockReturnValue({
      data: { id: 'USER_ID' },
    } as unknown as ReturnType<typeof useSessionUser>)

    useParamsMock.mockReturnValue({
      spaceId: 'SPACE_ID',
    } as unknown as ReturnType<typeof useParams>)

    useSpaceMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useSpace>)

    useOwnedSpacesMock.mockReturnValue({
      mutate: vi.fn(),
    } as unknown as ReturnType<typeof useOwnedSpaces>)

    const upsertedSpace = { id: 'UPSERT_SPACE_ID' }
    upsertSpaceMock.mockResolvedValue(upsertedSpace)

    render(
      <SpaceFormModal title="Title" onClose={onClose} onUpsert={onUpsert} />
    )

    await user.type(
      screen.getByRole('textbox', { name: 'Space name' }),
      'UPSERT_SPACE_NAME'
    )

    await user.click(screen.getByRole('button', { name: 'Create Space' }))

    expect(onClose).toHaveBeenCalled()
    expect(onUpsert).toHaveBeenCalledWith(upsertedSpace)
  })
})
