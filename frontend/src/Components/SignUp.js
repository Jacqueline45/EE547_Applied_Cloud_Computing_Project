import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {CREATE_USER_MUTATION} from '../graphql';

const SignUp = ({setMe, displayStatus}) => {
    const [createUser] = useMutation(CREATE_USER_MUTATION);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password_c, setPassword_c] = useState("");
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const navigate = useNavigate();
    const addUser =  async (name, password, phone, mail) => {
        return await createUser({
            variables:{
                name: name,
                password: password,
                phone: phone,
                email: mail
            }
        });}
    var phone_digit = document.getElementById('phone-digit');
    var mail_end = document.getElementById('mail-end');
    var mail_at = document.getElementById('mail-at');
    var mail_str = document.getElementById('mail-str');
    var pwd_ltr = document.getElementById('letter');
    var pwd_cap = document.getElementById('capital');
    var pwd_num = document.getElementById('number');
    var pwd_min = document.getElementById('length-min');
    var pwd_max = document.getElementById('length-max');
    return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top"  style={{zIndex: "0"}}>
            <div className="container">
                <Link className="navbar-brand" to={"/sign-in"}>InstaMood</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    Welcome to the Sign-Up page! Please fill out the forms below!
                </div>
            </div>
        </nav>
        <div className="auth-wrapper">
            <div className="auth-inner">
                <div className="grid">
                    <form action="https://httpbin.org/post" method="POST" className="form login">
                        <h4>Personal Information</h4>
                        <div className="form__field">
                            <label htmlFor="login__phone"> 
                                <svg className="icon">
                                    <use href="#icon-phone"></use>
                                </svg>
                            </label>
                            <input autoComplete="phone" id="login__phone" type="text" name="phone" className="form__input" placeholder="Phone number" required 
                                   value={phone}
                                   onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div>
                            <pre>
                                <p id='phone-digit'  className="invalid">   Please type 10 digits (USA format).</p>
                            </pre>
                        </div>
                        <div className="form__field">
                            <label htmlFor="login__mail">
                                <svg className="icon">
                                    <use href="#icon-mail"></use>
                                </svg>
                            </label>
                            <input autoComplete="mail" id="login__mail" type="text" name="mail" className="form__input" placeholder="Email" required 
                                   value={mail}
                                   onChange={(e) => setMail(e.target.value)} />
                        </div>
                        <div id="message">
                            <h6>Email must satisfy:</h6>
                            <pre>
                                <p id="mail-end" className="invalid">   Ending with: .com .edu .org .gov</p>
                                <p id="mail-at" className="invalid">   Containing a @</p>
                                <p id="mail-str" className="invalid">   Minimum 1 alphabet before @</p>
                            </pre>
                        </div>
                    </form>
                </div>
            </div>
            <div className="auth-inner">
                <div className="grid">
                    <form action="https://httpbin.org/post" method="POST" className="form login">
                        <h4>Account Information</h4>
                        <div className="form__field">
                            <label htmlFor="login__username"> 
                                <svg className="icon">
                                    <use href="#icon-user"></use>
                                </svg>
                            </label>
                            <input autoComplete="username" id="login__username" type="text" name="username" className="form__input" placeholder="Username" required 
                                   value={name}
                                   onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form__field">
                            <label htmlFor="login__password">
                                <svg className="icon">
                                    <use href="#icon-lock"></use>
                                </svg>
                            </label>
                            <input id="login__password" type="password" name="password" className="form__input" placeholder="Password" required 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div id="message">
                            <h6>Password must contain the following:</h6>
                            <pre>
                                <p id="letter" className="invalid">   A lowercase letter</p>
                                <p id="capital" className="invalid">   A capital letter</p>
                                <p id="number" className="invalid">   A number</p>
                                <p id="length-min" className="invalid">   Minimum 8 characters</p>
                                <p id="length-max" className="invalid">   Maximum 15 characters</p>
                            </pre>
                        </div>
                        <div className="form__field">
                            <label htmlFor="login__confirmPassword">
                                <svg className="icon">
                                    <use href="#icon-lock"></use>
                                </svg>
                            </label>
                            <input id="login__confirmPassword" type="password" name="password" className="form__input" placeholder="Confirmed Password" required 
                                    value={password_c}
                                    onChange={(e) => setPassword_c(e.target.value)}/>
                        </div>
                        <div className="form__field">
                            <input  type="submit" value="Sign up" 
                                onClick={async (e) => {
                                    e.preventDefault();
                                    if(name.trim()===""){
                                        displayStatus({
                                            type: "error",
                                            msg: "Please enter a name.",
                                        });
                                        return;
                                    }
                                    if((phone.match(/[0-9]/g)).length === 10){
                                        phone_digit.classList.remove("invalid");
                                        phone_digit.classList.add("valid");
                                    }
                                    else{
                                        phone_digit.classList.remove("valid");
                                        phone_digit.classList.add("invalid");
                                        displayStatus({
                                            type: "error",
                                            msg: "Invalid phone number."
                                        });
                                        return;
                                    }
                                    if((mail.slice(-4) === '.com') || (mail.slice(-4) === '.edu' || (mail.slice(-4) === '.org') || (mail.slice(-4) === '.gov'))){
                                        mail_end.classList.remove("invalid");
                                        mail_end.classList.add("valid");
                                    }
                                    else{
                                        mail_end.classList.remove("valid");
                                        mail_end.classList.add("invalid");
                                        displayStatus({
                                            type: "error",
                                            msg: "Email must end with one of the following: .com .edu .org .gov"
                                        });
                                        return;
                                    }
                                    if(mail.includes('@')){
                                        mail_at.classList.remove("invalid");
                                        mail_at.classList.add("valid");
                                    }
                                    else{
                                        mail_at.classList.remove("valid");
                                        mail_at.classList.add("invalid");
                                        displayStatus({
                                            type: "error",
                                            msg: "Email must contain a '@'."
                                        });
                                        return;
                                    }
                                    const at_i = mail.indexOf('@');
                                    if(mail.slice(0,at_i).match(/[A-Za-z]/g)){
                                        mail_str.classList.remove("invalid");
                                        mail_str.classList.add("valid");
                                    }
                                    else{
                                        mail_str.classList.remove("valid");
                                        mail_str.classList.add("invalid");
                                        displayStatus({
                                            type: "error",
                                            msg: "There must be at least one alphabet before '@'."
                                        });
                                        return;
                                    }
                                    if(password.match(/[a-z]/g)){
                                        pwd_ltr.classList.remove("invalid");
                                        pwd_ltr.classList.add("valid");
                                    }
                                    else{
                                        pwd_ltr.classList.remove("valid");
                                        pwd_ltr.classList.add("invalid");
                                        displayStatus({
                                            type: "error",
                                            msg: "Password must contain at least one lowercase letter."
                                        });
                                        return;
                                    }
                                    if(password.match(/[A-Z]/g)){
                                        pwd_cap.classList.remove("invalid");
                                        pwd_cap.classList.add("valid");
                                    }
                                    else{
                                        pwd_cap.classList.remove("valid");
                                        pwd_cap.classList.add("invalid");
                                        displayStatus({
                                            type: "error",
                                            msg: "Password must contain at least one capital letter."
                                        });
                                        return;
                                    }
                                    if(password.match(/[0-9]/g)){
                                        pwd_num.classList.remove("invalid");
                                        pwd_num.classList.add("valid");
                                    }
                                    else{
                                        pwd_num.classList.remove("valid");
                                        pwd_num.classList.add("invalid");
                                        displayStatus({
                                            type: "error",
                                            msg: "Password must contain at least one digit."
                                        });
                                        return;
                                    }
                                    if(password.length>=8){
                                        pwd_min.classList.remove("invalid");
                                        pwd_min.classList.add("valid");
                                    }
                                    else{
                                        pwd_min.classList.remove("valid");
                                        pwd_min.classList.add("invalid");
                                        displayStatus({
                                            type: "error",
                                            msg: "Password length must be at least 8."
                                        });
                                        return;
                                    }
                                    if(password.length<=15){
                                        pwd_max.classList.remove("invalid");
                                        pwd_max.classList.add("valid");
                                    }
                                    else{
                                        pwd_max.classList.remove("valid");
                                        pwd_max.classList.add("invalid");
                                        displayStatus({
                                            type: "error",
                                            msg: "Password length should not exceed 15."
                                        });
                                        return;
                                    }
                                    if(password.trim("") !== password_c.trim("")){
                                        displayStatus({
                                            type: "error",
                                            msg: "Confirmed password is different. Please type again amd make sure.",
                                        });
                                        return;
                                    }
                                    let result = await addUser(name, password, phone, mail);
                                    console.log(["result", result.data.createUser]);
                                    switch(result.data.createUser) {
                                        case "SUCCESS":
                                            setMe(name);
                                            navigate("/mood-choice");
                                            break;
                                        case "USER_EXISTS":
                                            displayStatus({
                                                type: "error",
                                                msg: "That username is taken. Try another. If already registered, please log in.",
                                            });
                                            break;
                                        default: break;
                                    }
                                }}
                            />
                        </div>
                    </form>
                </div>   
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="icons">
                <symbol id="icon-lock" viewBox="0 0 1792 1792">
                    <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
                </symbol>
                <symbol id="icon-user" viewBox="0 0 1792 1792">
                    <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
                </symbol>
            </svg>
            <svg className="svg-icon" viewBox="0 0 1792 1792">
                <symbol id='icon-phone'>
                    <path d="M13.372,1.781H6.628c-0.696,0-1.265,0.569-1.265,1.265v13.91c0,0.695,0.569,1.265,1.265,1.265h6.744c0.695,0,1.265-0.569,1.265-1.265V3.045C14.637,2.35,14.067,1.781,13.372,1.781 M13.794,16.955c0,0.228-0.194,0.421-0.422,0.421H6.628c-0.228,0-0.421-0.193-0.421-0.421v-0.843h7.587V16.955z M13.794,15.269H6.207V4.731h7.587V15.269z M13.794,3.888H6.207V3.045c0-0.228,0.194-0.421,0.421-0.421h6.744c0.228,0,0.422,0.194,0.422,0.421V3.888z"></path>
                </symbol>
                <symbol id='icon-mail'>
                    <path d="M17.388,4.751H2.613c-0.213,0-0.389,0.175-0.389,0.389v9.72c0,0.216,0.175,0.389,0.389,0.389h14.775c0.214,0,0.389-0.173,0.389-0.389v-9.72C17.776,4.926,17.602,4.751,17.388,4.751 M16.448,5.53L10,11.984L3.552,5.53H16.448zM3.002,6.081l3.921,3.925l-3.921,3.925V6.081z M3.56,14.471l3.914-3.916l2.253,2.253c0.153,0.153,0.395,0.153,0.548,0l2.253-2.253l3.913,3.916H3.56z M16.999,13.931l-3.921-3.925l3.921-3.925V13.931z"></path>
                </symbol>
			</svg>
        </div>
    </>
    );
}
export default SignUp;