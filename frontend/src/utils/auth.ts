export const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;

    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return Date.now() >= (payload.exp * 1000 - 5000);
    } catch (error) {
        console.error('Token parsing error:', error);
        return true;
    }
};