
const Tags = ({ tagList }) => {
    return (
        tagList.map((tag, index) => (
            <p className="tag" key={`${tag}-${index}`}>{tag}</p>
        ))
    )
}

export default Tags