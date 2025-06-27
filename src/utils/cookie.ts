export function setCookie(name: string, value: string, days: 1) {
    const expires = new Date(Date.now() + days * 86400000);
    document.cookie = `accessToken=${value}; ${expires}; path=/; Secure; SameSite=Strict`;
}

export function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}