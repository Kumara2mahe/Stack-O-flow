import "./showrequesterror.css"

const ShowRequestError = () => {
    return (
        <section id="request-failed-background">
            <div className="error-container">
                <h3 className="error-message">"Something Went Wrong! Try again.</h3>
            </div>
        </section>
    )
}

export const showError = (message) => {
    let error = document.querySelector("#request-failed-background")
    error.querySelector(".error-message").innerHTML = `${message || "Something Went Wrong! Try again."}`
    error.classList.add("show")
    setTimeout(() => {
        error.classList.remove("show")
    }, 2500)
}

export default ShowRequestError