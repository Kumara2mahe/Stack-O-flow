import { Link } from "react-router-dom"
import moment from "moment"

import Tags from "../tags/Tags"
import Avatar from "../avatar/Avatar"
import { pluralise } from "../../utils"

const AllQuestions = ({ questions }) => {
    return (
        <div id="questions">
            {questions.map(ques => (
                <div className="question" key={ques._id}>
                    <div className="stats-content">
                        <span className="votes">{pluralise(ques.votes.count, "vote")}</span>
                        <span>{pluralise(ques.answers.length, "answer")}</span>
                    </div>
                    <div className="post-contents-summary">
                        <h3 className="post-title word-break">
                            <Link to={`/questions/${ques._id}`} className="link word-break">{ques.title}</Link>
                        </h3>
                        <p className="post-summary word-break">{ques.body}</p>
                        <div className="post-meta">
                            <div className="post-meta-tags tags-wrapper">
                                <Tags tagList={ques.tags} />
                            </div>
                            <div className="post-author-details">
                                <Link to={`/users/${ques.by.uUid}`} className="author-info">
                                    <Avatar gradientBg={ques.by.avatar} fontSize="1em" fontWeight="600" padV="0.5rem" padH="0.5rem" borderRadius="0.2em" cursor="pointer">{ques.by.name}</Avatar>
                                    <span className="link">{ques.by.name}</span>
                                </Link>
                                <time className="posted-time">asked {moment(ques.on).fromNow()}</time>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AllQuestions