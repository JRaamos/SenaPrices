import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ReadObject } from "services/storage";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);

    const authentication = ReadObject("authentication") || {};
    const isAuthenticated = !!authentication?.jwt;

    const hero = useMemo(() => ({
        eyebrow: "Erro de navegação",
        title: "Página não encontrada",
        description: isAuthenticated
            ? "O caminho solicitado não existe nesta etapa do sistema. Você pode retornar ao painel e seguir pelos módulos já ativos."
            : "O caminho solicitado não existe ou não está mais disponível. Volte para a apresentação pública ou entre no sistema para continuar.",
    }), [isAuthenticated]);

    const actions = useMemo(() => (
        isAuthenticated
            ? [
                {
                    key: "dashboard",
                    label: "Voltar ao painel",
                    primary: true,
                    action: () => navigate("dashboard"),
                },
                {
                    key: "support",
                    label: "Abrir suporte",
                    action: () => navigate("dashboard/support"),
                },
            ]
            : [
                {
                    key: "presentation",
                    label: "Voltar à apresentação",
                    primary: true,
                    action: () => navigate(""),
                },
                {
                    key: "login",
                    label: "Ir para login",
                    action: () => navigate("login"),
                },
            ]
    ), [isAuthenticated, navigate]);

    const guidelines = useMemo(() => ([
        {
            title: "Rotas previsíveis",
            description: "A tela de erro devolve o usuário para pontos válidos do sistema, evitando becos sem saída na navegação.",
        },
        {
            title: "Sem falsa recuperação",
            description: "Quando a rota não existe, a interface não tenta adivinhar intenção; ela orienta o próximo passo com clareza.",
        },
        {
            title: "Mesmo padrão visual",
            description: "O estado de erro segue a linguagem visual limpa do projeto para manter confiança mesmo fora do fluxo ideal.",
        },
    ]), []);

    return {
        isAuthenticated,
        hero,
        actions,
        guidelines,
    };
}
