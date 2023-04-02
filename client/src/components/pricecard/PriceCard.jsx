import "./pricecard.css"

const PriceCard = ({ type, activePlan, name, price, symbol, benefits, btnLabel, onClick }) => {
    const isPlanSame = activePlan === name.toLowerCase()
    const classNames = `plan ${type}` + (isPlanSame ? " active" : "")
    if (isPlanSame && btnLabel !== "Continue") {
        btnLabel = "Continue"
    }
    else if (!isPlanSame && btnLabel === "Continue") {
        btnLabel = "Activate"
    }
    return (
        <div className={classNames}>
            <div className="active-badge"></div>
            <div className="plan-header">
                <h3 className="plan-title">{name}</h3>
                <h2 className="plan-price">{symbol}{price}</h2>
                <p>per month</p>
            </div>
            <div className="plan-details">
                {benefits.map(benefit => (
                    <p className="benefit" key={benefit}>{benefit}</p>
                ))}
            </div>
            <div className="plan-confirmation">
                <button className="so-btn" id={type} onClick={onClick} type="button">{btnLabel}</button>
            </div>
        </div>
    )
}
export default PriceCard