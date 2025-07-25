import { FC } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import Button from '@/_components/Button'
import useSession from '@/hooks/useSession'
import useSessionUser from '@/hooks/useSessionUser'
import TextField from '@/_components/TextField'
import upsertUser from '@/db/upsertUser'
import AvatarPicker from './_components/AvatarPicker'

export interface Avatar {
  animal: string | null
  color: string
}

interface Props {
  onUpsert?: () => void
}

const schema = z.object({
  text: z
    .string()
    .nonempty('Please enter your display name')
    .min(2, { message: 'The display name must be at least 2 characters long' }),
  avatar: z.string().nonempty('Please select an animal'),
})

type Schema = z.infer<typeof schema>

const Form: FC<Props> = ({ onUpsert = undefined }) => {
  const { data: user, mutate } = useSessionUser()
  const { data: session } = useSession()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      text: user?.displayName ?? '',
      avatar: user?.avatar ?? '',
    },
  })

  if (!session) {
    return null
  }

  const onSubmit = async (data: Schema): Promise<void> => {
    await upsertUser({
      displayName: data.text,
      avatar: data.avatar,
      authId: session.user.id,
    })

    await mutate()
    onUpsert?.()
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <TextField
        {...register('text')}
        errorMessage={errors.text?.message}
        type="text"
        label="Your display name"
        placeholder="Your display name"
      />
      <Controller
        render={({ field: { onChange, value } }) => (
          <AvatarPicker onChange={onChange} value={value} />
        )}
        name="avatar"
        control={control}
      />
      {errors.avatar && (
        <span className="block text-sm text-rose-500">
          {errors.avatar.message}
        </span>
      )}

      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        {user ? 'Save Changes' : 'Create user'}
      </Button>
    </form>
  )
}

export default Form
