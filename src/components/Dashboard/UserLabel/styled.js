import styled from "styled-components";

export const UserContent = styled.button`
    min-width: 0;
    max-width: min(44vw, 320px);
    min-height: 38px;
    padding: 4px 8px 4px 4px;
    border-radius: 10px;
    border: 1px solid rgba(203, 213, 225, 0.92);
    background: #ffffff;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    transition: background .2s ease, border-color .2s ease;

    &:hover {
        background: #f8fafc;
        border-color: rgba(148, 163, 184, 0.28);
    }

    @media(max-width: 560px){
        max-width: 54px;
        justify-content: center;
        padding-right: 6px;
    }
`;

export const UserTextGroup = styled.div`
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;

    @media(max-width: 560px){
        display: none;
    }
`;

export const UserName = styled.div`
    min-width: 0;
    color: #0f172a;
    font-size: 12px;
    font-weight: 700;
    line-height: 17px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const UserMeta = styled.div`
    color: #64748b;
    font-size: 10px;
    font-weight: 600;
    line-height: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const UserInitial = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: #1e3a5f;
    font-size: 12px;
    font-weight: 700;
    color: #93c5fd;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    flex-shrink: 0;
`;

export const InfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
`;
