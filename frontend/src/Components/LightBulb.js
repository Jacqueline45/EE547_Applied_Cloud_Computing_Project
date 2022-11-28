import "../App.css";
import React from "react";
import FriendBar from '../Containers/FriendBar';

const LightBulb = () => {
    return (
        <>
            <div className="LB-container">
                <div id="lampadario">
                    <input className="input" type="radio" name="switch" value="on" onkeypress="return false;"/>
                    <input className="input" type="radio" name="switch" value="off" checked="checked" onkeypress="return false;"/>
                    <label className="label" for="switch"></label>
                    <div id="filo"></div>
                    <div id="lampadina">             
                        <div id="sorpresa">
                            <div id="footer">
                                [ON/OFF: Click once/twice] Wanna sleep? Click twice on the bulb to turn the light off! 
                            </div>
                            
                            <div id="shadow">
                                [ON/OFF: Click once/twice] Wanna sleep? Click twice on the bulb to turn the light off!  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LightBulb