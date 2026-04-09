import { useCallback, useContext, useMemo, useState } from "react";

import { CoreContext } from "context/CoreContext";
import { downloadCSV } from "utils/downloads";

import { REPORT_PERIOD_OPTIONS } from "./constants";
import { buildOperationalReport, resolveReportsAccess } from "./helpers";

export default function useController() {
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
                label: "Exportar CSV",
                rounded: true,
                color: "secondary",
                action: handleExport,
            },
        ] : [],
    }), [access.canAccess, handleExport]);

    return {
        loading: false,
        access,
        header,
        actions: [],
        period,
        periodOptions: REPORT_PERIOD_OPTIONS,
        report,
        setPeriod,
    };
}
