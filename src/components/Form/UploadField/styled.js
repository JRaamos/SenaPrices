import styled from 'styled-components'  

export const UploadContent = styled.div.attrs({ 
})`
    border: 1px solid  ${ p => p.theme.palette.colors.shadow };
    border-style: dashed;
    min-height: 56px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${
        p => p.image ? `
            background: url(${p?.image}) no-repeat center center / contain;
        ` : ``
    }

    ${
        p => p.squared ? `
            aspect-ratio: 1 / 1 ;
        ` : ``
    }
    cursor: pointer;
`;


export const InputRequired = styled.b.attrs({ 
})`
    font-size: 14px;
    color: ${ p => p.theme.palette.colors.lightgrey };
`;