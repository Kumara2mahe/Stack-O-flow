import askquestion from "../../assets/ask-question.svg"
import votes from "../../assets/votes.svg"
import tags from "../../assets/tags.svg"
import reputation from "../../assets/reputation.svg"

const AboutAuth = () => {
    return (
        <section className="about-container">
            <h1 className="heading">Join the Stack O-flow community</h1>
            <div className="feature">
                <img src={askquestion} alt="ask-question" />
                <span className="text">Get unstuck — ask a question</span>
            </div>
            <div className="feature">
                <img src={votes} alt="votes" />
                <span className="text">Unlock new privileges like voting and commenting</span>
            </div>
            <div className="feature">
                <img src={tags} alt="tags" />
                <span className="text">Save your favorite tags, filters, and jobs</span>
            </div>
            <div className="feature">
                <img src={reputation} alt="reputation" />
                <span className="text">Earn reputation and badges</span>
            </div>
            <p className="short-brief">
                Collaborate and share knowledge with a private group for FREE.<br />
                <span className="like-a-link nolink">Get Stack O-flow for Teams free for up to 50 users</span>.
            </p>
        </section>
    )
}

export default AboutAuth