import styled from 'styled-components'

export const DashboardPage = styled.div.attrs({
})`
`;

export const DashboardBody = styled.div.attrs({
})`
    position: relative;
    min-height: 100vh;
    max-height: 100vh;
    background: ${props => props.theme.palette.colors.slate100};
    display: flex;
    align-items: flex-start;
    overflow: auto;
    width: 100vw;
    max-width: 100vw;
    flex:1;
`;

export const DashboardBodyContainer = styled.div.attrs({
    id: "body-scroll"
})`
    flex:1;
    background: ${props => props.theme.palette.colors.slate100};
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
