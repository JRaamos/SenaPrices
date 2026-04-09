import React from "react";

import {
    FooterActions,
    FooterActionsCard,
} from "./styled";

import { DashboardActions, DashboardActionsItem } from "ui/styled";
import Button from "components/Form/Button";

export default function PageActions({ actions, loading }) {

    return (
        <>
            <FooterActions>
                <FooterActionsCard>
                    <DashboardActions between>
                        {
                            !actions?.filter(f => !!f?.left)?.length ? <DashboardActionsItem /> :
                            actions?.filter(f => !!f?.left)?.map((m, idx) =>
                                <DashboardActionsItem key={`left-${idx}`}>
                                    <Button rounded={m?.rounded} color={m?.color} outline={m?.outline} loading={m?.loadable && loading} onClick={m?.action}>{m?.label}</Button>
                                </DashboardActionsItem>
                            )
                        }
                        <DashboardActions>
                            {
                                actions?.filter(f => !f?.left)?.map((m, idx) =>
                                    <DashboardActionsItem key={`right-${idx}`}>
                                        <Button rounded={m?.rounded} color={m?.color} outline={m?.outline} loading={m?.loadable && loading} onClick={m?.action}>{m?.label}</Button>
                                    </DashboardActionsItem>
                                )
                            }
                        </DashboardActions>
                    </DashboardActions>
                </FooterActionsCard>
            </FooterActions>
        </>
    );
}
