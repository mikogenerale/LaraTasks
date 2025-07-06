import { UserRole, type User } from '@/types/user'

export const sampleUsers: User[] = [
  {
    id: '123',
    email: 'test1@gmail.com',
    password: 'test123',
    role: UserRole.ADMIN,
    firstName: 'Alice',
    lastName: 'Smith',
    createdAt: new Date('2024-05-01T10:00:00'),
  },
  {
    id: '456',
    email: 'test2@gmail.com',
    password: 'test123',
    role: UserRole.USER,
    firstName: 'Bob',
    lastName: 'Johnson',
    createdAt: new Date('2024-06-15T14:30:00'),
  },
  {
    id: '789',
    email: 'test3@gmail.com',
    password: 'test123',
    role: UserRole.USER,
    firstName: 'Carol',
    lastName: 'Lee',
    createdAt: new Date('2024-07-01T09:15:00'),
  },
]
