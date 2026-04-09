import styled from "styled-components";

const TONES = {
    blue: {
        background: "rgba(59, 130, 246, 0.1)",
        color: "#3b82f6",
    },
    green: {
        background: "rgba(16, 185, 129, 0.12)",
        color: "#10b981",
    },
    orange: {
        background: "rgba(245, 158, 11, 0.12)",
        color: "#f59e0b",
    },
    pink: {
        background: "rgba(236, 72, 153, 0.12)",
        color: "#ec4899",
    },
    red: {
        background: "rgba(239, 68, 68, 0.1)",
        color: "#ef4444",
    },
    gold: {
        background: "rgba(245, 158, 11, 0.14)",
        color: "#c76b00",
    },
};

export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 16px;
`;

export const HeaderLead = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
    min-width: 0;
    flex: 1;
`;

export const HeaderBadge = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: ${({ $tone }) => TONES[$tone]?.background || TONES.blue.background};
    color: ${({ $tone }) => TONES[$tone]?.color || TONES.blue.color};
`;

export const HeaderTextContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
    flex: 1;
`;

export const Title = styled.div`
    font-weight: 800;
    font-size: 32px;
    line-height: 1.08;
    letter-spacing: -0.04em;
    color: ${p => p.theme.palette.colors.black};

    @media (max-width: 767px) {
        font-size: 26px;
    }
`;

export const Subtitle = styled.div`
    color: #64748b;
    font-size: 15px;
    line-height: 1.5;
    max-width: 820px;
`;

export const ButtonContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 12px;
`;
