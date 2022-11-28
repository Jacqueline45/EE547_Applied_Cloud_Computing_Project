import "../App.css";
import React, {useState, useEffect} from "react";
import Draggable from "react-draggable";
import { useQuery, useMutation } from '@apollo/react-hooks';
import {POST_QUERY, CREATE_POST_MUTATION, DELETE_POST_MUTATION, POST_SUBSCRIPTION} from '../graphql';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
var randomColor = require("randomcolor");

const TimeRecord = ({me, displayStatus}) => {
    const [itemInput, setItemInput] = useState("");
    const { loading, error, data, subscribeToMore } = useQuery(
        POST_QUERY, 
        { variables:{ type: 4, author: me} },
        { fetchPolicy: 'cache-and-network'} );
    const [addPost] = useMutation(CREATE_POST_MUTATION);
    const [deletePost] = useMutation(DELETE_POST_MUTATION);
    useEffect(() => {
        try {
          subscribeToMore({
            document: POST_SUBSCRIPTION,
            variables: {type: 4, author: me},
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newPost = subscriptionData.data.post.data;
              return Object.assign({}, prev, {
                posts: [...prev.posts, newPost]
              });
            },
          });
        } catch (e) {console.log("subscription problem")}
      }, [subscribeToMore]);
    const addItem =  async (itemInput) => {
        await addPost({
            variables:{
                type: 4,
                body: itemInput,
                author: me
            }});
    }
    const keyPress = async (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            if(itemInput.trim()===""){
                displayStatus({
                    type: "error",
                    msg: "Please enter an item.",
                });
                return;
            }
            addItem(itemInput);
            setItemInput("");
        }
    }
    return (
        <>
            <div className="TR-Container">
                <div className="TR-Container-2">
                <div className="Input-Bar">
                    <input
                        className="context-input"
                        value={itemInput}
                        onChange={(e) => setItemInput(e.target.value)}
                        placeholder="What your are doing"
                        onKeyPress={(e) => keyPress(e)}
                    />
                    <div className="space3"></div>
                    <button className="btn1 btn1-primary btn1-block btn1-large"
                        onClick={async () => {
                            if(itemInput.trim()===""){
                                displayStatus({
                                    type: "error",
                                    msg: "Please enter an item.",
                                });
                                return;
                            }
                            addItem(itemInput);
                            setItemInput("");
                        }}>
                        Enter
                    </button>
                </div>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ): error ? (
                    <p>{error}</p>
                ):  data.posts === null ? (
                    {}
                ):(
                    data.posts.map((post, i)=> {
                        return (
                            <Draggable
                                key={i}
                                defaultPosition={{ x: 0, y:0 }}>
                                <div style={{ backgroundColor: randomColor({luminosity: "bright"})}} className="box">
                                    {`[${post.time.substring(11,13)}`}:{`${post.time.substring(14,16)}]`} {`${post.body}`}
                                    <button id="delete" className="btn-cross"
                                        onClick={async () => {
                                            await deletePost({
                                                variables:{
                                                    type: 4,
                                                    _id: post._id,
                                                    author: me
                                                }
                                            });
                                        }}>X
                                    </button>
                                </div>
                            </Draggable>
                        );}
                ))}
            </div>
        </>
    );
};

export default TimeRecord;