
const RenderBodyContent = ({ contents }) => {
    const newLineSegments = contents?.split("\n")
    let tabSegments
    return (
        newLineSegments?.map((line, index) => (
            line.includes("    ")
                ? <p key={index}>
                    {
                        (tabSegments = line.split("    ")).map((tab, index1) => (
                            index1 < (tabSegments.length - 1)
                                ? <span key={index + index1}>{tab}<i className="tab-space"></i></span>
                                : tab
                        ))
                    }
                </p>
                : <p key={index}>{line}</p>
        ))
    )
}

export default RenderBodyContent