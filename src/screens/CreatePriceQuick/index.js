import React from "react";

import ContainerAuthenticated from "containers/Authenticated";
import Input from "components/Form/Input";
import { Icon } from "ui/styled";

import useController from "./controller";

import {
    QuickCreatePage,
    QuickCreateContent,
    QuickCreateHeader,
    QuickCreateHeaderIcon,
    QuickCreateTitle,
    QuickCreateSubtitle,
    QuickCreateCard,
    QuickCreateFiltersHeader,
    QuickCreateTypeLabel,
    QuickCreateTypeTabs,
    QuickCreateTypeButton,
    QuickCreateFiltersGrid,
    QuickCreateFormCore,
    QuickCreateTableCard,
    QuickCreateTableHead,
    QuickCreateTableRow,
    QuickCreateRowNumber,
    QuickCreateRowField,
    QuickCreateRowAction,
    QuickCreateIcon,
    QuickCreateActions,
    QuickCreateActionsGroup,
    QuickCreateActionButton,
    QuickCreateTip,
} from "./styled";
import Core from "components/Form/Core";

export default function DashboardCreatePriceQuick() {
    const {
        title,
        subtitle,
        priceTypes,
        priceType,
        setPriceType,
        filtersFormRef,
        filtersRegister,
        filterFormItems,
        lines,
        updateLine,
        addLine,
        removeLine,
        actionButtons,
        handlePriceSubmit,
        productInputRefs,
        tip,
    } = useController();

    return (
        <ContainerAuthenticated>
            <QuickCreatePage>
                <QuickCreateContent>
                    <QuickCreateHeader>
                        <QuickCreateHeaderIcon>
                            <Icon icon="bolt-blue" nomargin />
                        </QuickCreateHeaderIcon>
                        <div>
                            <QuickCreateTitle>{title}</QuickCreateTitle>
                            <QuickCreateSubtitle>{subtitle}</QuickCreateSubtitle>
                        </div>
                    </QuickCreateHeader>

                    <QuickCreateCard>
                        <QuickCreateFiltersHeader>
                            <QuickCreateTypeLabel>Tipo de Preço:</QuickCreateTypeLabel>

                            <QuickCreateTypeTabs>
                                {priceTypes.map((item) => (
                                    <QuickCreateTypeButton
                                        key={item.id}
                                        type="button"
                                        active={priceType === item.id}
                                        onClick={() => setPriceType(item.id)}
                                    >
                                        {item.label}
                                    </QuickCreateTypeButton>
                                ))}
                            </QuickCreateTypeTabs>
                        </QuickCreateFiltersHeader>

                        <QuickCreateFiltersGrid>
                            <Core
                                ref={filtersFormRef}
                                register={filtersRegister}
                                formItems={filterFormItems}
                                flat
                            />
                        </QuickCreateFiltersGrid>
                    </QuickCreateCard>

                    <QuickCreateTableCard>
                        <QuickCreateTableHead>
                            <div>#</div>
                            <div>Produto</div>
                            <div>Valor (R$)</div>
                            <div />
                        </QuickCreateTableHead>

                        {lines.map((line, index) => (
                            <QuickCreateTableRow key={line.id}>
                                <QuickCreateRowNumber>{index + 1}</QuickCreateRowNumber>

                                <QuickCreateRowField>
                                    <Input
                                        inputRef={(element) => {
                                            productInputRefs.current[line.id] = element;
                                        }}
                                        value={line.product}
                                        onChange={(event) => updateLine(line.id, 'product', event.target.value)}
                                        placeholder="Código ou nome do produto..."
                                        dense
                                        surface="white"
                                    />
                                </QuickCreateRowField>

                                <QuickCreateRowField>
                                    <Input
                                        value={line.price}
                                        onChange={(event) => updateLine(line.id, 'price', event.target.value)}
                                        onSubmitEditing={() => handlePriceSubmit(line.id)}
                                        placeholder="R$ 0,00"
                                        dense
                                        surface="white"
                                    />
                                </QuickCreateRowField>

                                <QuickCreateRowAction type="button" onClick={() => removeLine(line.id)}>
                                    <QuickCreateIcon icon="trash-red" nomargin />
                                </QuickCreateRowAction>
                            </QuickCreateTableRow>
                        ))}
                    </QuickCreateTableCard>

                    <QuickCreateActions>
                        <QuickCreateActionButton type="button" onClick={addLine}>
                            <QuickCreateIcon icon="plus-muted" nomargin />
                            Adicionar linha
                        </QuickCreateActionButton>

                        <QuickCreateActionsGroup>
                            {actionButtons.map((button) => (
                                <QuickCreateActionButton
                                    key={button.id}
                                    type="button"
                                    disabled={button.disabled}
                                    danger={button.danger}
                                    onClick={button.action}
                                >
                                    <QuickCreateIcon icon={button.icon} nomargin />
                                    {button.label}
                                </QuickCreateActionButton>
                            ))}
                        </QuickCreateActionsGroup>
                    </QuickCreateActions>

                    <QuickCreateTip>{tip}</QuickCreateTip>
                </QuickCreateContent>
            </QuickCreatePage>
        </ContainerAuthenticated>
    );
}
