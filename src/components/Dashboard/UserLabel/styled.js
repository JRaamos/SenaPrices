import styled from "styled-components";

export const UserContent = styled.button`
    min-width: 0;
    max-width: min(44vw, 320px);
    min-height: 42px;
    padding: 6px 8px 6px 6px;
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.18);
    background: #ffffff;
    display: flex;
    align-items: center;
    gap: 10px;
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
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const UserMeta = styled.div`
    color: #64748b;
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const UserInitial = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    font-size: 14px;
    font-weight: 800;
    color: #ffffff;
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
