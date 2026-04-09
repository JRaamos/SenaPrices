import { useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { DoResetPassword } from "services/authentication.js";
import { getSearchParams } from "services/runtime";
import { exposeStrapiError } from "utils";

export default function useController() {
    const n = useNavigate();
    const location = useLocation();
    const navigate = to => n(`/${to}`);
    const searchParams = useMemo(() => getSearchParams(location.search), [location.search]);
    const [loading, setLoading] = useState(false);

    const formRef = useRef();
    const formItems = [
        { ref: "password", label: "Nova senha", type: "password", required: true, full: true },
        { ref: "cpassword", label: "Confirmar nova senha", type: "password", required: true, full: true, onSubmitEditing: () => action() },
    ];

    const valid = (formdata) => {
        if (formdata?.password !== formdata?.cpassword) {
            toast.error("Nova senha e confirmação da nova senha não são iguais");
            return false;
        }

        return true;
    };

    const action = async () => {
        const form = formRef?.current?.getForm();
        if (!form || !valid(form) || loading) {
            return;
        }

        setLoading(true);

        const result = await DoResetPassword({
            code: searchParams.get("code"),
            password: form?.password,
            passwordConfirmation: form?.cpassword,
        });

        if (result && !exposeStrapiError(result)) {
            completeNext();
        }

        setLoading(false);
    };

    const completeNext = () => {
        toast.success("Senha criada com sucesso");
        navigate("login");
    };

    return {
        formRef,
        formItems,
        loading,
        action,
        navigate,
    };
}
