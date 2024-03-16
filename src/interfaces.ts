export type Color = 'red' | 'yellow' | 'green' | 'blue' | 'white' | 'black' | 'orange' | 'brown'
export type Role = 'admin' | 'user' | 'root'

export interface User {
  id: number
  name: string
  balance: number
  color: Color
  role: Role
  blocked: boolean
  age: number
}

export interface FilterParams {
  color?: Color[]
  blocked?: boolean
  role?: Role[]
  age?: {
    from: number
    to: number
  }
}

export interface AgeRange {
  min: number
  max: number
}
