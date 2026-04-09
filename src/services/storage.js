import * as CryptoJS from "crypto-js";

import { readStorageValue, writeStorageValue } from "./runtime";

export const storageKey = "SenaPrices";

export const SaveObject = (key, value) => SaveStorage(key, JSON.stringify(value));

export const ReadObject = (key) => {
    const value = ReadStorage(key);
    return value ? JSON.parse(value) : false;
};

const Crypt = (value) => CryptoJS.AES.encrypt(value, storageKey).toString();

const Decrypt = (cvalue) => {
    const bytes = CryptoJS.AES.decrypt(cvalue, storageKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export const SaveStorage = (key, value) => {
    const cvalue = Crypt(value);
    return writeStorageValue(`${storageKey}::${key}`, cvalue, "local");
};

export const ReadStorage = (key) => {
    const cvalue = readStorageValue(`${storageKey}::${key}`, "local");
    if (cvalue !== "" && cvalue !== null && cvalue !== false) {
        return Decrypt(cvalue);
    }

    return false;
};
