import iconsData from 'lib/json/board-icons.json'
import {
  minLength,
  object,
  picklist,
  string,
  toTrimmed,
  type Output
} from 'valibot'

const listIcons = iconsData.map(icon => icon.id)

export const boardSchema = object({
  title: string([
    toTrimmed(),
    minLength(3, 'Please enter at least 3 characters.')
  ]),
  icon: picklist(listIcons),
  background: string()
})

export type BoardSchemaFields = Output<typeof boardSchema>
