export function sanitizeBarcodeDigits(value, limit = 13) {
    return `${value || ""}`.replace(/\D/g, "").slice(0, limit);
}

export function calculateEan13CheckDigit(value) {
    const digits = sanitizeBarcodeDigits(value, 12);

    if (digits.length !== 12) {
        return null;
    }

    const total = digits
        .split("")
        .map(Number)
        .reduce((sum, digit, index) => sum + digit * (index % 2 === 0 ? 1 : 3), 0);

    const remainder = total % 10;
    return `${(10 - remainder) % 10}`;
}

export function validateEan13(value) {
    const digits = sanitizeBarcodeDigits(value, 13);

    if (digits.length !== 13) {
        return false;
    }

    const expectedDigit = calculateEan13CheckDigit(digits.slice(0, 12));

    return expectedDigit !== null && digits[12] === expectedDigit;
}
