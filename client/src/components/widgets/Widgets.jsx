import Tags from "../tags/Tags"
import pen from "../../assets/pen.svg"
import TAGSDATA from "../tags/data.json"
import "./widgets.css"

const Widgets = () => {
    let tags = []
    TAGSDATA.tags.forEach(tag => {
        tags.push(tag.name)
    })
    return (
        <aside id="widgets-bar">
            <div className="widget container-1">
                <h4 className="title">The Overflow Blog</h4>
                <div className="widget-item">
                    <div className="icon">
                        <img src={pen} alt="pen" />
                    </div>
                    <p>How edge functions move your back end close to your front end</p>
                </div>
                <div className="widget-item">
                    <div className="icon">
                        <img src={pen} alt="pen" />
                    </div>
                    <p>ML and AI consulting-as-a-service (Ep. 541)</p>
                </div>
                <h4 className="title">Featured on Meta</h4>
                <div className="widget-item">
                    <div className="icon meta-stack exchange"></div>
                    <p>Ticket smash for [status-review] tag: Part Deux</p>
                </div>
                <div className="widget-item">
                    <div className="icon meta-stack exchange"></div>
                    <p>We've added a "Necessary cookies only" option to the cookie consent popup</p>
                </div>
                <div className="widget-item">
                    <div className="icon meta-stack overflow"></div>
                    <p>The [amazon] tag is being burninated</p>
                </div>
                <div className="widget-item">
                    <div className="icon meta-stack overflow"></div>
                    <p>Temporary policy: ChatGPT is banned </p>
                </div>
                <div className="widget-item">
                    <div className="icon meta-stack overflow"></div>
                    <p>Microsoft Azure Collective launch and proposed tag changes</p>
                </div>
                <h4 className="title">Hot Meta Posts</h4>
                <div className="widget-item">
                    <p>35</p>
                    <p>How edge functions move your back end close to your front end</p>
                </div>
                <div className="widget-item">
                    <p>18</p>
                    <p>How edge functions move your back end close to your front end</p>
                </div>
            </div>

            <div className="widget container-2">
                <h4 className="title">Popular Tags</h4>
                <div className="tags-wrapper" id="popular-tags">
                    <Tags tagList={tags} />
                </div>
            </div>
        </aside>
    )
}

export default Widgets