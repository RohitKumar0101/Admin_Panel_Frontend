import * as Yup from "yup";
import { useFormik } from "formik";
import "./SignUpForm.css";
import { Navigate, useNavigate } from "react-router-dom";
import { Button, Snackbar } from "@mui/material";
import { useEffect } from "react";
import CustomSnackbar from "../Snackbar/Snackbar";
// import { Button } from "../Button/Button";
export const SignUpForm = ({ setIsSignUP,open,handleSnacker}) => {
	const navigate = useNavigate();
	const initialValues = {
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
		mobile: ""
	}

	const SignUpSchema = Yup.object().shape({
		name: Yup.string().min(2, "Name is Too short").required("Name  is required field"),
		email: Yup.string().email("!Invlid email").required("Email is required field"),
		// password: Yup.string().min(3, "Password is Too Short!").required("Password is required field"),
		// confirmPassword: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required("Confirm Password is required field"),
		password: Yup.string().required('Password is required field').matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{12,99}$/,
			'Must be atleast 12 characters'
		),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password')], 'Passwords must match').required("Confirm Password is required field"),

		mobile: Yup.number().min(10, "minimum 10 numbers is required").required("Mobile is  required field")
	})

	const SignUpValidation = (e) => {
		console.log(e);
		console.log("hello");
		handleSnacker();
		setTimeout(() => {
			setIsSignUP(false)
			handleSnacker();
		}, 2000);
		// navigate("/");
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: SignUpSchema,
		onSubmit: SignUpValidation
	})
	console.log(formik.validateOnBlur);

	return <form className="signUp-form-container h-full " onSubmit={formik.handleSubmit}>
		<label className="signUp-text" style={{ color: "black" }}>Sign Up</label>
		<label className="label name "><div className="flex items-center justify-start w-full"><h1 className="w-2/5 font-medium text-base">Name:</h1><input className="field w-3/5" type="text" name="name" placeholder="Enter your name" value={formik.values.name} onChange={formik.handleChange} /></div><div className="error w-10/12 flex justify-start">{(formik.touched.name && formik.errors.name) ?<div className="w-full flex"><div className="w-4/12"></div><div className="w-8/12 flex justify-start">{formik.errors.name}</div></div>  : <div className="error-spacing"></div>}</div></label>
		<label className="label email"><div className="flex items-center justify-start w-full"><h1  className="w-2/5 font-medium text-base">Email:</h1><input className="field w-3/5" type="text" name="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} /></div>		<div className="error w-10/12 flex justify-start">{formik.touched.email && formik.errors.email ? <div className="w-full flex"><div className="w-4/12"></div><div className="w-8/12 flex justify-start">{formik.errors.email}</div></div> : <div className="error-spacing"></div>}</div>
		</label>
		<label className="label password "><div className="flex items-center gap-1 w-full"><h1  className="w-2/5 font-medium text-base">Password:</h1><input className="field w-3/5 " type="password" name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} />	</div>	<div className="error w-11/12 flex justify-end">{formik.touched.password && formik.errors.password ?<div className="w-full flex justify-end mr-6"><div className="w-4/12"></div><div className="w-8/12 flex justify-start">{formik.errors.password}</div> </div>: <div className="error-spacing"></div>}</div>
		</label>
		<label className="label confirm-password"><div className="flex items-center gap-1 w-full"><h1  className="w-2/5 font-medium text-base">Confirm:</h1><input className="field w-3/5" type="password" name="confirmPassword" value={formik.values.confirmPassword} placeholder="Confirm-Pasword" onChange={formik.handleChange} />	</div>	<div className="error w-10/12 flex justify-start ml-1">{formik.touched.confirmPassword && formik.errors.confirmPassword? <div className="w-full flex"><div className="w-4/12"></div><div className="w-8/12 flex justify-start">{formik.errors.confirmPassword} </div> </div>: <div className="error-spacing"></div>}</div>
		</label>
		<label className="label mobile"><div className="flex items-center gap-1 w-full"><h1  className="w-2/5 font-medium text-base">Mobile:</h1><input className="field w-3/5" type="number" min={1} name="mobile" value={formik.values.mobile} placeholder="Enter your moblile number" onChange={formik.handleChange} /></div>		<div className="error w-10/12 flex justify-start ml-1">{formik.touched.mobile && formik.errors.mobile ? <div className="w-full flex"><div className="w-4/12"></div><div className="w-8/12 flex justify-start"> {formik.errors.mobile} </div> </div>: <div className="error-spacing"></div>}</div>
		</label>
		{/* {passErr ? <label className="password-err">Password and Confirm-Password does not match</label> : <></>} */}
		{/* <button type="submit" className="signIn-button" >Sign Up</button> */}
		 <Button type="submit" sx={{
          "&:hover": {
            color: "blue",
            backgroundColor: "#1560bd !important",
            boxShadow: "none !important",
          },
		  textTransform:"none"
        }} style={{color:"white",borderRadius:"2rem",height:"2.5rem",width:"5.5rem",backgroundColor:"#0085CA",marginTop:"8px"}}>Sign up</Button>
	<CustomSnackbar open={open}  message="Registration successfull"/>
	</form>
}



// import {};
// import * as Yup from "yup";

// const SignUpSchema = Yup.object().shape({
//     name: Yup.string().min(2, 'Too short !').max(30, 'Too long').required('Required'),
//     email: Yup.string().email('!Invalid Email').required("Email is required"),
//     password: Yup.string().required("Required")
// })


// export const SignUpFormEx = () => {
//     return <Formik
//         initialValues={{
//             firstName: '',
//             lastName: '',
//             email: '',
//             password: '',
//             confirmPassword: ''
//         }}

//         validationSchema={SignUpSchema}
//         onSubmit={values => {
//             // same shape as initial values
//             console.log(values);
//         }}
//     >
//         {({ errors, touched }) => (
//             <Form>
//                 <Field name="firstName" />
//                 {errors.firstName && touched.firstName ? (
//                     <div>{errors.firstName}</div>
//                 ) : null}
//                 <Field name="lastName" />
//                 {errors.lastName && touched.lastName ? (
//                     <div>{errors.lastName}</div>
//                 ) : null}
//                 <Field name="email" type="email" />
//                 {errors.email && touched.email ? <div>{errors.email}</div> : null}
//                 <Field name="email" type="password" />
//                 {errors.email && touched.email ? <div>{errors.email}</div> : null}
//                 <Field name="email" type="confirmPassword" />
//                 {errors.email && touched.email ? <div>{errors.email}</div> : null}
//                 <button type="submit">Submit</button>
//             </Form>
//         )}
//     </Formik>

// }

