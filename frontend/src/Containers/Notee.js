import "../App.css";
import React, {useState} from "react";

const Notee = ({sender, posX, posY, angle, note, me, updateOneMessage, refetch}) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(note);
    const edit = () => {
        setEditing(true);
    }

    const save = async() => {
        //setText(newText);
        setEditing(false);
        try{await updateOneMessage({
            variables:{
                sender: me,
                body: text
            }});
            await refetch();
        } catch(e){console.log("updateOneMessage error")}
    }

    return (
        <div key={sender}>
            {(editing)?  
            (<div className="note" style={{right: posX + 'px',
                                            top: posY + 'px',
                                            transform: 'rotate(' + angle + 'deg)'}}>
                <textarea  defaultValue={text} className="form-control" onChange={(e)=>{setText(e.target.value)}}></textarea>
                <button onClick={()=>save()} className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"> save </button>
            </div>)
            : 
            (me === sender)?
            (<div className="note" style={{right: posX + 'px',
                                            top: posY + 'px',
                                            transform: 'rotate(' + angle + 'deg)'}}>
                <p style={{margin:'3px', fontSize: '20px', display:'flex'}}>From: {sender}</p>
                <p>{text}</p>
                <span>
                    {/* <button onClick={()=>{remove()}}
                        className="btn btn-danger glyphicon glyphicon-trash"> remove </button> */}
                    <button onClick={()=>edit()}
                            className="btn btn-primary glyphicon glyphicon-pencil"> edit </button>               
                </span>
                {/* <Tag color="blue">{sender}</Tag> */}
            </div>)
            :
            (<div className="note" style={{right: posX + 'px',
                                            top: posY + 'px',
                                            transform: 'rotate(' + angle + 'deg)'}}>
                <p style={{margin:'3px', fontSize: '20px', display:'flex'}}>From: {sender}</p>
                <p>{text}</p>
                          
                {/* <Tag color="blue">{sender}</Tag> */}
                
            </div>)
            }
        </div>
        
    );
};

export default Notee