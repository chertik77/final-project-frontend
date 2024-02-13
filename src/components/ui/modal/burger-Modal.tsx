
import { useModalInstance } from 'react-modal-state'
import { Modal as Dialog } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import type { ModalProps } from './modal-types'

export const BurgerModal = ({ children }: ModalProps) => {
  const { isOpen, close } = useModalInstance();

  const customStyles = {
    modal: {
      padding: 0,
      margin: 0,
      maxWidth: 225,
      display: 'block',
  
    }
  }
  if (window.innerWidth >= 767) {
    customStyles.modal.maxWidth = 260;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      styles={customStyles}
      showCloseIcon={false}
    >
      {children}
    </Dialog>
  );
}