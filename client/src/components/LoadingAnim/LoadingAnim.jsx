import "./loading-anim.css"

const LoadingAnim = ({ dotCount = 3 }) => {
    const delayStart = 2
    let delay = delayStart
    return (
        <div className="loading">Loading
            {Array.from({ length: dotCount }, (_, i) => (
                <span className="dot" key={i} style={{ animationDelay: `${delay++ * 0.1}s` }}>.</span>
            ))}
        </div>
    )
}

export default LoadingAnim