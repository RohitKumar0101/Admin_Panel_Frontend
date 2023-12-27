import { useFormik } from "formik"
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./SignInForm.css";
import { Button } from "@mui/material";
import CustomSnackbar from "../Snackbar/Snackbar";
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import FacebookLogin from 'react-facebook-login';
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
import { LinkedIn } from "react-linkedin-login-oauth2";

// import jwt_decode from 'jwt-decode';

export const SignInForm = ({ open, handleSnacker }) => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState();
    const [userInfo, setUserInfo] = React.useState({});


    const navigate = useNavigate();


    const handleSignIn = (e) => {
        setEmail(e.email);
        setPassword(e.password);

        console.log("SignIn successfull");
        handleSnacker();
        setFields();
        // navigate("/profile");
        setTimeout(() => {
            handleSnacker();
            navigate("/profile")
        }, 2000);


    }



    const setFields = () => {
        console.log(email);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
    }


    const SignInSchema = Yup.object().shape({
        email: Yup.string().required("Email is a required field").email("!Invalid Email entered"),
        password: Yup.string().required("Password is a required field").min(12).matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{12,99}$/,
            'Password should be contain 1 uppeCase, 1 loweCase, 1 Special and 1 Number'
        ),
    })

    const InitialValues = { email: "", password: "" }

    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: SignInSchema,
        onSubmit: handleSignIn
    })



    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log(tokenResponse);
            const obj = jwtDecode.tokenResponse();
            console.log(obj)
        }
    });

    const responseFacebook = (response) => {
        console.log(response);
    }


    return <div className="flex flex-col items-center justify-start mt-10 w-full h-full">
        <div className=" flex flex-col items-center justify-around  h-1/4 w-full">
            <div className="flex justify-center items-center ml-2 w-1/3">

                {/* <GoogleIcon style={{ height: "40px", width: "40px", cursor: "pointer" }} onClick={() => login()} /> */}

                <GoogleLogin
                    onSuccess={credentialResponse => {
                        localStorage.setItem("UserLoggedToken", credentialResponse.credential);
                        const obj = jwtDecode(credentialResponse.credential);
                        setUserInfo(obj);
                        const obj1 = { name: obj.name, email: obj.email };
                        console.log(obj)
                        localStorage.setItem("LoggedUserData", JSON.stringify({ "name": obj.name, "email": obj.email, Image: obj.picture }));
                        navigate("/profile");
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    useOneTap
                    type="icon"

                />
                <FacebookLogin
                    appId={752500006736001}
                    // autoLoad={true}
                    fields="name, email, picture"
                    scope="public_profile,email"
                    callback={responseFacebook}
                    icon="fa-facebook"
                    cssClass="btnFacebook"
                    textButton=""
                    render={(renderProps) => (
                        <button onClick={renderProps.onClick}>FB button</button>
                    )}
                />,

                <LinkedIn
                    clientId="7854zhwebbvxu5"
                    redirectUri={`${window.location.origin}`}
                    onSuccess={(code) => {
                        console.log(code);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                >
                    {({ linkedInLogin }) => (
                        <img
                            onClick={linkedInLogin}
                            src={linkedin}
                            alt="Hello"
                            style={{ maxWidth: '180px', cursor: 'pointer' }}
                        />
                        
                        
                    )}
                </LinkedIn>





                {/* <TwitterIcon style={{ height: "40px", width: "40px", cursor: "pointer" }} onClick={() => window.open('https://twitter.com/i/flow/login')} />
                <LinkedInIcon style={{ height: "40px", width: "40px", cursor: "pointer" }} onClick={() => window.open('https://www.linkedin.com/login')} /> */}
            </div>
            <div className="w-full flex justify-center items-center">
                <hr className="border border-current w-2/5 opacity-40"></hr>
                <h1>OR</h1>
                <hr className="border border-current w-2/5 opacity-40"></hr>
            </div>

        </div>


        <form className="form-container" onSubmit={formik.handleSubmit}>
            <label className="signIn-text mb-3" style={{ color: "black" }}>Sign in</label>
            <label className="w-full"><input className="field" type="text" placeholder="Email" name="email" value={formik.values.email} onChange={formik.handleChange} />       {formik.errors.email ? <div className="error-signUp"> {formik.errors.email} </div> : <div className="error-spacing"></div>}
            </label>


            <label className="w-full">
                <input className="field" type="password" placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange} />
                {formik.touched.password && formik.errors.password ? <div className="error-signUp"> {formik.errors.password} </div> : <div className="error-spacing"></div>}
            </label>
            <label className="forgot-text">Forgot Password ?</label>
            <Button type="submit" sx={{
                "&:hover": {
                    color: "blue",
                    backgroundColor: "#1560bd !important",
                    boxShadow: "none !important",
                },
                textTransform: "none"
            }} style={{ color: "white", borderRadius: "2rem", height: "2.5rem", width: "5.5rem", backgroundColor: "#0085CA" }}>Sign In</Button>
        </form>
        <CustomSnackbar open={open} handleSnacker={() => handleSnacker} message="Login Successfull" />
    </div>

}