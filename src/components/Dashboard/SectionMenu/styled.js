import styled from "styled-components";

const SECTION_MENU_WIDTH = "170px";
const SECTION_MENU_GAP = "18px";

export const SectionMenuLayout = styled.div.attrs({})`
    display: grid;
    grid-template-columns: ${SECTION_MENU_WIDTH} minmax(0, 1fr);
    gap: ${SECTION_MENU_GAP};
    align-items: start;
    padding-bottom: 96px;

    @media(max-width: 1080px){
        grid-template-columns: 1fr;
        padding-bottom: 112px;
    }
`;

export const SectionMenuSidebar = styled.aside.attrs({})`
    position: sticky;
    top: 0;
    padding: 24px 0;
    border-right: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: ${({ theme }) => theme.palette.colors.white};
    display: grid;
    gap: 10px;

    @media(max-width: 1080px){
        position: static;
        padding: 16px 12px 12px;
        border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
        border-radius: 12px;
        box-shadow: 0 8px 22px rgba(15, 23, 42, 0.05);
    }
`;

export const SectionMenuContent = styled.main.attrs({})`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const SectionMenuTitle = styled.h2.attrs({})`
    margin: 0;
    padding: 0 14px 3px;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: -0.03em;
`;

export const SectionMenuList = styled.div.attrs({})`
    display: flex;
    flex-direction: column;
    gap: 0;
`;

export const SectionMenuButton = styled.button.attrs({
    type: "button",
})`
    width: 100%;
    min-height: 34px;
    padding: 8px 14px;
    border: 0;
    border-left: 3px solid ${({ $active, theme }) => $active ? theme.palette.primary.main : "transparent"};
    border-radius: 0;
    background: ${({ $active }) => $active ? "rgba(59,130,246,0.08)" : "transparent"};
    color: ${({ $active, theme }) => $active ? theme.palette.primary.main : theme.palette.colors.slate};
    display: flex;
    align-items: center;
    gap: 7px;
    cursor: pointer;
    text-align: left;
    transition: background .2s ease, color .2s ease, border-color .2s ease;

    &:hover {
        background: rgba(59,130,246,0.06);
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

export const SectionMenuIconWrap = styled.span.attrs({})`
    width: 14px;
    height: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const SectionMenuLabel = styled.span.attrs({})`
    font-size: 12px;
    font-weight: 600;
    line-height: 18px;
`;
