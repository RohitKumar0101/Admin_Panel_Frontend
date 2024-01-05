


import * as Yup from "yup";
import { useFormik } from "formik";
// import "./InventoryForm.css";
// import "./SignUpForm.css"; 
import { Navigate, useNavigate } from "react-router-dom";
// import "./InventoryForm.css";
import "./EditCategoryForm.css";
import React, { useEffect } from "react";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CustomModal } from "../CustomModal/CustomModal";
import { AddEditCategory, CategoriesStore, CategoryExistInProductTableBoolean } from "../../utility/Common";

// console.log(MyCategory);
// import CustomSnackbar from "../../Snackbar/Snackbar";

export const EditCategoryForm = ({ handleRestictEditCategory,handleOpen, setOpen, open,handleEditCategorySnackbar, handleSnackbar, handleEditCategoryForm, handleCloseEditCategoryForm, selectedRowData, ShowCategories }) => {

	const [status, setStatus] = React.useState(selectedRowData.Status);
	const [array, setArray] = React.useState(localStorage.getItem("CategoryData") ? JSON.parse(localStorage.getItem(("CategoryData"))) : []);
	// console.log(status);

	const defaultDate = "2022-04-17"

	const ChangeStorageArray = (data) => {
		setArray((prev) => [...prev, data]);
	}



	const navigate = useNavigate();
	const initialValues = {
		CategoryName: selectedRowData.CategoryName,
		Status: status,
		Date: defaultDate
	}

	const SignUpSchema = Yup.object().shape({
		CategoryName: Yup.string().required("It is a required field").min(5, "Minimum of 5 characters").max(20, "Maximum of 20 characters")
	})

	const SetLocalStorage = (e) => {
		console.log(e)
	}

	const SubmitCategory = (e) => {
		const ID = selectedRowData.ID;
		const ObjWithID = { ...e, ID: selectedRowData.ID };
		// CategoriesStore(e,array,ChangeStorageArray);
		let CategoryBoolean = CategoryExistInProductTableBoolean(selectedRowData.ID);
		if(CategoryBoolean){
			handleRestictEditCategory();
			setTimeout(() => {
				handleRestictEditCategory();
			}, 1000);
			handleCloseEditCategoryForm();
			return;
		}
		AddEditCategory(ObjWithID);
		ShowCategories();
		handleCloseEditCategoryForm();
		// formik.setFieldValue("Status",1);
		// formik.setFieldValue("CategoryName","");
		// formik.setTouched(false);
		// SetLocalStorage(e);
		// handleClose();
		handleEditCategorySnackbar();
		setTimeout(() => {
			handleEditCategorySnackbar();
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


	// const CancelCategoryForm = ()=>{
	// 	formik.setFieldValue("Status",1);
	// 	formik.setFieldValue("CategoryName","");
	// 	formik.setTouched(false);
	// 	handleClose();
	// 	// formik.setFieldValue("Status",");
	// 	setStatus(1);
	// }

	const height = 400;


	return <CustomModal height={height} handleOpen={handleEditCategoryForm} handleClose={handleCloseEditCategoryForm} open={open}>
		<div className="flex flex-col justify-center h-full w-full gap-2 mt-3 ">
			<label className="user-details-text mt-6 " style={{ color: "black" }}>Edit Category Details:</label>
			<div className="flex justify-center">

				<form className="edit-category-details w-full " onSubmit={formik.handleSubmit} >

					<label className="edit-table-details-label  edit-user-details ">
						<div className="flex w-full items-center justify-end ">
							<h1 className="w-3/12">Category Name:</h1>
							<div className="w-7/12 ">

								<input className="edit-inventory-field  w-8/12 border border-gray-300 hover:border-gray-900  focus:border-blue-400 focus-within:border-blue-500" type="text" name="CategoryName" placeholder="Enter Category name" value={formik.values.CategoryName} onChange={formik.handleChange} />
							</div>
						</div>
					</label>
					<div className="w-full flex h-4 mb-7">
						<div className="w-5/12"></div>
						{formik.errors.CategoryName && formik.touched.CategoryName ? <div className="w-7/12 text-xs text-red-500">{formik.errors.CategoryName}</div> : <div className="w-7/12 text-xs text-red-300"></div>}
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

					{/* {passErr ? <label className="password-err">Password and Confirm-Password does not match</label> : <></>} */}
					<div className="flex w-3/4 justify-center gap-5 ">
						<button type="submit" className="Submit-edit-details-button mt-4" >Submit</button>

						<button className="Cancel-edit-details-button  mt-4" onClick={handleCloseEditCategoryForm}>Cancel</button>

					</div>
				</form>
			</div>

		</div>
	</CustomModal>
}