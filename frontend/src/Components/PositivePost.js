import "../App.css";
import React, {useState} from "react";
import Notee from "../Containers/Notee";
import { useQuery, useMutation } from '@apollo/react-hooks';
import PostModal from "../Containers/PostModal";
import {message} from "antd"
import FriendBar from '../Containers/FriendBar';

import {
    ONEMESSAGEBOX_QUERY,
    CREATE_ONEMESSAGE_MUTATION,
    UPDATE_ONEMESSAGE_MUTATION,
  } from '../graphql';

const PositivePost = ({me}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const addPostBox = () => { setModalVisible(true); };
    const [createOneMessage] = useMutation(CREATE_ONEMESSAGE_MUTATION);
    const [updateOneMessage] = useMutation(UPDATE_ONEMESSAGE_MUTATION);
    const { loading, error, data, refetch } = useQuery(ONEMESSAGEBOX_QUERY);
    const [hasPost, setHasPost] = useState(false);

    const randomNumberX = () => {
        const min = 0;
        const max = 1200;
        const randx = min + Math.random() * (max - min);
        return randx;
    }

    const randomNumberY = () => {
        const min = 0;
        const max = 900;
        const randy = min + Math.random() * (max - min);
        return randy;
    }

    const randomAngle = () => {
        const min = -15;
        const max = 15;
        const randang = min + Math.random() * (max - min);
        return randang;
    }

    const check = () => {
        if(!data) return false
        let a = data.onemessageboxes.find(({sender, body}, id) =>
            sender.name === me
        )
        if(!a) return false
        else return true
    }

    return (
    <>
        <body>
            <div id="react-container">
                <div className="board">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    data.onemessageboxes.map(({sender, body}, id) => 
                         <Notee key={sender.name+"_"+id}
                            sender={sender.name}
                            posX={randomNumberX()}
                            posY={randomNumberY()}
                            angle={randomAngle()}
                            note = {body}
                            me = {me}
                            updateOneMessage = {updateOneMessage}
                            refetch={refetch}
                        ></Notee>
                
                ))}
                <button className="btn btn-sm btn-success glyphicon glyphicon-plus"
                        onClick={()=>addPostBox()}
                        disabled={hasPost}>Add</button>
                <PostModal
                    visible={modalVisible}
                    onCreate={async(text) => {
                                console.log(me)
                                if(!check()){
                                    try{await createOneMessage({
                                        variables:{
                                            sender: me,
                                            body: text.name
                                    }})
                                        await refetch();
                                    } catch(e){console.log("createOneMessage error")}   
                                }else{
                                    message.error({ content:"You had posted before." , duration: 1.5 })
                                }
                                setModalVisible(false);
                                setHasPost(true);
                            }}
                    onCancel={() => {
                        setModalVisible(false);
                    }}
                />
                </div>
            </div>
        </body>
    </>);
};

export default PositivePost