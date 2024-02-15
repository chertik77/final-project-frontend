import { cn } from 'lib/utils'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useGetAllBoardsQuery } from 'redux/api/dashboard/board'
import { selectBoard } from 'redux/slices/board/board-slice'
import { SideBarBoardsItem } from './SideBarBoardsItem'

export const SidebarBoardsList = () => {
  const { boardId } = useParams()
  const board = useSelector(selectBoard)
  const { data, refetch } = useGetAllBoardsQuery(undefined)

  useEffect(() => {
    refetch()
  }, [board])

  return (
    <div className='mb-auto '>
      <ul className='flex flex-col mobile:text-fs-14-lh-1.28-fw-400'>
        {data?.data?.map(board => (
          <li
            key={board._id}
            className={cn(
              'flex h-[61px] cursor-pointer items-center gap-10  text-black/50 transition duration-300 ease-in-out violet:text-white/50 dark:text-white/50 desktop:pl-6',
              board.title === boardId &&
                'border-1 border-s-wite-500 border-r-dark text-black violet:bg-white/50 violet:text-white  light:bg-white-gray dark:bg-black-third dark:text-white '
            )}>
            <SideBarBoardsItem board={board} boards={data?.data} />
          </li>
        ))}
      </ul>
    </div>
  )
}
