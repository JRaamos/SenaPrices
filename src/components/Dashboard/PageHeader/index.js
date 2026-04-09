import React, { useMemo } from "react";

import Button from "components/Form/Button";

import DashboardIconGlyph from "../IconGlyph";
import {
    ButtonContent,
    HeaderBadge,
    HeaderLead,
    HeaderTextContent,
    HeaderWrapper,
    Subtitle,
    Title,
} from "./styled";

const HEADER_META = [
    { match: "criar preco", icon: "createPrice", description: "Cartazes de preço promocional", tone: "green" },
    { match: "criacao rapida", icon: "quickPrice", description: "Crie múltiplos preços. Use Tab e Enter para navegar rapidamente entre os campos.", tone: "blue" },
    { match: "impressao em lote", icon: "batchPrint", description: "Selecione e imprima múltiplos cartazes mantendo o formato certo de papel.", tone: "pink" },
    { match: "promocoes", icon: "promotions", description: "Crie e gerencie promoções programadas enviadas para usuários.", tone: "orange" },
    { match: "historico", icon: "history", description: "Preços salvos e impressos com rastreabilidade operacional.", tone: "blue" },
    { match: "etiquetas", icon: "labels", description: "Selecione produtos por seção e imprima etiquetas de gôndola ou Zebra.", tone: "orange" },
    { match: "criar item", icon: "createItem", description: "Cadastre novos produtos no sistema com base consistente para cartazes e etiquetas.", tone: "orange" },
    { match: "itens", icon: "items", description: "Base operacional do catálogo com busca, ações rápidas e governança simples.", tone: "orange" },
    { match: "importar", icon: "import", description: "Importe itens ou preços a partir de arquivos XLSX, CSV ou TXT.", tone: "blue" },
    { match: "relatorios", icon: "reports", description: "Análise de impressões e atividade operacional por período e usuário.", tone: "blue" },
    { match: "integracao pdv", icon: "integration", description: "Integre com seu sistema de PDV para importação automática de produtos e preços.", tone: "red" },
    { match: "definicoes", icon: "settings", description: "Padronize regras, layout, permissões e recursos compartilhados do sistema.", tone: "blue" },
    { match: "governanca da plataforma", icon: "master", description: "Landing, planos, tema sazonal e parâmetros globais da plataforma.", tone: "gold" },
    { match: "minha conta", icon: "account", description: "Dados pessoais, segurança e visão resumida da conta autenticada.", tone: "blue" },
    { match: "senha", icon: "security", description: "Atualize credenciais com segurança e mantenha o acesso sob controle.", tone: "blue" },
    { match: "suporte", icon: "support", description: "Central de suporte SenaPrices para abertura e acompanhamento de chamados.", tone: "blue" },
    { match: "log de suporte", icon: "supportAccess", description: "Registro de acessos administrativos a contas de clientes.", tone: "gold" },
];

function normalize(value = "") {
    return `${value || ""}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function resolveHeaderMeta(header = {}) {
    const normalizedTitle = normalize(header?.title);
    const fallback = HEADER_META.find(item => normalizedTitle.includes(item.match)) || HEADER_META[0];

    return {
        icon: header?.icon || fallback?.icon || "settings",
        description: header?.description || fallback?.description || "",
        tone: header?.tone || fallback?.tone || "blue",
    };
}

export default function PageHeader({ header, loading }) {
    const meta = useMemo(() => resolveHeaderMeta(header), [header]);

    return (
        <HeaderWrapper>
            <HeaderLead>
                <HeaderBadge $tone={meta.tone}>
                    <DashboardIconGlyph name={meta.icon} size={24} color="currentColor" />
                </HeaderBadge>

                <HeaderTextContent>
                    <Title>{header?.title}</Title>
                    {meta.description ? <Subtitle>{meta.description}</Subtitle> : null}
                </HeaderTextContent>
            </HeaderLead>

            <ButtonContent>
                {header?.actions?.map((action, idx) => (
                    <div key={idx}>
                        <Button
                            leftIcon={action?.icon}
                            loading={action?.loadable && loading}
                            rounded={action?.rounded}
                            outline={action?.outline}
                            color={action?.color}
                            small
                            nospace
                            onClick={action.action}
                        >
                            {action.label}
                        </Button>
                    </div>
                ))}
            </ButtonContent>
        </HeaderWrapper>
    );
}
