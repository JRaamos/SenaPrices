import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";

import { CoreContext } from "context/CoreContext";
import { exposeStrapiError } from "utils";
import { ReadMe, UpdateMe } from "services/me";
import { buildAccessProfile } from "services/access";

export default function useController() {
    const { user, setUser, reloadMe } = useContext(CoreContext);
    const accessProfile = useMemo(() => buildAccessProfile(user || {}), [user]);

    const [loading, setLoading] = useState(false);
    const formRef = useRef();

    const init = useCallback(async () => {
        setLoading(true);

        try {
            const result = await ReadMe();
            if (result?.id) {
                setUser(result);
            }
        } finally {
            setLoading(false);
        }
    }, [setUser]);

    const handleSave = useCallback(async () => {
        const form = formRef?.current?.getForm();
        if (!form || loading) return;

        const nextName = `${form?.name || ""}`.trim();
        if (!nextName) {
            toast.error("Informe um nome válido.");
            return;
        }

        if (nextName === `${user?.name || ""}`.trim()) {
            toast.info("Nenhuma alteração para salvar.");
            return;
        }

        setLoading(true);

        try {
            const result = await UpdateMe({ name: nextName });

            if (!exposeStrapiError(result)) {
                toast.success("Perfil atualizado com sucesso.");
                await reloadMe();
            }
        } finally {
            setLoading(false);
        }
    }, [loading, reloadMe, user]);

    const formItems = useMemo(() => ([
        {
            ref: "name",
            label: "Nome de exibição",
            placeholder: "Digite o nome que aparecerá na conta",
            required: true,
            full: true,
        },
        {
            ref: "email",
            label: "E-mail de acesso",
            placeholder: "email@empresa.com",
            disabled: true,
            full: true,
        },
    ]), []);

    const header = useMemo(() => ({
        title: "Minha Conta",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Minha Conta" },
        ],
        actions: [],
    }), []);

    const actions = useMemo(() => ([
        {
            label: "Salvar alterações",
            color: "primary",
            rounded: true,
            loadable: true,
            action: handleSave,
        },
    ]), [handleSave]);

    const summaryItems = useMemo(() => ([
        { label: "Perfil", value: accessProfile.roleLabel || "--" },
        { label: "Plano", value: accessProfile.planLabel || "--" },
        { label: "Membro desde", value: formatDate(user?.createdAt || user?.created_at) },
        { label: "Última atualização", value: formatDate(user?.updatedAt || user?.updated_at, true) },
    ]), [accessProfile.planLabel, accessProfile.roleLabel, user]);

    const profile = useMemo(() => ({
        displayName: user?.name || "Usuário SenaPrices",
        email: user?.email || "email@nao-informado.com",
        accountId: user?.code || user?.documentId || user?.id || "--",
    }), [user]);

    useEffect(() => {
        init();
    }, [init]);

    return {
        user,
        formRef,
        formItems,
        loading,
        header,
        actions,
        profile,
        summaryItems,
    };
}

function formatDate(value, includeTime = false) {
    if (!value) return "--";

    const parsed = moment(value);
    if (!parsed.isValid()) return "--";

    return includeTime ? parsed.format("L [às] LT") : parsed.format("L");
}
