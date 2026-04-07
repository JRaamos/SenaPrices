import React, { useRef } from "react";
import Core from "components/Form/Core";

import Button from "components/Form/Button";
import { ButtonContainer, Icon } from "ui/styled";
import { Container, FilterSidebar, FormSpacing, Overlay, Title } from "./styled";


export default function SideFilters({
  formItems,
  filters,
  isActive,
  open,
  setIsActive,
  setOpen,
  currentFilters,
  values,
  setCurrentFilters,
  setValues,
  onChange,
}) {
  const safeFormItems = formItems ?? filters
  const safeIsActive = typeof isActive === 'boolean' ? isActive : !!open
  const safeSetIsActive = typeof setIsActive === 'function' ? setIsActive : setOpen
  const safeCurrentFilters = typeof currentFilters === 'undefined' ? values : currentFilters
  const safeSetCurrentFilters = typeof setCurrentFilters === 'function'
    ? setCurrentFilters
    : typeof setValues === 'function'
      ? setValues
      : onChange

  const refForm = useRef()

  const save = async () => {
    const form = refForm?.current?.getForm()
    if(!form) return;
    safeSetCurrentFilters?.(form)
    toggleSidebar()
  };

  const toggleSidebar = () => {
    safeSetIsActive?.(!safeIsActive);
  };

  const clear = () => {
    safeSetCurrentFilters?.({})
    toggleSidebar()
  };


  return (
    <>
      <FilterSidebar className={safeIsActive ? 'active' : ''}>
        <ButtonContainer between>
          <Title>Filtros</Title>
          <Icon icon='close-big' onClick={toggleSidebar} pointer />
        </ButtonContainer>
        <FormSpacing />
        <Container>
          { safeFormItems && <Core formItems={safeFormItems} ref={refForm} register={safeCurrentFilters} /> }
          <ButtonContainer column>
            <Button full fullRadius color={'primary'} light onClick={save}>Filtrar</Button>
            <Button full fullRadius onClick={clear} color="primary" light outline black>Limpar filtros</Button>
          </ButtonContainer>
        </Container>
      </FilterSidebar >
      <Overlay className={safeIsActive ? 'active' : ''} onClick={toggleSidebar} />
    </>
  );
}
