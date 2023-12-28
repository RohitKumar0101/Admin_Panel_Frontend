
import * as Yup from "yup";
import { useFormik } from "formik";
// import "./InventoryForm.css";
// import "./SignUpForm.css"; 
import { Navigate, useNavigate } from "react-router-dom";
import "./InventoryForm.css";
import React, { useEffect } from "react";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CustomModal } from "../CustomModal/CustomModal";
import { CategoriesStore } from "../../utility/utility";
 
// console.log(MyCategory);
// import CustomSnackbar from "../../Snackbar/Snackbar";

export const InventoryForm = ({ handleOpen, setOpen, open, handleSnackbar,handleCategoriesArray}) => {

	const [status, setStatus] = React.useState(1);
	// const [showErrors,setShowErrors] = React.useState();
	// const localSotrageData = localStorage.getItem("CategoryData") ? localStorage.getItem(JSON.parse("CategoryData")) : [] ;
	const [array,setArray] = React.useState(localStorage.getItem("CategoryData") ? JSON.parse(localStorage.getItem(("CategoryData"))) : []);

	const defaultDate = "2022-04-17"

		const ChangeStorageArray = (data)=>{
			 setArray(data);
			}
	


	const navigate = useNavigate();
	const initialValues = {
		CategoryName:"",
		Status:status,
		Date:defaultDate
	}

	const SignUpSchema = Yup.object().shape({
		CategoryName: Yup.string().required("It is a required field").min(5,"Minimum of 5 characters")
	})

	const SetLocalStorage  = (e)=>{
		console.log(e)
	}

	// const handleSetCategory= (e)=>{
	// 	setCategoriesArray(prev=>{
	// 		return [...prev,e]
	// 	})
	// }

	const SubmitCategory = (e) => {
		console.log(e);
		CategoriesStore(e,array,ChangeStorageArray);
		// handleSetCategory(e)
		handleCategoriesArray(e);
		 console.log(array);
		formik.setFieldValue("Status",1);
		formik.setFieldValue("CategoryName","");
		formik.setTouched(false);
		
		handleClose();
		handleSnackbar();
		setTimeout(() => {
			handleSnackbar();
		}, 1000);
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: SignUpSchema,
		onSubmit: SubmitCategory
	})

	
	const ChangeStatus = (event) => {
		console.log("Changing status....");
		console.log(event);
		setStatus(event.target.value);
		formik.setFieldValue("Status", event.target.value);
		
		// setAlert(event.target.value)
	  };

	  const handleClose = ()=>{
		setOpen(false);
	  }

	const CancelCategoryForm = ()=>{
		formik.setFieldValue("Status",1);
		formik.setFieldValue("CategoryName","");
		formik.setTouched(false);
		handleClose();
		// formik.setFieldValue("Status",");
		setStatus(1);
	}
    
	


	return <CustomModal handleOpen={handleOpen} handleClose={handleClose} open={open}>
		<div className="flex flex-col h-full w-full ">
			<label className="user-details-text" style={{ color: "black" }}>Add Category Details:</label>
			<div className="flex justify-center">

				<form className="edit-Inventory-details w-full" onSubmit={formik.handleSubmit}>

					<label className="edit-table-details-label  edit-user-details ">
						<div className="flex w-full items-center justify-end ">
							<h1 className="w-3/12">Category Name:</h1>
							<div className="w-7/12 ">

								<input className="edit-inventory-field  w-8/12 border border-gray-300 hover:border-gray-900  focus:border-blue-400 focus-within:border-blue-500" type="text" name="CategoryName" placeholder="Enter Category name" value={formik.values.CategoryName} onChange={formik.handleChange} />
							</div>
						</div>
					</label>
						<div className="w-full flex h-4 mb-3">
                        <div className="w-5/12"></div>
						{formik.errors.CategoryName && formik.touched.CategoryName ?<div className="w-7/12 text-xs text-red-500">{formik.errors.CategoryName}</div>:<div className="w-7/12 text-xs text-red-300"></div>}
						</div>

					<label className="edit-table-details-label edit-user-details">
						<div className="flex w-full items-center justify-end">
							<h1 className="w-3/12">Status:</h1>
							{/* <input className="edit-form-field email-field w-7/12" type="text" name="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} /> */}
							<div className="w-7/12"> <CustomSelect status={status} ChangeStatus={ChangeStatus} /></div>
						</div>
					</label>
					<div className="w-full flex h-4 mb-3">
                        <div className="w-5/12"></div>
						<div className="w-7/12 text-xs text-red-300" ></div>
						</div>

					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<label className="edit-table-details-label  edit-user-details">
							<div className="flex w-full items-center justify-end ">
								<h1 className="w-3/12">Created At:</h1>
								{/* <input className="edit-form-field mobile-field w-7/12" type="number" min={1} name="mobile" value={formik.values.mobile} placeholder="Enter your moblile number" onChange={formik.handleChange} /> */}
								<div className="w-7/12">
									<DesktopDatePicker defaultValue={dayjs(defaultDate)}  disabled/>
								</div>

							</div>
						</label>
						<div className="w-full flex h-4 mb-3">
                        <div className="w-5/12"></div>
						<div className="w-7/12 text-xs text-red-300"></div>
						</div>
					</LocalizationProvider>



					{/* {passErr ? <label className="password-err">Password and Confirm-Password does not match</label> : <></>} */}
					<div className="flex w-3/4 justify-center gap-20  ">
						<button type="submit" className="Submit-edit-details-button mt-4" >Submit</button>

						<button className="Cancel-edit-details-button  mt-4" onClick={CancelCategoryForm}>Cancel</button>

					</div>
				</form>
			</div>

		</div>
	</CustomModal>
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

