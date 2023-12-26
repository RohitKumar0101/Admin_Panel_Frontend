import React from "react"
import "./Login.css"
import { SignInForm } from "../../components/form components/SignInForm";
import { LoginDetails } from "../../components/form components/LoginDetails";
import { SignUpForm, SignUpFrom } from "../../components/form components/SignUpFrom";
import { SignUpDetails } from "../../components/form components/SignUpDetails";
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
// import * from "yup" ;
export const Login = ({open,handleSnacker}) => {

    const [isSignUp, setIsSignUP] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [passErr,setPassErr] = React.useState(false);
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const navigate = useNavigate();

    const changeIsSignUp = (e) => {
        if (password !== confirmPassword) {
            setPassErr(true);
            return;
        } else
            setIsSignUP((prev) => !prev);

    }

    return<GoogleOAuthProvider clientId="971876233965-4vqsadgtuiqp25j1o4s1j28jcg7vhnhq.apps.googleusercontent.com">

     <div className="main-container">
           <h1 className="text-5xl font-bold  drop-shadow-2xl	  text-white ">Welcome To My Dashboard</h1>
        <div className="content-container">
            <div className={isSignUp ? "content-container-signIn-details" : "content-container-signIn"} >
                {isSignUp ? <LoginDetails changeIsSignUp={changeIsSignUp} /> : <SignInForm open={open} handleSnacker={handleSnacker} />}
            </div>
            <div className={isSignUp ? "content-container-2 content-container-signUp" : "content-container-signUp-details"}>
                {isSignUp ? <SignUpForm setIsSignUP={setIsSignUP} open={open} handleSnacker={handleSnacker}  /> : <SignUpDetails changeIsSignUp={changeIsSignUp} />}

            </div>
        </div>
    </div>
    </GoogleOAuthProvider>;
}

