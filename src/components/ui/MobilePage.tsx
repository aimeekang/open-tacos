import { Dialog } from '@headlessui/react'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Bar from './Bar'
interface MobilePageProps {
  isOpen: boolean
  onClose: () => void
  onGoBack: () => void
  title: string
  children: JSX.Element | JSX.Element[]
}

/**
 * See https://developer.apple.com/design/human-interface-guidelines/ios/views/pages/
 */
export default function MobilePage ({ isOpen, onClose, onGoBack, title, children }: MobilePageProps): JSX.Element {
  return (
    <Dialog open={isOpen} onClose={onClose} className='absolute z-50 inset-0  w-screen h-screen bg-default'>
      <Dialog.Title className=''>
        <Bar backgroundClass='bg-contrast'>
          <button
            role='button'
            className='flex no-wrap items-center'
            onClick={onGoBack}
          >
            <ChevronLeftIcon className='w-6 h-6' /><span className='text-xs'>Home</span>
          </button>
          <span className='mt-0.5 text-base font-semibold align-middle'>{title}</span>
          {/* do we need header button on the right like Android's? Empty div for now */}
          <div className='w-8 h-8'>&nbsp;</div>
        </Bar>
      </Dialog.Title>
      {children}
    </Dialog>
  )
}
