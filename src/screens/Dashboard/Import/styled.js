import styled from "styled-components";

export {
    CatalogCard,
    CatalogCardEyebrow,
    CatalogCardHeader,
    CatalogCardText,
    CatalogCardTitle,
    CatalogField,
    CatalogInput,
    CatalogLabel,
    CatalogSelect,
    ChecklistItem,
    ChecklistList,
    ChecklistText,
    ChecklistTitle,
    CreateItemLayout as ImportLayout,
    CreateItemMain as ImportMain,
    CreateItemSidebar as ImportSidebar,
    ErrorSummary,
    ErrorSummaryItem,
    ErrorSummaryTitle,
    FieldCounter,
    FieldError,
    FieldMeta,
    InlineNotice,
    StatusBadge,
    StatusCard,
    StatusText,
    StatusTitle,
    SummaryGrid,
    SummaryItem,
    SummaryLabel,
    SummaryValue,
    WarningItem,
    WarningList,
} from "../CreateItem/styled";

export const Dropzone = styled.button.attrs({
    type: "button",
})`
    width: 100%;
    padding: 48px;
    border-radius: 10px;
    border: 2px dashed ${props => props.$dragging ? "rgba(59,130,246,0.4)" : props.theme.palette.colors.geyser};
    background: ${props => props.$dragging ? "rgba(59,130,246,0.05)" : "rgba(248,250,252,0.94)"};
    display: grid;
    gap: 12px;
    text-align: center;
    cursor: pointer;
    transition: border-color .2s ease, background .2s ease, transform .2s ease;

    &:hover{
        border-color: rgba(59,130,246,0.28);
        transform: translateY(-1px);
    }

    &:focus-visible{
        outline: 3px solid rgba(59,130,246,0.16);
        outline-offset: 2px;
    }
`;

export const DropzoneTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 15px;
    font-weight: 500;
    line-height: 22px;
`;

export const DropzoneText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const DropzoneMeta = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const MetaBadge = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    width: fit-content;
    padding: 5px 12px;
    border-radius: 999px;
    background: ${props => props.$tone === "blue"
        ? "rgba(59,130,246,0.08)"
        : props.$tone === "green"
            ? "rgba(22,163,74,0.12)"
            : props.$tone === "danger"
                ? "rgba(254,242,242,0.96)"
                : "rgba(148,163,184,0.12)"};
    color: ${props => props.$tone === "blue"
        ? props.theme.palette.primary.main
        : props.$tone === "green"
            ? "#15803d"
            : props.$tone === "danger"
                ? "#b91c1c"
                : props.theme.palette.colors.slate};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const DatasetMetaGrid = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const DatasetMetaCard = styled.div.attrs({
})`
    padding: 12px;
    border-radius: 8px;
    background: rgba(248,250,252,0.92);
    border: 1px solid ${props => props.theme.palette.colors.mystic};
`;

export const DatasetMetaLabel = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 10px;
    font-weight: 600;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const DatasetMetaValue = styled.div.attrs({
})`
    margin-top: 6px;
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    word-break: break-word;
`;

export const DatasetColumns = styled.div.attrs({
})`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;

export const ColumnBadge = styled.span.attrs({
})`
    display: inline-flex;
    align-items: center;
    padding: 5px 12px;
    border-radius: 999px;
    border: 1px solid ${props => props.theme.palette.colors.mystic};
    background: rgba(248,250,252,0.92);
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
`;

export const MappingGrid = styled.div.attrs({
})`
    display: grid;
    gap: 12px;
`;

export const MappingRow = styled.div.attrs({
})`
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid ${props => props.$required && !props.$mapped
        ? "rgba(249,115,22,0.18)"
        : props.theme.palette.colors.mystic};
    background: ${props => props.$required && !props.$mapped
        ? "rgba(255,247,237,0.96)"
        : "rgba(248,250,252,0.92)"};
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(260px, 0.9fr);
    gap: 12px;
    align-items: center;

    @media(max-width: 720px){
        grid-template-columns: 1fr;
    }
`;

export const MappingTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const MappingText = styled.div.attrs({
})`
    margin-top: 4px;
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const ResultList = styled.div.attrs({
})`
    display: grid;
    gap: 10px;
`;

export const ResultItem = styled.div.attrs({
})`
    padding: 11px 13px;
    border-radius: 8px;
    border: 1px solid ${props => props.$tone === "danger" ? "rgba(248,113,113,0.18)" : props.theme.palette.colors.mystic};
    background: ${props => props.$tone === "danger" ? "rgba(254,242,242,0.96)" : "rgba(248,250,252,0.92)"};
    color: ${props => props.$tone === "danger" ? "#991b1b" : props.theme.palette.colors.ebony};
    font-size: 13px;
    line-height: 20px;
`;

export const ImportTable = styled.div.attrs({
})`
    display: grid;
    gap: 10px;
`;

export const ImportTableHeader = styled.div.attrs({
})`
    display: grid;
    grid-template-columns: 88px 124px minmax(220px, 1fr) minmax(220px, 1.2fr) minmax(180px, 0.9fr);
    gap: 10px;
    padding: 0 4px;

    @media(max-width: 1120px){
        display: none;
    }
`;

export const ImportTableHeaderCell = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const ImportTableRow = styled.div.attrs({
})`
    padding: 12px 14px;
    border-radius: 10px;
    border: 1px solid ${props => props.$tone === "danger"
        ? "rgba(248,113,113,0.18)"
        : props.$tone === "green"
            ? "rgba(22,163,74,0.16)"
            : props.$tone === "blue"
                ? "rgba(59,130,246,0.18)"
                : props.theme.palette.colors.mystic};
    background: ${props => props.$tone === "danger"
        ? "rgba(254,242,242,0.96)"
        : props.$tone === "green"
            ? "rgba(240,253,244,0.92)"
            : props.$tone === "blue"
                ? "rgba(239,246,255,0.92)"
                : "rgba(248,250,252,0.92)"};
    display: grid;
    grid-template-columns: 88px 124px minmax(220px, 1fr) minmax(220px, 1.2fr) minmax(180px, 0.9fr);
    gap: 10px;
    align-items: start;

    @media(max-width: 1120px){
        grid-template-columns: 1fr;
    }
`;

export const ImportCell = styled.div.attrs({
})`
    display: grid;
    gap: 6px;
`;

export const ImportCellTitle = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    line-height: 19px;
`;

export const ImportCellText = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const ImportMessage = styled.div.attrs({
})`
    color: ${props => props.theme.palette.colors.ebony};
    font-size: 12px;
    line-height: 18px;
`;
