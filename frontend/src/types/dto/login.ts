import type { User } from '../user'

// we could use zod here

export type LoginResponseError = {
  status: number
  message: string
}

export type LoginResponseDto = {
  data: User | undefined
  success: boolean
  error: LoginResponseError | undefined
}
