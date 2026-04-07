import React from "react";

import { DashboardActions, DashboardActionsItem } from "ui/styled";
import { RowTableSearch, SearchTab, SearchTabs } from "./styled";

import Input from "components/Form/Input";
import Button from "components/Form/Button";

export default function TableHeader({
    tabs,
    currentTab,
    setCurrentTab,
    searchExpression,
    setSearchExpression,
    query,
    setQuery,
    onSearchChange,
    isActive,
    setIsActive,
    filtersOpen,
    setFiltersOpen,
    onToggleFilters,
    filterLabel,
    searchLabel
}) {
    const safeSearchExpression = typeof searchExpression === 'undefined' ? query : searchExpression
    const safeSetSearchExpression = typeof setSearchExpression === 'function'
        ? setSearchExpression
        : typeof setQuery === 'function'
            ? setQuery
            : onSearchChange
    const safeIsActive = typeof isActive === 'boolean' ? isActive : !!filtersOpen
    const safeSetIsActive = typeof setIsActive === 'function'
        ? setIsActive
        : typeof setFiltersOpen === 'function'
            ? setFiltersOpen
            : typeof onToggleFilters === 'function'
                ? (nextValue) => onToggleFilters(nextValue)
                : undefined

    return (
        <>
            <RowTableSearch toend={!tabs}>
                {
                    !tabs ? null :
                    <SearchTabs>
                        {
                            tabs?.map( (m, k) =>
                                <SearchTab key={m?.id || k} active={currentTab === k} onClick={() => setCurrentTab?.(k)}>{ m?.title }</SearchTab>
                            )
                        }
                    </SearchTabs>
                }
                <DashboardActions>
                    <div>
                        {
                            typeof safeSetSearchExpression === 'function' ?
                                <DashboardActionsItem big>
                                    <Input placeholder={searchLabel || "Pesquisar"} search value={safeSearchExpression} onChange={e => safeSetSearchExpression(e?.target?.value ?? e)} onChangeText={value => safeSetSearchExpression(value)} />
                                </DashboardActionsItem>
                            : null
                        }
                    </div>
                    <div>
                        {
                            typeof safeSetIsActive === 'function'  ?
                                <DashboardActionsItem>
                                    <Button color="grey" small nospace onClick={() => safeSetIsActive(!safeIsActive)} onPress={() => safeSetIsActive(!safeIsActive)}>{ filterLabel || "Filtros" }</Button>
                                </DashboardActionsItem>
                            : null
                        }
                    </div>
                </DashboardActions>
            </RowTableSearch>
        </>
    );
}
