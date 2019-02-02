export const authKey = "x-auth-token"

export const getAuthToken = () => {
    const key = localStorage.getItem(authKey);
    if (key) return true;
    return false;
}

export const addingAuthKey = (headerKey) => {
    localStorage.setItem(authKey, headerKey);
}
