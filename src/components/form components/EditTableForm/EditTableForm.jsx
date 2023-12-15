import * as Yup from "yup";
import { useFormik } from "formik";
import "./EditTableForm.css";
// import "./SignUpForm.css"; 
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const EditTableForm = ({ handleClose,setUserDetails,userDetails }) => {
	console.log(userDetails);
	const navigate = useNavigate();
	const initialValues = {
		fullName: userDetails.fullName,
		email: userDetails.email,
		address: userDetails.address,
		designation: userDetails.designation,
		mobile: userDetails.mobile
	}

	const SignUpSchema = Yup.object().shape({
		fullName: Yup.string().min(2, "Name is Too short  ").required("Name is required field"),
		email: Yup.string().email("!Invlid email").required("Email is required field"),
		// password: Yup.string().min(3, "Password is Too Short!").required("Password is required field"),
		// confirmPassword: Yup.string().min(3, "Too Short!").max(15, "Too Long!").required("Confirm Password is required field"),
		designation: Yup.string().required('Designation is required'),
		address: Yup.string().min(10,"Address should be of minium 10 characters").required("Address is a required field"),

		mobile: Yup.number().min(10, "Minimum 10 numbers is required").required("Mobile number is a required field")
	})

	const SignUpValidation = (e) => {
	    setUserDetails(e);
		handleClose();
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: SignUpSchema,
		onSubmit: SignUpValidation
	})
	console.log(formik.validateOnBlur);

	return<div className="flex flex-col h-full w-full ">
		<label className="user-details-text" style={{ color: "black" }}>User Details:</label>
	 <form className="edit-details-container ml-24" onSubmit={formik.handleSubmit}>
		<label className="edit-table-details-label name">Name:<input className="form-field name-field " type="text" name="fullName" placeholder="Enter your name" value={formik.values.fullName} onChange={formik.handleChange} /></label>
		<div className="edit-table-password-error"><label className="w-9/12 ">{(formik.touched.fullName && formik.errors.fullName) ? formik.errors.fullName : ""}</label></div>
		<label className="edit-table-details-label email ">Email:<input className="form-field email-field" type="text" name="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} /></label>
		<div className="edit-table-password-error"><label className="w-9/12">{formik.touched.email ? formik.errors.email : ""}</label></div>
		<label className="edit-table-details-label mobile ">Phone:<input className="form-field mobile-field" type="number" min={1} name="mobile" value={formik.values.mobile} placeholder="Enter your moblile number" onChange={formik.handleChange} /></label>
		<div className="edit-table-password-error"><label className="w-9/12">{formik.touched.mobile || formik.dirty.mobile ? formik.errors.mobile : ""}</label></div>
		<label className="edit-table-details-label address ">Address:<input className="form-field address-field" type="text" name="address" placeholder="Enter your address" value={formik.values.address} onChange={formik.handleChange} /></label>
		<div className="edit-table-password-error"><span className="w-9/12">{formik.touched.address ? formik.errors.address : ""}</span></div>
		<label className="edit-table-details-label designation">Designation:<input className="form-field designation-field" type="text" name="designation" placeholder="Enter your Designation" value={formik.values.designation} onChange={formik.handleChange} /></label>
		<div className="edit-table-password-error"><span className="w-9/12">{formik.touched.designation ? formik.errors.designation : ""}</span></div>

		{/* {passErr ? <label className="password-err">Password and Confirm-Password does not match</label> : <></>} */}
		<button type="submit" className="Submit-edit-details-button mt-4" >Submit</button>
	</form>
	</div>
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

