import React from "react"
import "./Login.css"
import { SignInForm } from "../../components/form components/SignInForm";
import { LoginDetails } from "../../components/form components/LoginDetails";
import { SignUpForm, SignUpFrom } from "../../components/form components/SignUpFrom";
import { SignUpDetails } from "../../components/form components/SignUpDetails";
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
// import * from "yup" ;
export const Login = () => {

    const [isSignUp, setIsSignUP] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [passErr, setPassErr] = React.useState(false);
    const [name,setName] = React.useState("");
    const [email,setEmail] = React.useState("")
    const [mobile,setMobile] = React.useState();

    const changeIsSignUp = (e) => {
        if (password !== confirmPassword) {
            setPassErr(true);
            return;
        } else
            setIsSignUP((prev) => !prev);

    }

    return <div className="main-container">
        <div className="content-container ">
            <div className={isSignUp ? "content-container-signIn-details" : "content-container-signIn"} >
                {isSignUp ? <LoginDetails changeIsSignUp={changeIsSignUp} /> : <SignInForm />}
            </div>
            <div className={isSignUp ? "content-container-2 content-container-signUp" : "content-container-signUp-details"}>
                {isSignUp ? <SignUpForm setIsSignUP={setIsSignUP}/> : <SignUpDetails changeIsSignUp={changeIsSignUp} />}

            </div>
        </div>
    </div>
}

