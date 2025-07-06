import { sampleUsers } from '@/mocks/users'
import type { LoginCredentials, RegisterCredentials } from '@/types/auth'
import type { LoginResponseDto } from '@/types/dto/login'
import type { RegisterResponseDto } from '@/types/dto/register'
import { type User, UserRole } from '@/types/user'

// This file defines a production-style Axios API layer for authentication.

// ---------------------------
// Axios Instance Setup
// ---------------------------

// Create a reusable axios instance called `authApi`.
// - Base URL is read from environment variable `VITE_API_BASE_URL`.
// - Fallbacks to 'http://localhost:3000' in local development.
// - Headers are set to send JSON data.
// - `withCredentials: true` allows cookies (optional for secure auth).
// const authApi = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// })

// ---------------------------
// Login API Function
// ---------------------------

// Function: handleLogin
// Description:
//   Sends a POST request to `/auth/login` with user's email and password.
//   Returns a typed LoginResponseDto object that contains:
//     - data: user info if login is successful
//     - success: boolean flag
//     - error: optional error object with status and message

// Example usage:
// const res = await handleLogin({ email: 'test@example.com', password: '123456' })
// if (res.success) -> continue to dashboard
// else -> show res.error.message

// export const handleLogin = async (credentials: LoginCredentials): Promise<LoginResponseDto> => {
//   try {
//     const { data } = await authApi.post<LoginResponseDto>('/auth/login', credentials)
//     return data
//   } catch (err) {
//     return handleApiError<LoginResponseDto>(err)
//   }
// }

// ---------------------------
// Register API Function
// ---------------------------

// Function: handleRegister
// Description:
//   Sends a POST request to `/auth/register` with new user credentials.
//   Returns a typed RegisterResponseDto object:
//     - data: new user info if registration succeeds
//     - success: true/false
//     - error: error details if something goes wrong (e.g. email already used)

// export const handleRegister = async (
//   credentials: RegisterCredentials,
// ): Promise<RegisterResponseDto> => {
//   try {
//     const { data } = await authApi.post<RegisterResponseDto>('/auth/register', credentials)
//     return data
//   } catch (err) {
//     return handleApiError<RegisterResponseDto>(err)
//   }
// }

// ---------------------------
// Global Error Handler
// ---------------------------

// Function: handleApiError<T>
// Description:
//   Catches errors from axios requests.
//   Parses Axios errors into a standard structure with:
//     - success: false
//     - error: { status: number, message: string }
//   Useful for displaying user-friendly error messages in the UI.

// function handleApiError<T>(error: unknown): T {
//   if (axios.isAxiosError(error)) {
//     return {
//       data: undefined,
//       success: false,
//       error: {
//         status: error.response?.status || 500,
//         message: error.response?.data?.message || 'Server error',
//       },
//     } as T
//   }

//   return {
//     data: undefined,
//     success: false,
//     error: {
//       status: 500,
//       message: 'An unexpected error occurred',
//     },
//   } as T
// }

// ---------------------------
// Notes:
// ---------------------------
// - This setup is scalable and consistent.
// - Easily extendable for token-based auth (add interceptors).
// - Centralized error handling makes frontend logic cleaner.
// - Replace mocked users with real API when backend is ready.

//  This is a mock login handler
const handleLogin = async (credentials: LoginCredentials): Promise<LoginResponseDto> => {
  try {
    // const response = await authApi.post('/login')
    await new Promise((res) => setTimeout(res, 1000))
    const user = sampleUsers.find(
      (user) => user.email === credentials.email && user.password === credentials.password,
    )

    const response: LoginResponseDto = {
      data: user,
      success: !!user,
      error: !!user ? undefined : { status: 400, message: 'Invalid login credentials' },
    }

    if (!response.data && response.error) {
      throw new Error(JSON.stringify(response))
    }

    return response
  } catch (e) {
    console.error(e)
    const error = e as Error
    const errorData: LoginResponseDto = JSON.parse(error.message)
    return errorData
  }
}

// This is just a mock register handler
const handleRegister = async (credentials: RegisterCredentials): Promise<RegisterResponseDto> => {
  try {
    await new Promise((res) => setTimeout(res, 1000))

    const existing = sampleUsers.find((u) => u.email === credentials.email)
    if (existing) {
      return {
        data: undefined,
        success: false,
        error: { status: 409, message: 'Email already exists' },
      }
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email: credentials.email,
      password: credentials.password,
      role: UserRole.USER,
      firstName: 'New User',
      lastName: 'User',
      createdAt: new Date(),
    }

    sampleUsers.push(newUser)

    return {
      data: newUser,
      success: true,
      error: undefined,
    }
  } catch (e) {
    console.error(e)
    return {
      data: undefined,
      success: false,
      error: { status: 500, message: 'Something went wrong' },
    }
  }
}

export { handleLogin, handleRegister }
