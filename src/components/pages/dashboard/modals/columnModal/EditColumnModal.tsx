import { Button, Field, Modal } from 'components/ui'
import { useAppForm } from 'hooks'
import { columnSchema, type ColumnModal } from 'lib/schemas/addComumn-shema'
import { useEffect } from 'react'
import { useModal, useModalInstance } from 'react-modal-state'
import { useLocation } from 'react-router-dom'
import { useEditColumnMutation } from 'redux/api/dashboard/column'

export const EditColumnModal = () => {
  const { pathname } = useLocation()
  const { register, errors, handleSubmit, reset } =
    useAppForm<ColumnModal>(columnSchema)
  const [editColumn] = useEditColumnMutation()
  const { close } = useModal('edit-column-modal')
  const { isOpen } = useModalInstance()

  useEffect(() => {
    if (isOpen) {
      reset({ title: localStorage.getItem('column-title') ?? '' })
    }
  }, [isOpen])

  const id = localStorage.getItem('columnId')

  const pathParts = pathname.split('/')
  const boardName = pathParts[pathParts.length - 1]

  const submit = (data: ColumnModal) => {
    editColumn({ boardName, columnId: id, body: data }).unwrap().then(close)
  }

  return (
    <Modal size='sm' modalTitle='Edit column'>
      <form onSubmit={handleSubmit(submit)}>
        <Field
          {...register('title')}
          inputName='title'
          placeholder='Title'
          errors={errors}
          className='mb-6'
        />
        <Button isAddIcon iconName='plus'>
          Edit
        </Button>
      </form>
    </Modal>
  )
}