import { useState } from 'react'
import { Button, Field, Modal } from 'components/ui/index'
import { BackgroundContainer } from './BackgroundContainer'
import { Icons } from './Icons'
import { useBoard } from 'hooks/useBoard'
import { useDispatch } from 'react-redux'
import { useModal } from 'react-modal-state'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useAddNewBoardMutation } from 'redux/api/dashboard/board'
import images from 'lib/json/board-bg-images.json'

export const NewBoardModal = () => {
  const dispatch = useDispatch()
  const { handleSubmit, reset, errors, register } = useBoard()
  const [addNewBoard, { isLoading }] = useAddNewBoardMutation()
  const defaultBackground = images.find(bg => bg.id === 'default')
  const { close } = useModal('new-board-modal')
  const [formData, setFormData] = useState({
    title: '',
    icon: 'icon-project-1',
    background: defaultBackground
      ? defaultBackground.icon?.light?.['@1x'] ||
        defaultBackground.icon?.['@1x']
      : ''
  })

  const handleCreateBoard = () => {
    addNewBoard(formData)
      .unwrap()
      .then(response => {
        handleSuccessToast('Board created successfully')
        dispatch({ type: 'board/addNewBoardFullfilled', payload: response })
        close()
        reset({ title: '' })
      })
      .catch(error => {
        handleErrorToast('Error creating board')
        console.error(error)
      })
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  return (
    <Modal size='sm' modalTitle='New board'>
      <form onSubmit={handleSubmit(handleCreateBoard)}>
        <Field
          {...register('title')}
          inputName='title'
          className={errors ? 'mb-2' : 'violet:text-black'}
          placeholder='Title'
          errors={errors}
          value={formData.title}
          onChange={e => handleInputChange('title', e.target.value)}
        />
        <p className='mt-6'>Icons</p>
        <Icons
          handleIconChange={e => handleInputChange('icon', e.target.value)}
        />
        <p className='mt-6'>Background</p>
        <BackgroundContainer
          handleBgChange={e => handleInputChange('background', e.target.value)}
        />
        <Button type='submit' isAddIcon iconName='plus' disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create'}
        </Button>
      </form>
    </Modal>
  )
}
