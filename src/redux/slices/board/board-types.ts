import type { UserInitialState } from '../user/user-types'

export type Card = {
  _id: string
  title: string
  board: string
  oldColumn: string
  description: string
  column: ''
  priority: 'Low' | 'Medium' | 'High' | 'Without priority'
  deadline: string
  owner: string
}

export type Column = {
  _id: string
  title: string
  board: string
  owner: string
  cards: Card[]
}

export type BoardInitialState = {
  board: {
    filter: string
    _id: string
    background: string
    icon: string
    columns: Column[]
    owner: Omit<UserInitialState, 'user'> | ''
    title: string
  }
}
