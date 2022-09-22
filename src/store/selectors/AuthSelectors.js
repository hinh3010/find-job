export const isAuthenticated = (state) => {
    if (state.auth.auth.accessToken.token) return true;
    return false;
};
