import "../App.css";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import {VOTE_QUERY, CREATE_VOTE_MUTATION, UPDATE_VOTE_MUTATION, DELETE_VOTE_MUTATION, VOTE_SUBSCRIPTIONS} from '../graphql'; 

const Damn = ({me, displayStatus}) => {
    const [item, setItem] = useState("");
    const { loading, error, data, subscribeToMore } = useQuery(VOTE_QUERY, { variables:{} });
    const [addVote] = useMutation(CREATE_VOTE_MUTATION);
    const [updateVote] = useMutation(UPDATE_VOTE_MUTATION);
    const [deleteVote] = useMutation(DELETE_VOTE_MUTATION);
    useEffect(() => {
        try {
          subscribeToMore({
            document: VOTE_SUBSCRIPTIONS,
            variables: {},
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newVote = subscriptionData.data.vote.data;
              return Object.assign({}, prev, {
                votes: [...prev.votes, newVote]
              });
            },
          });
        } catch (e) {console.log("subscription problem");}
      }, [subscribeToMore]);

    const updateItem =  async (item, creator) => {
        await updateVote({
            variables:{
                vote: item,
                creator: creator
            }
        });
    ;}
    const keyPress = async (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            if(item.trim()===""){
                displayStatus({
                    type: "error",
                    msg: "Please enter a story that sucks.",
                });
                return;
            }
            await addVote({variables:{vote: item, creator: me}});
            setItem("");
        }
    }
    return (
        <>
            <div id="containerNS">
                <input
                    className="context-input beilan-input"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Your story that sucks."
                    onKeyPress={(e) => keyPress(e)}
                />
                <span id="question">Which story do you think that distastefully sucks the most?</span>
                {loading ? (
                    <p>Loading...</p>
                ): error ? (
                    <p>{error}</p>
                ):  data.votes === null ? (
                    {}
                ):(
                    data.votes.map((vote,i) => {
                        return (
                            <div key={i} style={{ width: 530+10*vote.count + "px" }} className="VoteBar" >
                                <span>{`${vote.count}`}</span>
                                <button className="votebtn" onClick={()=>{updateItem(vote.vote, vote.creator.name)}}>vote</button>
                                <button className="removebtn" onClick={async () => {
                                            await deleteVote({
                                                variables:{
                                                    _id: vote._id,
                                                    creator: me
                                                }
                                            });
                                        }} disabled={vote.creator.name !== me}>X</button>
                                {`${vote.vote}`}
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default Damn;