import iconsData from 'lib/json/board-icons.json'
import { Output, minLength, object, picklist, string, toTrimmed } from 'valibot'

const listIcons = iconsData.map(icon => icon.id)

export const newBoardSchema = object({
  title: string([
    toTrimmed(),
    minLength(4, 'Please enter at least 4 characters.')
  ]),
  icon: picklist(listIcons),
  background: string()
})

export type AddNewBoard = Output<typeof newBoardSchema>
