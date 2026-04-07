import React, { useMemo } from "react";

import {
    Badge,
    BadgeRemove,
    BadgePoll,
    BadgeRemoveIcon,
} from "./styled";

export default function DashboardFormSelectPool({
    selected,
    value,
    options,
    items,
    onRemove,
    onChange,
    optionLabelKey,
    optionValueKey,
}){
    const safeOptions = options ?? items ?? []
    const safeOptionLabelKey = optionLabelKey ?? 'title'
    const safeOptionValueKey = optionValueKey ?? 'id'

    const safeRemove = item => {
        if(onRemove && typeof onRemove === 'function'){ onRemove(item) ;}
        if(onChange && typeof onChange === 'function'){
            const nextValue = nextOptions.filter(option => `${option}` !== `${item}`)
            onChange(nextValue)
        }
    }

    const nextOptions = useMemo(() => {
        if (typeof selected?.map === 'function') {
            return selected
        }

        if (typeof value?.map === 'function') {
            return value
        }

        return []
    }, [selected, value])

    return (
        <>
            <BadgePoll>
                {
                    (nextOptions||[])?.map((m, k) =>
                        <Badge key={k}>
                            { safeOptions?.find(f => `${f?.[safeOptionValueKey]}` === `${m}` )?.[safeOptionLabelKey] }
                            <BadgeRemove onClick={() => safeRemove(m)}>
                                <BadgeRemoveIcon />
                            </BadgeRemove>
                        </Badge>
                    )
                }
            </BadgePoll>
        </>
    );
}
