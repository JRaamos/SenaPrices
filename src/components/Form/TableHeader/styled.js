import styled from 'styled-components'  

export const RowTableSearch = styled.div.attrs({ 
})`     
    border-top: 1px solid ${ p => p.theme.palette.colors.border };    
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
    flex-wrap: wrap;
    ${
        p => p?.toend ? `
            justify-content: flex-end;
        ` : ``
    }
`;

export const SearchTabs = styled.div.attrs({ 
})`             
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
`;

export const SearchTab = styled.div.attrs({ 
})`            
    padding: 10px 16px;
    ${
         p => p?.active ? `
            font-weight: 600;
            color: ${ p.theme.palette.primary.main };
            border-bottom: 3px solid ${ p.theme.palette.primary.main };
         ` : ``
    }
    cursor: pointer;
`;