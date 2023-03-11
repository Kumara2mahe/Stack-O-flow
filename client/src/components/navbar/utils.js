export const smallScreenPx = 640
export const opCL = "opened", shCL = "show"

export const toggleSideNavbar = (reset = false) => {
    const hamMenu = document.querySelector("#main-navbar .nav-link.menu-btn")
    const sideNavbar = document.querySelector("#side-navbar")
    if (reset || hamMenu?.classList.contains(opCL)) {
        sideNavbar?.classList.remove(shCL)
        hamMenu?.classList.remove(opCL)
    }
    else {
        hamMenu?.classList.add(opCL)
        sideNavbar?.classList.add(shCL)
    }
}

export const toggleSearchBar = (e) => {
    const searchContainer = e.target.parentElement
    searchContainer.classList.toggle("show")
    searchContainer.querySelector(".search-bar input").focus()
}