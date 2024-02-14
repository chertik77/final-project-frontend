import { valibotResolver } from '@hookform/resolvers/valibot'
import { RadioPriority } from 'components/ui/field/RadioPriority'
import { Button, Field, Modal } from 'components/ui/index'
import {
  AddCardSchema,
  type AddCardSchemaFields
} from 'lib/schemas/addCard-schema'
import { handleErrorToast, handleSuccessToast } from 'lib/toasts'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useModal, useModalInstance } from 'react-modal-state'
import { useLocation } from 'react-router-dom'
import { useEditTaskMutation } from 'redux/api/dashboard/task'

// import { useState } from 'react'
// import { DayPicker } from 'react-day-picker'
// import { cn } from 'lib/utils'

export const EditCardModal = () => {
  const cardValues = localStorage.getItem('card-values') ?? ''
  const { title, description, priority, deadline } =
    JSON.parse(cardValues) ?? ''

  // const [selected, setSelected] = useState<Date>()
  const location = useLocation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<AddCardSchemaFields>({
    resolver: valibotResolver(AddCardSchema),
    mode: 'onChange'
  })

  const { isOpen } = useModalInstance()
  useEffect(() => {
    if (isOpen) {
      reset({ title, description, priority, deadline })
    }
  }, [isOpen])

  const { close } = useModal('edit-card-modal')
  const pathParts = location.pathname.split('/')
  const name = pathParts[pathParts.length - 1]

  const [editTask] = useEditTaskMutation()
  const onSubmit = (data: AddCardSchemaFields) => {
    editTask({
      boardName: name,
      body: data,
      columnId: JSON.parse(localStorage.getItem('ids') as string).columnId,
      taskId: JSON.parse(localStorage.getItem('ids') as string).taskId
    })
      .unwrap()
      .then(() => {
        handleSuccessToast('Task edit successfully')
        reset()
      })
      .catch(() => {
        handleErrorToast(
          'Oops! Something went wrong. Our team is already solving this problem. Please stay with us.'
        )
      })
    close()
  }
  return (
    <Modal modalTitle='Edit card'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          errors={errors}
          className='mb-[14px]'
          inputName='title'
          type='text'
          placeholder='Title'
          {...register('title')}
        />
        <div className='relative'>
          <textarea
            placeholder='Description'
            {...register('description')}
            className='mb-[24px] h-[154px] w-full resize-none rounded-lg border border-brand border-opacity-40 bg-transparent px-[18px] py-[14px] text-fs-14-lh-1.28-fw-400 text-black outline-none placeholder:opacity-40 focus:border-opacity-100 violet:border-brand-secondary dark:text-white'
          />
          {errors.description && (
            <span className=' absolute left-0 top-[154px] text-red-600'>
              Please enter at least 2 characters.
            </span>
          )}
        </div>
        <p className='mb-[4px] select-none text-fs-12-lh-normal-fw-400 text-black/50 violet:text-black/50 dark:text-white/50'>
          Label color
        </p>

        <div className='mb-[14px] flex gap-2'>
          <RadioPriority
            color='bg-priority-low'
            value='Low'
            {...register('priority')}
          />
          <RadioPriority
            color='bg-priority-medium'
            value='Medium'
            {...register('priority')}
          />
          <RadioPriority
            color='bg-brand'
            value='High'
            {...register('priority')}
          />
          <RadioPriority
            color='bg-black/30 dark:bg-white/30'
            value='Without priority'
            {...register('priority')}
          />
        </div>

        <p className='mb-[4px] select-none text-fs-12-lh-normal-fw-400 text-black/50 violet:text-black/50 dark:text-white/50'>
          Deadline
        </p>
        <div className='relative'>
          <input type='date' className='mb-[40px] ' {...register('deadline')} />
          {errors.deadline && (
            <span className=' absolute left-0 top-5 text-red-600'>
              Wrong date!
            </span>
          )}
        </div>
        {/* <DayPicker
          className={cn('border border-brand p-[18px]')}
          classNames={{
            months: 'flex flex-col space-y-4 sm:space-x-4 sm:space-y-0',
            month: 'space-y-4',
            caption:
              'flex justify-center relative items-center border-b border-white/20 pb-[14px]',
            caption_label: 'text-fs-16-lh-normal-fw-500',
            nav: 'space-x-1 flex items-center',
            nav_button: 'hover:text-brand',
            nav_button_previous: 'absolute left-0',
            nav_button_next: 'absolute right-0',
            table: 'w-full border-collapse !mt-[14px]',
            head_row: 'flex',
            head_cell:
              'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
            row: 'flex w-full mt-2',
            cell: cn(
              'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md'
            ),
            day: cn(
              'h-7 w-7 text-fs-14-lh-1.28-fw-400 flex items-center justify-center rounded-md'
            ),
            day_range_start: 'day-range-start',
            day_range_end: 'day-range-end',
            day_selected:
              'bg-brand text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
            day_today: 'bg-brand text-accent-foreground',
            day_outside:
              'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
            day_range_middle:
              'aria-selected:bg-accent aria-selected:text-accent-foreground'
          }}
          mode='single'
          selected={selected}
          onSelect={setSelected}
        /> */}

        <Button isAddIcon iconName='plus' type='submit' disabled={!isValid}>
          Edit
        </Button>
      </form>
    </Modal>
  )
}