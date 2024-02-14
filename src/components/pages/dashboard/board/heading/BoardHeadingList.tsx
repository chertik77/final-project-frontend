import { Button } from 'components/ui'
import { useModal } from 'react-modal-state'
import { useSelector } from 'react-redux'
import { selectColumns } from 'redux/slices/board/board-slice'
import { BoardHeadingItem } from './BoardHeadingItem'

export const BoardHeadingList = () => {
  const columns = useSelector(selectColumns)
  const { open } = useModal('add-card-modal')

  return (
    <div className='mb-[14px] mt-[39px] flex tablet:mt-[26px] desktop:mt-[10px]'>
      {columns?.map(column => {
        return (
          <div key={column._id} className='mr-[34px] w-[334px]'>
            <BoardHeadingItem column={column} />
            <Button
              isAddIcon
              iconName='plus'
              className='text-fs-14-lh-normal-fw-500'
              onClick={() => {
                localStorage.setItem('columnId', column._id)
                open()
              }}>
              {column.tasks.length > 0 ? (
                <span>Add another card</span>
              ) : (
                <span>Add card</span>
              )}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
