import { cva } from 'class-variance-authority'

export const modalVariants = cva(
  'm-0 rounded-lg p-6 shadow-none dark:bg-black',
  {
    variants: {
      size: {
        sm: 'w-[335px] tablet:w-[350px]',
        md: 'w-[335px] tablet:w-[400px]'
      }
    },
    defaultVariants: {
      size: 'sm'
    }
  }
)
