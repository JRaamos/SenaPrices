import { useContext, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { CoreContext } from "context/CoreContext";
import { DoLogin, DoRegister } from "services/authentication";
import { getSearchParams } from "services/runtime";
import { UpdateMe } from "services/me";
import { exposeStrapiError } from "utils";

const PLAN_LABELS = {
    essencial: "Essencial",
    profissional: "Profissional",
    personalizado: "Personalizado",
};

const BILLING_LABELS = {
    monthly: "Mensal",
    annual: "Anual",
};

export default function useController() {
    const n = useNavigate();
    const location = useLocation();
    const navigate = to => n(to.startsWith("/") ? to : `/${to}`);

    const [loading, setLoading] = useState(false);
    const { reloadMe } = useContext(CoreContext);

    const searchParams = useMemo(() => getSearchParams(location.search), [location.search]);
    const selectedPlan = useMemo(() => {
        const candidate = `${searchParams.get("plan") || ""}`.trim().toLowerCase();
        return PLAN_LABELS[candidate] ? candidate : "";
    }, [searchParams]);
    const selectedBilling = useMemo(() => {
        const candidate = `${searchParams.get("billing") || ""}`.trim().toLowerCase();
        return BILLING_LABELS[candidate] ? candidate : "";
    }, [searchParams]);

    const formRef = useRef();
    const formItems = [
        { ref: "name", label: "Nome", required: true, full: true },
        { ref: "email", label: "E-mail", required: true, full: true },
        { ref: "password", label: "Senha", type: "password", required: true, full: true, onSubmitEditing: () => action() },
    ];

    const action = async () => {
        const form = formRef?.current?.getForm();
        if (!form || loading) {
            return;
        }

        setLoading(true);

        const payload = {
            username: form.email?.replace(/ /g, ""),
            email: form.email?.replace(/ /g, ""),
            password: form.password,
        };

        const result = await DoRegister(payload);

        if (result && !exposeStrapiError(result)) {
            await makeAuth(payload);

            await UpdateMe({
                name: form?.name,
            });

            afterLogin();
        }

        setLoading(false);
    };

    const makeAuth = async (payload) => {
        const result = await DoLogin({ ...payload, identifier: payload?.email });
        if (result && !exposeStrapiError(result)) {
            await reloadMe();
        }
    };

    const afterLogin = () => {
        toast.success("Conta criada com sucesso");
        navigate("/login");
    };

    return {
        formRef,
        formItems,
        loading,
        action,
        navigate,
        planLabel: selectedPlan ? PLAN_LABELS[selectedPlan] : "",
        billingLabel: selectedBilling ? BILLING_LABELS[selectedBilling] : "",
        goCheckout: () => navigate(selectedPlan ? `/checkout?plan=${selectedPlan}${selectedBilling ? `&billing=${selectedBilling}` : ""}` : "/checkout"),
    };
}
