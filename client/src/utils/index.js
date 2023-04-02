
export const pluralise = (number, text) => {
    if (number !== 1) {
        text += "s"
    }
    return `${number.toLocaleString()} ${text}`
}

export const capitialize = (word) => {
    word = String(word).trim().toLowerCase()
    const f_letter = word.slice(0, 1), r_letters = word.slice(1)
    return f_letter.toUpperCase() + r_letters
}

export const scrollToElement = (target, topOffset = 0) => {
    document.documentElement.scrollTop = target?.offsetTop - document.querySelector("header").offsetHeight - topOffset
}

export const toggleSpinnerAnim = (state = "") => {
    let spinnerContainer = document.querySelector("#load-container")
    if (!spinnerContainer) {
        spinnerContainer = document.createElement("section")
        spinnerContainer.id = "load-container"
        document.body.append(spinnerContainer)
    }
    const CLS = "show"
    state = state.toUpperCase()
    if (state === "ON") {
        spinnerContainer.classList.add(CLS)
    }
    else if (state === "OFF") {
        spinnerContainer.classList.remove(CLS)
    }
    else if (state === "") spinnerContainer.classList.toggle(CLS)
}