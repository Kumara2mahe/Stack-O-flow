import SideNavbar from "../../components/sidenavbar/SideNavbar"
import TAGSDATA from "../../components/tags/data.json"
import "./tags.css"

const Tags = () => {
    document.title = "Tags - Stack O-flow"
    return (
        <article id="main-contents" className="wrapper">
            <SideNavbar />
            <section className="main-container" id="tag-contents">
                <h1 className="title">Tags</h1>
                <p className="sub-title">A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
                <div id="all-tags-list">
                    {
                        TAGSDATA.tags.map((tag, index) => (
                            <div className="tag-card" key={`${tag.name}-${index}`}>
                                <p className="tag">{tag.name}</p>
                                <p className="description">{tag.description}</p>
                            </div>
                        ))
                    }
                </div>
            </section>
        </article>
    )
}

export default Tags