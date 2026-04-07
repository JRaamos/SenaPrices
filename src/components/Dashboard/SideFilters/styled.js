import styled from "styled-components";

export const Title = styled.div.attrs({
})`            
    font-size: 22px;
    font-weight: bold;
    color: ${props => props.theme.palette.colors.black};
    ${props => props.centred ? `
            text-align: center;
        ` : ``
  }
`;

export const Container = styled.div.attrs({
})`            
    display: flex;
    flex-direction: column;
    gap: 24px;
    height: 100%;
    justify-content: space-between;
`;

export const FormSpacing = styled.div.attrs({
})`
  margin-top: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid ${props => props.theme.palette.colors.shadow};
`;

export const FilterSidebar = styled.div.attrs({
})` 
  display: flex;
  flex-direction: column;
  max-width: 384px;
  height: 100%;
  top: 0;
  right: -400px;
  position: fixed;
  padding: 24px;
  background-color: ${props => props.theme.palette.colors.white};
  box-shadow: -2px 0 5px ${p => p.theme.palette.colors.shadow}; 
  transition: right 0.3s ease-in-out; 
  z-index: 1000; 
  overflow-y: auto;
  min-width: 390px;
  &.active {
    right: 0; 
  }
  @media (max-width: 400px) {
    min-width: 100%;
  }
`;

export const Overlay = styled.div.attrs({
})`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${p => p.theme.palette.colors.shadow}; 
  z-index: 900;  
  &.active {
    display: block;  
  }
`;
