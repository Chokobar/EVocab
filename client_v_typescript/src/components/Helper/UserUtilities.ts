export const authKey = "x-auth-token"

export const addingKey = (headerKey: string) => {
    localStorage.setItem(authKey, headerKey);
    const key = checkingLogin()
    if (key) return true;
    return false;
}

export const getToken = () => {
    return localStorage.getItem(authKey);
}

export const checkingLogin = () => {
    const key = localStorage.getItem(authKey);
    if (key) return true;
    return false;
}

export const logOut = () => {
    localStorage.clear();
    return true;
}
