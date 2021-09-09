import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/fontawesome-free-solid'
import { initializeApp } from 'firebase/app';

import GoogleButton from 'react-google-button'
import './Register.css'

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}



const Register = () => {
    const [loggedinuser, setLoggedinuser] = useContext(UserContext);

    const [user, setUser] = useState({ name: "", email: "", password: "" });

    const [pass1, setPass1] = useState(false);
    const [password, setPassword] = useState();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const Registerhere = () => {
        if(user["email"] && user["password"])
        {
            firebase.auth().createUserWithEmailAndPassword(user["email"], user["password"])
                .then(res => {
                    console.log("After user",user);
                    const newuserinfo = { ...user };
                    updateuser(newuserinfo);
                    newuserinfo.name = ""
                    newuserinfo.email = ""
                    newuserinfo.password = ""
                    setUser(newuserinfo);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    const newuserinfo = { ...user };
                    newuserinfo.name = "";
                    newuserinfo.email = "";
                    newuserinfo.password = "";
                    setUser(newuserinfo);
                });
        }
    }
    const validityhandler = (e) => {
        let isvalid = false;
        if (e.target.name === "name") {

            if (e.target.name.length > 0) {
                isvalid = true;
            }

        }
        else if (e.target.name === "email") {

            const rexe = /\S+@\S+\.\S+/;
            isvalid = rexe.test(e.target.value);

        }
        else if (e.target.name === "repassword") {

            if (e.target.value.length > 6) {
                const rexp = /\d{1}/;
                setPass1(rexp.test(e.target.value));
                setPassword(e.target.value);
            }
        }
        else if (e.target.name === "password") {
            if (pass1) {
                password === e.target.value ? isvalid = true : isvalid = false;
            }
        }

        if (isvalid === true) {
            const newuser = { ...user };
            newuser[e.target.name] = e.target.value;
            setUser(newuser);
        }
        else{
            console.log(e.target.name,"is invalid");
        }
    }

    

    

    const updateuser = newuser => {

        const user = firebase.auth().currentUser;
        console.log("current user", newuser);
        user.updateProfile({
            displayName: newuser.name,
        }).then(() => {
            
        }).catch((error) => {
            
        });
    }

    const googleloginhandler = () => {


        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;


                var token = credential.accessToken;
               
                var user = result.user;
                console.log(user);
                const newuser = { name: user.displayName, email: user.email };
                setLoggedinuser(newuser);
                history.replace(from);
                
            }).catch((error) => {
                
                var errorCode = error.code;
                var errorMessage = error.message;
                
                var email = error.email;
                
                var credential = error.credential;
                
            });

    }
    return (
        <div className="Loginpage">
            <div className="logincard">

                <input type="text" placeholder="Name" name="name" onBlur={validityhandler} />
                <br />
                <br />
                <input type="email" placeholder="Email" name="email" onBlur={validityhandler} />
                <br />
                <br />
                <input type="password" placeholder="Password" name="repassword" onBlur={validityhandler} />
                <br />
                <br />

                <input type="password" placeholder="Confirm password" name="password" onBlur={validityhandler} />
                <br />
                <br />

                <button className="loginbutton mt-3" onClick={Registerhere}>Create an account</button>

                <p>Already have an account?<Link to="/login" className="registration">Login</Link></p>

                <GoogleButton className="googlebutton"
                    type='dark'
                    onClick={googleloginhandler}
                />

            </div>

        </div>
    );
};

export default Register;