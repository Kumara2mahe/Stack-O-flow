
export const pluralise = (number, text) => {
    if (number !== 1) {
        text += "s"
    }
    return `${number.toLocaleString()} ${text}`
}

export const scrollToElement = (target, topOffset = 0) => {
    document.documentElement.scrollTop = target?.offsetTop - document.querySelector("header").offsetHeight - topOffset
}

export const toggleSpinnerAnim = () => {
    let spinnerContainer = document.querySelector("#load-container")
    if (!spinnerContainer) {
        spinnerContainer = document.createElement("section")
        spinnerContainer.id = "load-container"
        document.body.append(spinnerContainer)
    }
    spinnerContainer.classList.toggle("show")
}