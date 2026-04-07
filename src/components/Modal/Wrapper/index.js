import React, { useContext } from 'react'

import { CloseContainer, CompanyDataContainer } from './styled'
import { Icon, ModalContainer, ModalContent, Overlay, Title } from 'ui/styled'

import { CoreContext } from 'context/CoreContext'

export default function Wrapper({
  children,
  title,
  label,
  close,
  onClose,
  onDismiss,
  closeOnOverlayPress = true,
}) {

  const { setModal } = useContext(CoreContext)
  const safeTitle = title ?? label

  const closeModal = () => {
    if (typeof close === 'function') {
      close()
      return
    }

    if (typeof onClose === 'function') {
      onClose()
      return
    }

    if (typeof onDismiss === 'function') {
      onDismiss()
      return
    }

    setModal(null)
  }

  const handleClose = (e) => {
    const mc = document.getElementById('modal-content');
    // console.log("close", mc.contains(e?.target), e?.target)
    if (closeOnOverlayPress && !mc?.contains(e?.target) && !(e?.target.tagName === 'LI') && !(e?.target.tagName === 'UL')) {
      closeModal()
    }
  }

  return (
    <>
      <Overlay onClick={handleClose} >
        <ModalContainer>
          <ModalContent id="modal-content">
            <CompanyDataContainer>
              <CloseContainer>
                { safeTitle ? <Title upper nomargin>{ safeTitle }</Title> : null }
                <Icon icon={'close-big'} pointer={true} onClick={closeModal} />
              </CloseContainer>
              {children}
            </CompanyDataContainer>
          </ModalContent>
        </ModalContainer>
      </Overlay>
    </>
  )
}
