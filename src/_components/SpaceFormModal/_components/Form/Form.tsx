import { FC } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Button from '@/_components/Button'
import TextField from '@/_components/TextField'
import useSpace from '@/hooks/useSpace'
import upsertSpace from '@/db/upsertSpace'
import useSessionUser from '@/hooks/useSessionUser'
import useOwnedSpaces from '@/hooks/useOwnedSpaces'

const schema = z.object({
  spaceName: z.string().nonempty('Please enter space name'),
})

type Schema = z.infer<typeof schema>

interface Props {
  onUpsert?: (upsertedSpace: { id: string } | null) => void
  spaceId?: string
}

const Form: FC<Props> = ({ onUpsert = undefined, spaceId = undefined }) => {
  const { data: space, mutate: spaceMutate } = useSpace(spaceId)
  const { mutate: ownedSpacesMutate } = useOwnedSpaces()
  const { data: user } = useSessionUser()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      spaceName: space?.name,
    },
  })

  if (!user) {
    return null
  }

  const onSubmit = async (data: Schema): Promise<void> => {
    const upsertedSpace = await upsertSpace({
      name: data.spaceName,
      ownerId: user.id,
      id: space?.id,
    })

    await spaceMutate()
    await ownedSpacesMutate()

    if (!onUpsert) {
      return
    }

    onUpsert(upsertedSpace)
  }

  return (
    <form
      className="space-y-12"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <TextField
        {...register('spaceName')}
        errorMessage={errors.spaceName?.message}
        label="Space name"
      />
      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        {spaceId ? 'Save Changes' : 'Create Space'}
      </Button>
    </form>
  )
}

export default Form
