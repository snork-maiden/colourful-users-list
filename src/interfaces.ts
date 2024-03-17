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
  colors?: Color[]
  blocked?: boolean
  roles?: Role[]
  age?: AgeRange
}

export interface AgeRange {
  min: number
  max: number
}
