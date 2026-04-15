import styled from 'styled-components'

export const DashboardPage = styled.div.attrs({
})`
`;

export const DashboardBody = styled.div.attrs({
})`
    position: relative;
    min-height: 100vh;
    max-height: 100vh;
    background: ${props => props.theme.palette.colors.white};
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    overflow: auto;
    width: 100vw;
    max-width: 100vw;
    flex:1;
`;

export const DashboardBodyContainer = styled.div.attrs({
    id: "body-scroll"
})`

    background: ${props => props.theme.palette.colors.slate100};
    min-width: calc(100% - 220px);
    ${p => p?.fluid ? `
            overflow:auto;
            min-height: 100vh;
            max-height: 100vh;
        ` : ``
    }
`;

export const DashboardBodyContent = styled.div.attrs({
})`
    margin: 0px;
    background: transparent;
    padding: 0px;
    min-height: 100vh;
`;

export const Content = styled.div.attrs({
})`
    overflow: hidden;
`;
