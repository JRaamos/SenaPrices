import styled from 'styled-components'

export const BannerImage = styled.div.attrs({
})`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    min-height: 1104px;
    padding: 269.36px 40px;
    background: ${p => p.theme.palette.blueStrong.main};
`;

export const TextContainer = styled.div.attrs({
})`
    max-width: 760px;
    padding: 0px 43px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

