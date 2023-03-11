
export const setUser = () => {
    const profile = window.sessionStorage.getItem("profile")
    return {
        type: "FETCH_USER",
        payload: profile ? JSON.parse(profile) : profile
    }
}