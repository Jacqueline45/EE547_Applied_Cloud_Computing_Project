import "../App.css";
import React, { useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import {VOTE_QUERY, CREATE_VOTE_MUTATION, UPDATE_VOTE_MUTATION} from '../graphql'; 

const NorthSucks = ({me, displayStatus}) => {
    const [item, setItem] = useState("");
    const { loading, error, data, refetch } = useQuery(VOTE_QUERY);
    const [addVote] = useMutation(CREATE_VOTE_MUTATION);
    const [updateVote] = useMutation(UPDATE_VOTE_MUTATION);
    const addItem =  async (item) => {
        await addVote({
            variables:{
                vote: item,
                creator: me
            }
        });
        await refetch();
    ;}
    const updateItem =  async (item, creator) => {
        await updateVote({
            variables:{
                vote: item,
                creator: creator
            }
        });
        await refetch();
    ;}
    const keyPress = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            if(item.trim()===""){
                displayStatus({
                    type: "error",
                    msg: "Please enter a bei-lan story.",
                });
                return;
            }
            addItem(item);
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
                    placeholder="Your bei-lan story today"
                    onKeyPress={(e) => keyPress(e)}
                />
                <span id="question">Which story do you think is the most bei-lan(北爛)?</span>
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
                                <button className="votebtn" onClick={()=>{updateItem(vote.vote, vote.creator.name)}}>
                                    vote
                                </button>
                                {`${vote.vote}`}
                            </div>
                        );
                    })
                )}
            </div>
        </>
    );
};

export default NorthSucks;