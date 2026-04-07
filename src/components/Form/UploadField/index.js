import React from "react";

import {
    UploadContent,
    InputRequired,
} from "./styled";

import UploadFile from "../UploadFile"; 
import { isImage, parseStrapiImage } from "utils"; 

export default function UploadField({
    item,
    field,
    formValue,
    getValue,
    changeForm,
    onChange,
    squared,
}) {
    const safeItem = field ?? item
    const safeFormValue = typeof formValue === 'function' ? formValue : getValue
    const safeChangeForm = typeof changeForm === 'function' ? changeForm : onChange
    const currentValue = safeFormValue?.(safeItem?.ref)
    const previewImage = currentValue?.url ? parseStrapiImage(currentValue?.url) : null
    const placeholder = safeItem?.placeholder
    const required = safeItem?.required

    const handleChange = value => {
        safeChangeForm?.(value, safeItem?.ref, safeItem)
    }

    return (
        <>
            <UploadFile value={currentValue} onChange={handleChange}>
                <UploadContent squared={squared} image={previewImage}>
                    {currentValue ? (!isImage(currentValue?.ext) ? currentValue?.name : null) : placeholder}
                    {required && !currentValue ? <InputRequired> * </InputRequired> : null}
                </UploadContent>
            </UploadFile>
        </>
    );
}
