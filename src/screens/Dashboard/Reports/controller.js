import { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CoreContext } from "context/CoreContext";
import { downloadCSV } from "utils/downloads";

import { REPORT_GUIDELINES, REPORT_PERIOD_OPTIONS } from "./constants";
import { buildOperationalReport, resolveReportsAccess } from "./helpers";

export default function useController() {
    const n = useNavigate();
    const navigate = useCallback((to) => n(`/${to}`), [n]);
    const { user } = useContext(CoreContext);

    const [period, setPeriod] = useState("30d");

    const access = useMemo(() => resolveReportsAccess(user), [user]);
    const report = useMemo(() => buildOperationalReport(period), [period]);

    const handleExport = useCallback(() => {
        downloadCSV(
            report.exportColumns,
            report.exportRows,
            `relatorios-senaprices-${period}.csv`,
        );
    }, [period, report.exportColumns, report.exportRows]);

    const header = useMemo(() => ({
        title: "Relatórios",
        breadcrumbs: [
            { label: "Home", to: "/dashboard" },
            { label: "Gestão" },
            { label: "Relatórios" },
        ],
        actions: access.canAccess ? [
            {
                label: "Histórico",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/history"),
            },
            {
                label: "Promoções",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/promotions"),
            },
            {
                label: "Exportar CSV",
                rounded: true,
                color: "secondary",
                action: handleExport,
            },
        ] : [
            {
                label: "Histórico",
                rounded: true,
                outline: true,
                color: "primary",
                action: () => navigate("dashboard/history"),
            },
            {
                label: "Suporte",
                rounded: true,
                color: "secondary",
                action: () => navigate("dashboard/support"),
            },
        ],
    }), [access.canAccess, handleExport, navigate]);

    const actions = useMemo(() => (
        access.canAccess ? [
            {
                label: "Exportar CSV",
                color: "primary",
                rounded: true,
                action: handleExport,
            },
        ] : []
    ), [access.canAccess, handleExport]);

    return {
        loading: false,
        access,
        header,
        actions,
        period,
        periodOptions: REPORT_PERIOD_OPTIONS,
        report,
        guidelines: REPORT_GUIDELINES,
        setPeriod,
        navigate,
    };
}
