import styled from "styled-components";

export const LoginShell = styled.div`
    min-height: 100vh;
    background:
        radial-gradient(circle at top left, rgba(6, 52, 107, 0.18), transparent 28%),
        radial-gradient(circle at bottom right, rgba(232, 108, 48, 0.14), transparent 24%),
        linear-gradient(180deg, #f5f9ff 0%, #eef3fb 52%, #f8fafc 100%);
`;

export const LoginTopBar = styled.div`
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 20px 0 0;
`;

export const LoginTopButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    min-height: 42px;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.22);
    background: rgba(255, 255, 255, 0.74);
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
`;

export const BackAction = styled.span`
    font-size: 14px;
    line-height: 1;
`;

export const LoginWrapper = styled.div`
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 32px 0 48px;
`;

export const LoginGrid = styled.div`
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
    gap: 22px;
    align-items: stretch;

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;
    }
`;

export const BrandPanel = styled.div`
    padding: 32px;
    border-radius: 28px;
    background:
        radial-gradient(circle at top right, rgba(59, 130, 246, 0.18), transparent 28%),
        linear-gradient(180deg, rgba(6, 52, 107, 0.96) 0%, rgba(15, 23, 42, 0.98) 100%);
    color: ${({ theme }) => theme.palette.colors.white};
    box-shadow: 0 26px 44px rgba(6, 52, 107, 0.18);
`;

export const LoginLogoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
`;

export const LoginLogoText = styled.span`
    color: ${({ theme }) => theme.palette.colors.white};
    font-size: 32px;
    font-weight: 300;
    line-height: 32px;
`;

export const LoginLogoAccent = styled.span`
    color: ${({ theme }) => theme.palette.colors.azure};
    font-size: 32px;
    font-weight: 800;
    line-height: 32px;
`;

export const LoginCaption = styled.div`
    margin-top: 6px;
    color: rgba(255, 255, 255, 0.72);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

export const BrandTitle = styled.h1`
    margin: 26px 0 0;
    color: ${({ theme }) => theme.palette.colors.white};
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 800;
    line-height: 0.98;
    letter-spacing: -0.05em;
`;

export const BrandText = styled.p`
    margin: 16px 0 0;
    color: rgba(255, 255, 255, 0.78);
    font-size: 15px;
    line-height: 25px;
`;

export const BrandList = styled.div`
    margin-top: 24px;
    display: grid;
    gap: 12px;
`;

export const BrandListItem = styled.div`
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.16);
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.88);
    font-size: 13px;
    line-height: 21px;
`;

export const LoginCard = styled.div`
    padding: 28px;
    border-radius: 28px;
    border: 1px solid rgba(148, 163, 184, 0.18);
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 20px 34px rgba(15, 23, 42, 0.08);
`;

export const LoginCardTitle = styled.h2`
    margin: 0;
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 28px;
    font-weight: 800;
    line-height: 31px;
    letter-spacing: -0.03em;
`;

export const LoginCardText = styled.p`
    margin: 12px 0 0;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 14px;
    line-height: 23px;
`;

export const LoginTabs = styled.div`
    margin-top: 24px;
    padding: 4px;
    border-radius: 14px;
    background: ${({ theme }) => theme.palette.colors.catskill};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
`;

export const LoginTab = styled.button`
    min-height: 42px;
    border: 0;
    border-radius: 12px;
    background: ${({ $active, theme }) => ($active ? theme.palette.colors.azure : "transparent")};
    color: ${({ $active, theme }) => ($active ? theme.palette.colors.white : theme.palette.colors.slate)};
    font-size: 13px;
    font-weight: ${({ $active }) => ($active ? 700 : 600)};
    cursor: pointer;
`;

export const FieldGrid = styled.div`
    margin-top: 20px;
    display: grid;
    gap: 14px;
`;

export const Field = styled.div``;

export const FieldLabel = styled.label`
    display: block;
    margin-bottom: 7px;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
`;

export const FieldInput = styled.input`
    width: 100%;
    min-height: 48px;
    padding: 0 14px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.colors.geyser};
    background: ${({ theme }) => theme.palette.colors.white};
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 14px;
    outline: none;
`;

export const FieldHint = styled.div`
    margin-top: 8px;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;

export const FieldErrorBox = styled.div`
    margin-top: 16px;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid rgba(220, 38, 38, 0.18);
    background: rgba(254, 226, 226, 0.8);
    color: #991b1b;
    font-size: 13px;
    line-height: 20px;
`;

export const LoginActions = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

export const PrimaryButton = styled.button`
    flex: 1;
    min-height: 48px;
    padding: 12px 18px;
    border-radius: 14px;
    border: 0;
    background: linear-gradient(135deg, ${({ theme }) => theme.palette.primary.main} 0%, ${({ theme }) => theme.palette.colors.azure} 100%);
    color: ${({ theme }) => theme.palette.colors.white};
    font-size: 14px;
    font-weight: 800;
    cursor: pointer;

    @media(max-width: 560px){
        width: 100%;
    }
`;

export const SecondaryButton = styled.button`
    min-height: 48px;
    padding: 12px 18px;
    border-radius: 14px;
    border: 1px solid ${({ theme }) => theme.palette.colors.mystic};
    background: rgba(255, 255, 255, 0.72);
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;

    @media(max-width: 560px){
        width: 100%;
    }
`;

export const DividerText = styled.div`
    margin: 24px 0 12px;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
`;

export const CredentialGrid = styled.div`
    display: grid;
    gap: 10px;
`;

export const CredentialCard = styled.button`
    width: 100%;
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid rgba(148, 163, 184, 0.18);
    background: rgba(248, 250, 252, 0.96);
    text-align: left;
    cursor: pointer;
`;

export const CredentialTitle = styled.div`
    color: ${({ theme }) => theme.palette.colors.ebony};
    font-size: 13px;
    font-weight: 800;
    line-height: 20px;
`;

export const CredentialMeta = styled.div`
    margin-top: 6px;
    color: ${({ theme }) => theme.palette.colors.slate};
    font-size: 12px;
    line-height: 18px;
`;
