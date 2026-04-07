import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  position: relative;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 8px;
`;

export const Controls = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const DisableLayer = styled.div.attrs({
})`
    width: 100%;
    height: 100%;
    background: transparent;
    position: absolute;
    z-index:1;
`;

