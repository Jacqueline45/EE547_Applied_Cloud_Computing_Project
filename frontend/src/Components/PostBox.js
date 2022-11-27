import React, { useState } from "react";

const PostBox = ({me, author, id, content, time, i, displayStatus, updateComment, comments }) => {
    const [commentInput, setCommentInput] = useState("");
    const updateCommentItem =  async (commentInput) => {
        await updateComment({
            variables:{
                type: 6,
                postId: id,
                postAuthor: author,
                body: commentInput,
                author: me
            }
      });}
    return(
        <div className="post-background" key={i}>
            <div className="post-bg-inner">
                <div className="blog-container">
                    <div className="blog-header">
                        <div className="blog-author--no-cover">
                            <div className="headh3-contain">
                                <h3>{author}</h3>
                            </div>
                            <div className="divider"></div>
                        </div>
                    </div>
                    <div className="blog-body">
                        <div className="blog-summary">
                            <p>{content}</p>
                        </div>
                        <div className="divider2"></div>
                    </div>
                    <div className="blog-footer">
                        <div className="utility-info">
                            <div className="spacediv"><span className="licon icon-com"></span><a href="#">{`${comments.length}`}</a></div>
                            <div className="spacediv"><span className="licon icon-dat"></span>{`${time}`}</div>
                        </div> 
                    </div>
                </div>
                <div className="comment-input-btn">
                    <input 
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder="Enter comment..."
                    />
                    <button className="btn2 btn2-primary btn2-block btn2-large"
                        onClick={() => {
                        if(commentInput.trim()===""){
                            displayStatus({
                                type: "error",
                                msg: "Please enter some comments.",
                            });
                        return;
                        }
                        updateCommentItem(commentInput);
                        setCommentInput("");}}>
                            Add 
                    </button>
                </div>
                {comments.map((item, i) => {
                        return (
                            <div className="comments-container">
                                <div className="comment-main-level">
                                    <div className="comment avatar"></div>
                                    <div className="comment-box">
                                        <div className="comment-head">
                                            <h6 className="comment-name by-author">{item.author.name}</h6>
                                            <span>{`${item.time}`}</span>
                                        </div>
                                        <div className="comment-content">
                                            {`${item.body}`}
                                        </div>
                                    </div>
                                </div>
                            </div>);}
                )}
            </div>
        </div>
    );
};
export default PostBox;