const memoryStorage = new Map();

export function hasWindow() {
    return typeof window !== "undefined";
}

export function hasDocument() {
    return typeof document !== "undefined";
}

export function getRuntimeMode() {
    if (hasWindow() && hasDocument()) {
        return "browser";
    }

    return "headless";
}

export function getSearchParams(search = "") {
    const source = `${search || (hasWindow() ? window.location.search : "") || ""}`;
    const normalized = source.startsWith("?") ? source : `?${source}`;
    return new URLSearchParams(normalized);
}

export function scrollToTop(options = { behavior: "smooth" }) {
    if (!hasWindow() || typeof window.scrollTo !== "function") {
        return;
    }

    window.scrollTo({
        top: 0,
        ...options,
    });
}

export function getElementById(id) {
    if (!hasDocument()) {
        return null;
    }

    return document.getElementById(id);
}

export function setRuntimeTimeout(callback, delay) {
    if (hasWindow() && typeof window.setTimeout === "function") {
        return window.setTimeout(callback, delay);
    }

    return setTimeout(callback, delay);
}

export function clearRuntimeTimeout(timeoutId) {
    if (hasWindow() && typeof window.clearTimeout === "function") {
        window.clearTimeout(timeoutId);
        return;
    }

    clearTimeout(timeoutId);
}

export function readStorageValue(key, fallback = "local") {
    const orderedProviders = fallback === "session"
        ? ["sessionStorage", "localStorage"]
        : ["localStorage", "sessionStorage"];

    for (const providerName of orderedProviders) {
        const provider = getStorageProvider(providerName);
        if (!provider) {
            continue;
        }

        try {
            const value = provider.getItem(key);
            if (value !== null && value !== undefined) {
                return value;
            }
        } catch (error) {
            continue;
        }
    }

    return memoryStorage.has(key) ? memoryStorage.get(key) : null;
}

export function writeStorageValue(key, value, fallback = "local") {
    const orderedProviders = fallback === "session"
        ? ["sessionStorage", "localStorage"]
        : ["localStorage", "sessionStorage"];

    for (const providerName of orderedProviders) {
        const provider = getStorageProvider(providerName);
        if (!provider) {
            continue;
        }

        try {
            provider.setItem(key, value);
            return true;
        } catch (error) {
            continue;
        }
    }

    memoryStorage.set(key, value);
    return true;
}

function getStorageProvider(providerName) {
    if (!hasWindow()) {
        return null;
    }

    return window?.[providerName] || null;
}
