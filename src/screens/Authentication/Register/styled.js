import styled from "styled-components";

export const FormTitle = styled.div`
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: 800;
    font-size: 24px;
    line-height: 30px;
    margin: 36px 0 10px;
`;

export const FormText = styled.div`
    font-size: 15px;
    line-height: 24px;
    color: ${({ theme }) => theme.palette.colors.grey};
    max-width: 360px;
    margin-bottom: 24px;
`;

export const FormSpacer = styled.div`
    margin-top: 24px;
`;

export const RegisterCall = styled.div`
    margin: 24px 0 0;
    color: ${({ theme }) => theme.palette.colors.grey};
    font-size: 14px;
    font-weight: 700;
`;

export const PlanCard = styled.div`
    margin-bottom: 24px;
    padding: 16px 18px;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: rgba(248, 250, 252, 0.94);
`;

export const PlanEyebrow = styled.div`
    color: ${({ theme }) => theme.palette.colors.gull};
    font-size: 11px;
    font-weight: 800;
    line-height: 16px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const PlanTitle = styled.div`
    margin-top: 8px;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 16px;
    font-weight: 800;
    line-height: 24px;
`;

export const PlanText = styled.div`
    margin-top: 8px;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 13px;
    line-height: 20px;
`;

export const ActionRow = styled.div`
    margin-top: 16px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;
