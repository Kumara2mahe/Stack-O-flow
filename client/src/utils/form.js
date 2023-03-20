
// Validate Auth form fields
export const validateForm = (form, { ...opts }) => {
    const inputs = form.querySelectorAll("input" + (opts?.except !== null ? `:not(#${opts?.except})` : ""))
    const submitbtn = form.querySelector(".submit-btn")
    submitbtn.disabled = true
    let validatedFields = 0
    for (let input of inputs) {
        let inputName = getFieldName(input)
        if (input.name === "posttags" || input.name === "watchedtags") {
            if (validateTags(input, submitbtn)) validatedFields++
        }
        else if (input.value === "") {
            generateErrorHint(input, `${inputName} ${opts?.info ? opts?.info : "cannot be empty"}`, submitbtn, opts.showErrorFor)
        }
        else if (opts?.newPwd && input.type === "password" && (input.value.length < 8
            || String(input.value).match("[a-zA-Z]") === null
            || String(input.value).match("[0-9]") === null)) {

            // Validate new password to have atleast ( 8 characters, 1 number, 1 letter )
            generateErrorHint(input, "Please match the below condition to make your password stronger", submitbtn, opts.showErrorFor)
        }
        else if (opts?.minTitleLength && input.value.length < opts?.minTitleLength) {
            generateErrorHint(input, `${inputName} must be at least ${opts?.minTitleLength} characters.`, submitbtn, opts.showErrorFor)
        }
        else validatedFields++
    }
    return validatedFields === inputs.length
}

export const getFieldName = (field) => {
    let fieldName = field.parentElement.querySelector(".box-name")
    if (fieldName === null) {
        fieldName = field.parentElement.parentElement.querySelector(".box-name")
    }
    return fieldName.innerText
}

// Validate tags to lies between limit
export const validateTags = (input, submitbtn = null) => {
    let tags = input.value.trimStart().split(" "), text, isValid = false
    if (input.value === "" || tags.length < minTags) {
        text = `Please enter at least ${minTags} tag; see a list of <a href="/tags">popular tags</a>.`
    }
    else if (tags.length > maxTags) {
        text = `Please enter no more than ${maxTags} tags.`
    }
    else isValid = true
    if (text) generateErrorHint(input, text, submitbtn, 3.5)
    return isValid
}
export const maxTags = 5
const minTags = 1


// Error hint, for empty or invalid form fields
export const generateErrorHint = (sibiling, text, submitbtn, showForSec) => {
    let errHint = sibiling.nextElementSibling?.classList.contains("error-hint") ? sibiling.nextElementSibling : document.createElement("p")
    errHint.classList.add("error-hint")
    errHint.innerHTML = text || "Server Error"
    sibiling.after(errHint)
    sibiling.classList.add("error")
    setTimeout(() => {
        errHint.remove()
        sibiling.classList.remove("error")
        if (submitbtn) submitbtn.disabled = false
    }, showForSec * 1000)
}

export const validateBodyField = (form, submitbtn, { ...opts }) => {
    submitbtn.disabled = true
    let textarea = form.querySelector("textarea")
    if (textarea.value === "") {
        generateErrorHint(textarea, `${getFieldName(textarea)} is missing.`, submitbtn, opts.showErrorFor)
        return false
    }
    else if (opts?.minBodyLength && textarea.value.length < opts?.minBodyLength) {
        let text = `${getFieldName(textarea)} must be at least ${opts?.minBodyLength} characters; you entered ${textarea.value.length}.`
        generateErrorHint(textarea, text, submitbtn, opts.showErrorFor)
        return false
    }
    return !(submitbtn.disabled = false)
}

export const parseErrorResText = (error, defaultMsg) => {
    let errMsg = defaultMsg
    if ((typeof error?.request?.response) === "string" && error?.request?.response !== "") {
        errMsg = JSON.parse(error?.request?.response)
        if (errMsg) errMsg = errMsg.message
    }
    return errMsg
}