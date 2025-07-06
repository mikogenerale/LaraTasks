export type User = {
  id: string
  email: string
  password: string
  role: UserRole
  firstName: string
  lastName: string
  createdAt: Date
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
