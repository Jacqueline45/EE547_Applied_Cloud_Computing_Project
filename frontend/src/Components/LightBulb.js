import "../App.css";
import React from "react";
import FriendBar from '../Containers/FriendBar';

const LightBulb = () => {
    return (
        <>
            <FriendBar/>
            <div className="LB-container">
                <div id="lampadario">
                    <input className="input" type="radio" name="switch" value="on" onkeypress="return false;"/>
                    <input className="input" type="radio" name="switch" value="off" checked="checked" onkeypress="return false;"/>
                    <label className="label" for="switch"></label>
                    <div id="filo"></div>
                    <div id="lampadina">             
                        <div id="sorpresa">
                            <div id="footer">
                                Wanna sleep all the time QQ   Please turn off the light 
                            </div>
                            
                            <div id="shadow">
                                Wanna sleep all the time QQ   Please turn off the light 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LightBulb