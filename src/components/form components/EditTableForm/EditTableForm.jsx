import * as Yup from "yup";
import { useFormik } from "formik";
import "./EditTableForm.css";
// import "./SignUpForm.css"; 
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CustomSnackbar from "../../Snackbar/Snackbar";
export const EditTableForm = ({ handleClose, setUserDetails, userDetails,open,handleSnacker }) => {
	
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
		address: Yup.string().min(10, "Address should be of minium 10 characters").required("Address is a required field"),

		mobile: Yup.number().min(10, "Minimum 10 numbers is required").required("Mobile number is a required field")
	})

	const SignUpValidation = (e) => {
		setUserDetails(e);
		handleSnacker();
		setTimeout(() => {
			handleSnacker();
			handleClose();
		}, 1000);
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: SignUpSchema,
		onSubmit: SignUpValidation
	})

	return <div className="flex flex-col h-full w-full ">
		<label className="user-details-text ml-2" style={{ color: "black" }}>Edit User Details:</label>
		<div className="flex justify-center">

			<form className="edit-details-container w-full" onSubmit={formik.handleSubmit}>

				<label className="edit-table-details-label  edit-user-details w-full">
					<div className="flex w-full items-center"><h1 className="w-4/12">Name:</h1><input className="edit-form-field name-field w-8/12" type="text" name="fullName" placeholder="Enter your name" value={formik.values.fullName} onChange={formik.handleChange} /></div>
					<div className="edit-table-password-error mt-1"><label className="w-9/12 ">{formik.errors.fullName ? formik.errors.fullName : <div className="error-spacing"></div>}</label></div>

				</label>

				<label className="edit-table-details-label edit-user-details">
					<div className="flex w-full items-center"><h1 className="w-4/12">Email:</h1><input className="edit-form-field email-field w-8/12" type="text" name="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} /></div>
					<div className="edit-table-password-error "><label className="w-9/12">{formik.errors.email ? formik.errors.email : <div className="error-spacing"></div>}</label></div>
				</label>

				<label className="edit-table-details-label  edit-user-details">
					<div className="flex w-full items-center"><h1 className="w-4/12">Phone:</h1><input className="edit-form-field mobile-field w-8/12" type="number" min={1} name="mobile" value={formik.values.mobile} placeholder="Enter your moblile number" onChange={formik.handleChange} /></div>
					<div className="edit-table-password-error"><label className="w-9/12">{formik.errors.mobile ? formik.errors.mobile : <div className="error-spacing"></div>}</label></div>
				</label>

				<label className="edit-table-details-label  edit-user-details">
					<div  className="flex w-full items-center"><h1 className="w-4/12">Address:</h1><input className="edit-form-field address-field w-8/12" type="text" name="address" placeholder="Enter your address" value={formik.values.address} onChange={formik.handleChange} /></div>
				<div className="edit-table-password-error"><span className="w-9/12">{formik.errors.address ? formik.errors.address : <div className="error-spacing"></div>}</span></div>
					</label>

				<label className="edit-table-details-label  edit-user-details w-full">
					<div  className="flex w-full items-center"><h1 className="w-4/12">Designation:</h1><input className="edit-form-field designation-field w-8/12" type="text" name="designation" placeholder="Enter your Designation" value={formik.values.designation} onChange={formik.handleChange} /></div>
				<div className="edit-table-password-error"><span className="w-9/12">{ formik.errors.designation ? formik.errors.designation : <div className="error-spacing"></div>}</span></div>
				</label>

				{/* {passErr ? <label className="password-err">Password and Confirm-Password does not match</label> : <></>} */}
				<div className="flex w-3/4 justify-center gap-14">
					<button type="submit" className="Submit-edit-details-button mt-4" >Submit</button> 

					<button  className="Cancel-edit-details-button  mt-4" onClick={handleClose}>Cancel</button> 
					
					</div>
			</form>
		</div>
		
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

