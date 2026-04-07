import { CoreContext } from 'context/CoreContext'
import React, { useContext } from 'react'
import { DashboardActions, DashboardActionsItem, FormText, Title } from 'ui/styled'
import { CompanyButtonContainer, ModalBody } from './styled'
import Wrapper from '../Wrapper';
import Button from 'components/Form/Button';

export default function ModalSample({
  title,
  text,
  description,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
}) {

  const { modal, setModal } = useContext(CoreContext)
  const safeTitle = title ?? modal?.title ?? "Sou um modal"
  const safeText = text ?? description ?? "Duplique esse exemplo para criar novos modais"

  const close = () => {
    onCancel?.()
    setModal(null)
  }

  const handleSave = () => {
    onConfirm?.()
    close()
  }

  return (
    <>
      <Wrapper title={safeTitle} onClose={close}>
        <ModalBody>
          <FormText>{safeText}</FormText>
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
