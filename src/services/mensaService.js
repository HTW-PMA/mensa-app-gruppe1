const apiUrl = 'https://mensa.gregorflachs.de/api/v1/canteen';
const apiKey = 'EjGTzhCqu7TbBUwpN2x4H7YIRf5LIepS28Uc+Pn2k8IBkc05wDI6F+ZQbA13f67qSlENe8AU3UqL5Zzck+rERaYxrXKqISZQ6ut9/KIgGJoHs1VMlNvp0DfvWa69WzXyvdEEtTUN/3tsfxeGDG//UmzHTps9DnYKemomcgwGEPx+4U/dbv4L/QeHoTph8dLISK9ipWP2By5SjFKPreZoAJWuOy/6+u5uF23irGt5wBVZCFsdrvJUiIN72QURoF6aR9dzT+a8g1i9w9cFnTFxTtewRtm4lFY2ME/nmMIHKkchUuqfT0bNsxZL2dPfIo1E3ahzuNctbqUfdBBv1lslYw==';
export async function fetchMensaById(apiKey, id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        headers: {
            'X-API-KEY': apiKey,
        },
    });
    if (!response.ok) {
        throw new Error('API-Anfrage fehlgeschlagen');
    }
    const data = await response.json();
    return data;
}
export async function fetchMensas() {
    const response = await fetch(apiUrl, {
        headers: {
            'X-API-KEY': apiKey,
        },
    });
    if (!response.ok) {
        throw new Error('API request failed');
    }
    const data = await response.json();
    return data;
}
//# sourceMappingURL=mensaService.js.map