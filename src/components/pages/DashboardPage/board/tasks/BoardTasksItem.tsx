type BoardTasksItemProps = {
  title: string
  description: string
  priority: 'Low' | 'Medium' | 'High' | 'Without priority'
  deadline: string
}

type ColorPickerArg = 'Low' | 'Medium' | 'High' | 'Without priority'

const PriorityBorderColorPicker = (priority: ColorPickerArg) => {
  switch (priority) {
    case 'Low':
      return 'border-priority-low'
    case 'Medium':
      return 'border-priority-medium'
    case 'High':
      return 'border-brand'
    default:
      return 'border-black/30 dark:border-white/30'
  }
}

const PriorityColorPicker = (priority: ColorPickerArg) => {
  switch (priority) {
    case 'Low':
      return 'bg-priority-low'
    case 'Medium':
      return 'bg-priority-medium'
    case 'High':
      return 'bg-brand'
    default:
      return 'bg-black/30 dark:bg-white/30'
  }
}

export const BoardTasksItem = ({
  title,
  description,
  priority,
  deadline
}: BoardTasksItemProps) => {
  return (
    <div
      className={`h-[154px] w-[334px] rounded-[8px] border-l-[4px] ${PriorityBorderColorPicker(priority)} bg-white py-[14px] pl-[24px] pr-[20px] dark:bg-black`}>
      <p className='pb-[8px] text-fs-14-lh-normal-fw-600 dark:text-white'>
        {title}
      </p>
      <p className='mb-[14px] line-clamp-2 min-h-[38px] text-fs-12-lh-normal-fw-400 text-black/70 dark:text-white/50'>
        {description}
      </p>
      <div className='flex items-end border-t-[1px] border-black/10 pt-[14px] dark:border-white/10'>
        <div className='pr-[14px]'>
          <p className='pb-[4px] text-fs-8-lh-normal-fw-400 text-black/50 dark:text-white/50'>
            Priority
          </p>
          <div className='flex items-center gap-[4px]'>
            <div
              className={`size-[12px]  rounded-[50%] ${PriorityColorPicker(priority)}`}></div>
            <p className='text-fs-10-lh-normal-fw-400'>{priority}</p>
          </div>
        </div>
        <div>
          <p className='pb-[4px] text-fs-8-lh-normal-fw-400 text-black/50 dark:text-white/50'>
            Deadline
          </p>
          <p className='text-fs-10-lh-normal-fw-400'>{deadline}</p>
        </div>
        <div className='ml-auto flex gap-[8px]'>
          <svg className='size-[19px] stroke-brand pr-[4px]'>
            <use xlinkHref='/assets/icons.svg#icon-bell'></use>
          </svg>
          <button>
            <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-arrow-btn'></use>
            </svg>
          </button>
          <button>
            <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-pencil-btn'></use>
            </svg>
          </button>
          <button>
            <svg className='size-[16px] stroke-black/50 transition duration-300 ease-in-out hocus:stroke-black dark:stroke-white/50 dark:hocus:stroke-white'>
              <use xlinkHref='/assets/icons.svg#icon-trash-btn'></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
