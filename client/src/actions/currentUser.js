
export const setUser = () => {
    const profile = window.localStorage.getItem("sof-profile")
    return {
        type: "FETCH_USER",
        payload: profile ? JSON.parse(profile) : profile
    }
}