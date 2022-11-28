import "../App.css";
import PostBox from "./PostBox";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import {POST_QUERY, CREATE_POST_MUTATION, POST_SUBSCRIPTION6, CREATE_COMMENT_MUTATION} from '../graphql';
import FriendBar from '../Containers/FriendBar';

const PostShare = ({ me, displayStatus }) => {
  const [contextInput, setContextInput] = useState("");
  const { loading, error, data, subscribeToMore } = useQuery(POST_QUERY, { variables:{ type: 6 } });
  const [updatePost] = useMutation(CREATE_POST_MUTATION);
  const [updateComment] = useMutation(CREATE_COMMENT_MUTATION);
  useEffect(() => {
    try {
      subscribeToMore({
        document: POST_SUBSCRIPTION6,
        variables: {},
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newPost = subscriptionData.data.post6.data;
          return Object.assign({}, prev, {
            posts: [newPost, ...prev.posts]
          });
        },
      });
    } catch (e) {console.log("subscription problem");}
  }, [subscribeToMore]);
  const updateItem =  async (contextInput) => {
    await updatePost({
        variables:{
            type: 6,
            body: contextInput,
            author: me
        }
    });}
  return (
    <>  <div className="App-messages">
          <div className="post-input-inner">
            <textarea className="contextt-input"
                value={contextInput} 
                onChange={(e) =>setContextInput(e.target.value)}
                placeholder="Enter context..."
            />
            <button className="btn3 btn3-primary btn3-block btn3-large"
                onClick={() => {
                  if(contextInput.trim()===""){
                      displayStatus({
                          type: "error",
                          msg: "Please enter something to share.",
                      });
                      return;
                  }
                  updateItem(contextInput);
                  setContextInput("");
                }}>
                    Post
            </button>
          </div>
            <div>
                {loading ? (
                    <p>Loading...</p>
                ): error ? (
                    <p>{error}</p>
                ):  data.posts === null ? (
                    {}
                ):(
                    data.posts.map((post, i) => 
                        <PostBox me={me} author={post.author.name} id={post._id} content={post.body} time={post.time} key={i} 
                                    displayStatus={displayStatus} updateComment={updateComment} comments={post.comments}/>)
                )}
            </div>
        </div>
    </>);
};
export default PostShare;