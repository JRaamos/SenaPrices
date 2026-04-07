import React from "react";

import {
    FooterActions
} from "./styled";

import { DashboardActions, DashboardActionsItem } from "ui/styled";
import Button from "components/Form/Button";

export default function PageActions({ actions, loading }) {

    return (
        <>
            <FooterActions>
                <DashboardActions between>
                    {
                        !actions?.filter(f => !!f?.left)?.length ? <DashboardActionsItem /> :
                        actions?.filter(f => !!f?.left)?.map(m =>
                            <DashboardActionsItem>
                                <Button rounded={m?.rounded} color={m?.color} outline={m?.outline} loading={m?.loadable && loading} onClick={m?.action}>{m?.label}</Button>
                            </DashboardActionsItem>
                        )
                    }
                    <DashboardActions>
                        {
                            actions?.filter(f => !f?.left)?.map(m =>
                                <DashboardActionsItem>
                                    <Button rounded={m?.rounded} color={m?.color} outline={m?.outline} loading={m?.loadable && loading} onClick={m?.action}>{m?.label}</Button>
                                </DashboardActionsItem>
                            )
                        }
                    </DashboardActions>
                </DashboardActions>
            </FooterActions>
        </>
    );
}