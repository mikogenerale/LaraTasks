import type { User } from '../user'

export type RegisterResponseError = {
  status: number
  message: string
}

export type RegisterResponseDto = {
  data: User | undefined
  success: boolean
  error: RegisterResponseError | undefined
}
