import * as Yup from "yup";
import { useFormik } from "formik";
import "./SignUpForm.css"; 
import { Navigate, useNavigate } from "react-router-dom";
export const SignUpForm = ({setIsSignUP}) => {
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
		password: Yup.string().required('Password is required').matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*[\]{}()?"\\,><':;|_~`=+-])[a-zA-Z\d!@#$%^&*[\]{}()?"\\,><':;|_~`=+-]{12,99}$/,
			'Must contain at least 12 Characters, 1 Uppercase, 1 Lowercase, 1 Special Character, and 1 Number'
		  ),
		confirmPassword: Yup.string()
		   .oneOf([Yup.ref('password')], 'Passwords must match').required("Confirm is a required field"),
	  
		mobile: Yup.number().min(10, "minimum 10 numbers is required").required("mobile number is a required field")
	})

	const SignUpValidation = (e) => {
		console.log(e);
		console.log("hello");
		setIsSignUP(false)
		navigate("/");
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: SignUpSchema,
		onSubmit: SignUpValidation
	})
	console.log(formik.validateOnBlur);

	return <form className="signUp-form-container" onSubmit={formik.handleSubmit}>
		<label className="signUp-text" style={{ color: "black" }}>Sign Up</label>
		<label className="label name">Name:<input className="field" type="text" name="name" placeholder="Enter your name" value={formik.values.name} onChange={formik.handleChange} /></label>
		<div className="error">{(formik.touched.name && formik.errors.name) ? formik.errors.name : ""}</div>
		<label className="label email">Email:<input className="field" type="text" name="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} /></label>
		<div className="error">{formik.touched.email ? formik.errors.email : ""}</div>
		<label className="label password ">Password:<input className="field " type="password" name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange} /></label>
		<div className="password-error">{formik.touched.password ? formik.errors.password : ""}</div>
		<label className="label confirm-password">Confirm:<input className="field" type="password" name="confirmPassword" value={formik.values.confirmPassword} placeholder="Confirm-Pasword" onChange={formik.handleChange} /></label>
		<div className="error">{formik.touched.confirmPassword ? formik.errors.confirmPassword : ""}</div>
		<label className="label mobile">Mobile:<input className="field" type="number" min={1} name="mobile" value={formik.values.mobile} placeholder="Enter your moblile number" onChange={formik.handleChange} /></label>
		<div className="error">{formik.touched.mobile || formik.dirty.mobile ? formik.errors.mobile : ""}</div>
		{/* {passErr ? <label className="password-err">Password and Confirm-Password does not match</label> : <></>} */}
		<button type="submit" className="signIn-button" >Sign Up</button>
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

