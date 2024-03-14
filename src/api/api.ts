import type { User } from '@/interfaces'

export async function getUsersList() {
  try {
    const response = await fetch('/users.json')
    const users: Array<User> = await response.json()
    return users
  } catch (error) {
    console.error(error)
  }
}
