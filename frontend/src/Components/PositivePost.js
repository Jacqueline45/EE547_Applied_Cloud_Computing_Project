import "../App.css";
import React, {useState, useEffect} from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import PostModal from "../Containers/PostModal";
import Draggable from "react-draggable";
import FriendBar from '../Containers/FriendBar';

import {
    ONEMESSAGEBOX_QUERY,
    CREATE_ONEMESSAGE_MUTATION,
    DELETE_ONEMESSAGE_MUTATION,
    ONEMESSAGE_SUBSCRIPTION
  } from '../graphql';

const PositivePost = ({me}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const addPostBox = () => { setModalVisible(true); };
    const [createOneMessage] = useMutation(CREATE_ONEMESSAGE_MUTATION);
    const [deleteOneMessage] = useMutation(DELETE_ONEMESSAGE_MUTATION);
    const { loading, error, data, subscribeToMore } = useQuery(ONEMESSAGEBOX_QUERY, { variables:{ sender: me} });

    const randomAngle = () => {
        const min = -15;
        const max = 15;
        const randang = min + Math.random() * (max - min);
        return randang;
    }

    useEffect(() => {
        try {
          subscribeToMore({
            document: ONEMESSAGE_SUBSCRIPTION,
            variables: {sender: me},
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newMsg = subscriptionData.data.onemessagebox.data;
              return Object.assign({}, prev, {
                onemessageboxes: [...prev.onemessageboxes, newMsg]
              });
            },
          });
        } catch (e) {console.log("subscription problem")}
      }, [subscribeToMore]);

    return (
    <>
        <div id="react-container">
            <div className="board">
                {loading ? (
                    <p>Loading...</p>
                ):error ? (
                    <p>{error}</p>
                ):data.onemessageboxes === null ? (
                    {}
                ):(
                data.onemessageboxes.map((msg, i) => {
                    return(
                        <Draggable key={i} defaultPosition={{ x: 20, y:20 }}>
                            <div className="note" style={{transform: 'rotate(' + randomAngle() + 'deg)'}}>
                                <p>{msg.body}</p>
                                <span>
                                    <button className="btn btn-danger glyphicon glyphicon-trash" 
                                        onClick={async () => {
                                            try{await deleteOneMessage({
                                                variables:{
                                                    _id: msg._id,
                                                    sender: me }
                                                });
                                            } catch(e){console.log("deleteOneMessage error")}
                                        }}> 
                                        remove 
                                    </button>             
                                </span>
                            </div>
                        </Draggable>
                    );})
                )}
                <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                        onClick={()=>addPostBox()}>Add</button>
                <PostModal
                    visible={modalVisible}
                    onCreate={async(text) => {
                                try{await createOneMessage({
                                    variables:{
                                        sender: me,
                                        body: text.name
                                }})
                                } catch(e){console.log("createOneMessage error")}   
                                setModalVisible(false);
                            }}
                    onCancel={() => {setModalVisible(false);}}
                />
            </div>
        </div>
    </>);
};

export default PositivePost