import { useFormik } from "formik"
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
export const SignInForm = () => {
 
    const navigate = useNavigate();


    const handleSignIn = (e) => {
           
           console.log("SignIn successfull");
           setTimeout(() => {
             navigate("/profile")
           }, 1000);
          
           
    }


    const SignInSchema = Yup.object().shape({
        email: Yup.string().required("Email is a required field").email("!Invalid Email entered"),
        password: Yup.string().required("Password is a required field").min(10),
    })
        
    const InitialValues = { email: "", password: "" }

    const formik = useFormik({
        initialValues: InitialValues,
        validationSchema: SignInSchema,
        onSubmit: handleSignIn
    })

    console.log(formik.errors);
    return <form className="form-container" onSubmit={formik.handleSubmit}>
        <label className="signIn-text" style={{ color: "black" }}>Sign in</label>
        <input className="field" type="text" placeholder="Email" name="email" value={formik.values.email} onChange={formik.handleChange} />
       {formik.touched.email || formik.dirty.email ?  <div className="error-signUp"> {formik.errors.email} </div> : ""}
        <input className="field" type="password" placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange} />
       {formik.touched.password  ?  <div className="error-signUp"> {formik.errors.password} </div> : ""}
        <label className="forgot-text">Forgot Password ?</label>
        <button type="submit" className="signIn-button">Sign In</button>
    </form>

}