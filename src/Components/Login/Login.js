import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import { useHistory, useLocation } from "react-router";
import './Login.css'

const Login = () => {
    const [loggedinuser, setLoggedinuser] = useContext(UserContext);
    const [user,setUser]=useState({email: "", password: "",error:"",success:"",isSignin:false});

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    
    const validityhandler = (e) => {
        let isvalid = false;
        if (e.target.name === "email") {

            const rexe = /\S+@\S+\.\S+/;
            isvalid = rexe.test(e.target.value);

        }
        else if (e.target.name === "password") {
            isvalid=true;
        }

        if (isvalid === true) {
            const newuser = { ...user };
            newuser[e.target.name] = e.target.value;
            setUser(newuser);
        }
    }

    const loginhandler=(e)=>{
        console.log("user email",user["email"]);
        
        firebase.auth().signInWithEmailAndPassword(user["email"], user["password"])
                .then(res => {
                    const newuserinfo = { ...user };
                    newuserinfo.name = res.user.displayName;
                    newuserinfo.error = "";
                    newuserinfo.success = "User Sign in sucessfully";
                    newuserinfo.isSignin = true;
                    setUser(newuserinfo);
                    setLoggedinuser(newuserinfo);
                    history.replace(from);
                    console.log(res.user);

                })
                .catch((error) => {
                    var errorMessage = error.message;
                    console.log("Error message",errorMessage);
                    const newuserinfo = { ...user };
                    newuserinfo.name = "";
                    newuserinfo.email = "";
                    newuserinfo.password = "";
                    newuserinfo.error = errorMessage;
                    newuserinfo.success = "";
                    newuserinfo.isSignin = false;
                    setUser(newuserinfo);
                });

                e.preventDefault();
        }

        
    return (

        <div className="Loginpage">
            <div className="logincard">
                <input type="email" placeholder="email" name="email" onBlur={validityhandler}/>
                <br />
                <br />
                <input type="password" name="password" placeholder="password" onBlur={validityhandler}/>
                <br />
                <br />

                <div className="rf">


                    <div class="form-check" style={{ display: 'flex', alignItems: 'center' }}>
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                        <label class="form-check-label" for="flexCheckChecked">Remember me</label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div>Forget passroword</div>
                    </div>


                </div>

                <button className="loginbutton mt-3" onClick={loginhandler}>Login</button>

                <p>Don't have an account?<Link to="/register" className="registration">Create an account</Link></p>
            </div>

        </div>


    );
};

export default Login;