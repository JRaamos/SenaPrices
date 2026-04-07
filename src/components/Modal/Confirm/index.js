import { CoreContext } from 'context/CoreContext'
import React, { useContext } from 'react'
import { DashboardActions, DashboardActionsItem, FormText } from 'ui/styled'
import { CompanyButtonContainer, ModalBody } from './styled'
import Wrapper from '../Wrapper';
import Button from 'components/Form/Button';

export default function ModalConfirm({
  title,
  text,
  description,
  action,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
}) {

  const { modal, setModal } = useContext(CoreContext)
  const safeTitle = title ?? modal?.title
  const safeText = text ?? description ?? modal?.text
  const safeAction = typeof onConfirm === 'function' ? onConfirm : action ?? modal?.action

  const close = () => {
    onCancel?.()
    setModal(null)
  }

  const handleSave = () => {
    if(typeof safeAction === 'function'){
      safeAction()
    }
    close()
  }

  return (
    <>
      <Wrapper title={safeTitle} onClose={close}>
        <ModalBody>
          <FormText big>{ safeText?.split("\n")?.map((m, index) => <React.Fragment key={index}>{m}<br /></React.Fragment>) }</FormText>
        </ModalBody> 
        <CompanyButtonContainer>
          <DashboardActions>
            <DashboardActionsItem>
              <Button rounded nospace outline color="primary" onClick={close} onPress={close}>{cancelLabel}</Button>
            </DashboardActionsItem>
            <DashboardActionsItem>
              <Button rounded nospace color="primary" onClick={handleSave} onPress={handleSave} between>{confirmLabel}</Button>
            </DashboardActionsItem>
          </DashboardActions>
        </CompanyButtonContainer>
      </Wrapper>
    </>
  )
}
