import z from 'zod'

export const prioritySchema = z.enum(['low', 'medium', 'high'])

export const taskSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  title: z.string(),
  description: z.string(),
  priority: prioritySchema,
  order: z.number(),
  completedAt: z.date().nullable(),
})

export type Task = z.infer<typeof taskSchema>
export type Priority = z.infer<typeof prioritySchema>

export type SearchFilter = {
  userId: string
  query?: string
  status?: 'pending' | 'completed' | 'all'
  priority?: 'low' | 'medium' | 'high' | 'all'
}
