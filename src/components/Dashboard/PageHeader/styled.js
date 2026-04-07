import styled from 'styled-components';

export const HeaderWrapper = styled.div.attrs({})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap:8px;
`;

export const HeaderTextContent = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  flex:1;
`;

export const Title = styled.div.attrs({})`
  font-weight: 700;
  font-size: 24px;
  color: ${p => p.theme.palette.colors.black};
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  flex-wrap:wrap;
  gap: 16px;

`;

