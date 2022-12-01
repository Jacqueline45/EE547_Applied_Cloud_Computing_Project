import "../App.css";
import React, {useState, useEffect} from "react";
import Draggable from "react-draggable";
import { useQuery, useMutation } from '@apollo/react-hooks';
import {DUE_QUERY, CREATE_DUE_MUTATION, DELETE_DUE_MUTATION, DUE_SUBSCRIPTION} from '../graphql';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
var randomColor = require("randomcolor");

const TimeRecord = ({me, displayStatus}) => {
    const [itemInput, setItemInput] = useState("");
    const [dueInput, setDueInput] = useState("");
    const { loading, error, data, subscribeToMore } = useQuery(DUE_QUERY, { variables:{ author: me} });
    const [addDue] = useMutation(CREATE_DUE_MUTATION);
    const [deleteDue] = useMutation(DELETE_DUE_MUTATION);
    useEffect(() => {
        try {
          subscribeToMore({
            document: DUE_SUBSCRIPTION,
            variables: {author: me},
            updateQuery: (prev, { subscriptionData }) => {
            console.log(["data=", data]);
              if (!subscriptionData.data) return prev;
              const newDue = subscriptionData.data.due.data;
              return Object.assign({}, prev, {
                dues: [...prev.dues, newDue]
              });
            },
          });
        } catch (e) {console.log("subscription problem")}
      }, [subscribeToMore]);
    const addItem =  async (itemInput, dueInput) => {
        await addDue({
            variables:{
                due: dueInput,
                body: itemInput,
                author: me
            }});
    }
    const keyPress = (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            if(itemInput.trim()===""){
                displayStatus({
                    type: "error",
                    msg: "Please enter an undone task.",
                });
                return;
            }
            if(dueInput.trim()===""){
                displayStatus({
                    type: "error",
                    msg: "Please enter the due time for the task.",
                });
                return;
            }
            addItem(itemInput, dueInput);
            setItemInput("");
            setDueInput("");
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
                        placeholder="Any deadlines?"
                        onKeyPress={(e) => keyPress(e)}
                    />
                    <input
                        className="context-input"
                        value={dueInput}
                        onChange={(e) => setDueInput(e.target.value)}
                        placeholder="When is it due?"
                        onKeyPress={(e) => keyPress(e)}
                    />
                    <button className="btn1 btn1-primary btn1-block btn1-large"
                        onClick={() => {
                            if(itemInput.trim()===""){
                                displayStatus({
                                    type: "error",
                                    msg: "Please enter an undone task.",
                                });
                                return;
                            }
                            if(dueInput.trim()===""){
                                displayStatus({
                                    type: "error",
                                    msg: "Please enter the due time for the task.",
                                });
                                return;
                            }
                            addItem(itemInput, dueInput);
                            setItemInput("");
                            setDueInput("");
                        }}>
                        Enter
                    </button>
                </div>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ): error ? (
                    <p>{error}</p>
                ):  data.dues === null ? (
                    {}
                ):(
                    data.dues.map((due, i)=> {
                        return (
                            <Draggable
                                key={i}
                                defaultPosition={{ x: 0, y:0 }}>
                                <div style={{ backgroundColor: randomColor({luminosity: "bright"})}} className="box">
                                    {`${due.body}`}{` [Due : ${due.due}]`} 
                                    <button id="delete" className="btn-cross"
                                        onClick={async () => {
                                            await deleteDue({
                                                variables:{
                                                    _id: due._id,
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