import styled from 'styled-components'

export const CrumbList = styled.nav.attrs({})`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${p => p.theme.palette.colors.grey};
  gap: 4px 0;
  flex-wrap: wrap;
`

export const CrumbItem = styled.span.attrs({})`
  display: flex;
  align-items: center;
`

export const CrumbLink = styled.a.attrs({})`
  color: ${p => p.theme.palette.colors.black};
  cursor: pointer;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;

  ${p => p.active ? `
    font-weight: 600;
    color: ${p.theme.palette.primary.main};
    ` : ``};

  text-decoration: none;
`

export const Separator = styled.span.attrs({})`
  margin: 0 8px;
  color: ${p => p.theme.palette.colors.grey};
`