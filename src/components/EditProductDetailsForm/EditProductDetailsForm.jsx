import * as Yup from "yup";
import { useFormik } from "formik";
// import "./InventoryForm.css";
// import "./SignUpForm.css"; 
import { Navigate, useNavigate } from "react-router-dom";
// import "./InventoryForm.css";
import "./EditProductDetailsForm.css";
import React, { useEffect } from "react";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CustomModal } from "../CustomModal/CustomModal";
import { AddEditCategory, AddEditProduct, CategoriesStore, GetCategoryDetailsByID } from "../../utility/Common";
import { CategorySelect } from "../CategorySelect/CategorySelect";

// console.log(MyCategory);
// import CustomSnackbar from "../../Snackbar/Snackbar";

export const EditProductDetailsForm = ({handleEditProductSnackbar,ShowNewProducts,selectedEditProduct,setSelectdCategory,ProductsArray,CategoriesArray, handleOpenProductEditForm, handleCloseProductEditForm, open, handleSnackbar  }) => {

	const [status, setStatus] = React.useState(selectedEditProduct.Status);
	const [selectedEditCategory,setSelectedEditCategory] = React.useState(selectedEditProduct.CategoryID);
	const [array, setArray] = React.useState(localStorage.getItem("CategoryData") ? JSON.parse(localStorage.getItem(("CategoryData"))) : []);
	// console.log(status);
	console.log(selectedEditCategory);
    
	const defaultDate = "2022-04-17"

	const ChangeStorageArray = (data) => {
		setArray((prev) => [...prev, data]);
	}



	const navigate = useNavigate();
	const initialValues = {
		ProductName: selectedEditProduct.ProductName,
		ProductPrice: selectedEditProduct.ProductPrice,
		ProductQuantity: selectedEditProduct.ProductQuantity,
		Category: selectedEditCategory,
		CategoryID:selectedEditProduct.CategoryID,
		Status: status,
		Date: defaultDate
	}

	const SignUpSchema = Yup.object().shape({
		ProductName: Yup.string().required("It is a required field").min(5, "Minimum of 5 characters").trim().max(20, "Maximum of 20 characters"),
        ProductPrice: Yup.number().integer("Only Integers allowed").required("It is a requird field").min(50,"Price should be greater than 50 Rs.").max(80000,"Price should be less than 80000 Rs."),
        ProductQuantity: Yup.number().integer("Only Integers allowed").required("It is a required field").min(2,"Should be in greater or equal to 2 units").max(100,"Maximum Quantiy is 100 units")
        
	})

	const ChangeCategory = (e)=>{
		let CategoryName = GetCategoryDetailsByID(e.target.value);
        formik.setFieldValue("Category",CategoryName);
        setSelectedEditCategory(e.target.value);
        formik.setFieldValue("CategoryID",e.target.value);
	}

	const SetLocalStorage = (e) => {
		console.log(e)
	}


	const SubmitEditedProduct = (e) => {
		const ID = selectedEditProduct.ID;
		const ObjWithID = { ...e, ID};
		// CategoriesStore(e,array,ChangeStorageArray);
		AddEditProduct(ObjWithID)
		ShowNewProducts();
		handleCloseProductEditForm();
		// formik.setFieldValue("Status",1);
		// formik.setFieldValue("CategoryName","");
		// formik.setTouched(false);
		// SetLocalStorage(e);
		// handleClose();
		handleEditProductSnackbar();
		setTimeout(() => {
			handleEditProductSnackbar();
		}, 1000);
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: SignUpSchema,
		onSubmit: SubmitEditedProduct
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

    const height=600;


	return <CustomModal open={open} height={height}>
		<div className="flex flex-col h-full w-full ">
			<label className="user-details-text mt-1 " style={{ color: "black" }}>Edit Product Details:</label>
			<div className="flex justify-center">

				<form className="edit-category-details w-full" onSubmit={formik.handleSubmit}>

					<label className="edit-table-details-label  edit-user-details ">
						<div className="flex w-full items-center justify-end ">
							<h1 className="w-3/12">Product Name:</h1>
							<div className="w-7/12 ">

								<input className="edit-inventory-field  w-8/12 border border-gray-300 hover:border-gray-900  focus:border-blue-400 focus-within:border-blue-500" type="text" name="ProductName" placeholder="Enter Category name" value={formik.values.ProductName} onChange={formik.handleChange} />
							</div>
						</div>
					</label>
					<div className="w-full flex h-4  mb-3">
						<div className="w-5/12"></div>
						{formik.errors.ProductName && formik.touched.ProductName ? <div className="w-7/12 text-xs text-red-500">{formik.errors.ProductName}</div> : <div className="w-7/12 text-xs text-red-300"></div>}
					</div>

					<label className="edit-table-details-label edit-user-details">
						<div className="flex w-full items-center justify-end">
							<h1 className="w-3/12">Status:</h1>
							{/* <input className="edit-form-field email-field w-7/12" type="text" name="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} /> */}
							<div className="w-7/12"> <CustomSelect status={status} ChangeStatus={ChangeStatus} /></div>
						</div>
					</label>
					<div className="w-full flex h-4  mb-3">
						<div className="w-5/12"></div>
						<div className="w-7/12 text-xs text-red-300" ></div>
					</div>

					<label className="edit-table-details-label edit-user-details">
                        <div className="flex w-full items-center justify-end">
                            <h1 className="w-3/12">Category:</h1>
                            {/* <input className="edit-form-field email-field w-7/12" type="text" name="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} /> */}
                            <div className="w-7/12">
                                <CategorySelect ProductsArray={ProductsArray} selectedEditCategory={selectedEditCategory} selectedEditProduct={selectedEditProduct} setSelectdCategory={setSelectdCategory} CategoriesArray={CategoriesArray} ChangeCategory={ChangeCategory} />
                            </div>
                        </div>
                    </label>
                    <div className="w-full flex h-4 mb-3">
                        <div className="w-5/12"></div>
                        <div className="w-7/12 text-xs text-red-300" ></div>
                    </div>

					<label className="edit-table-details-label  edit-user-details ">
                        <div className="flex w-full items-center justify-end ">
                            <h1 className="w-3/12">Amount:</h1>
                            <div className="w-7/12 ">

                                <input className="edit-inventory-field  w-8/12 border border-gray-300 hover:border-gray-900  focus:border-blue-400 focus-within:border-blue-500" type="number" name="ProductPrice" placeholder="Enter product price" value={formik.values.ProductPrice} onChange={formik.handleChange} />
                            </div>
                        </div>
                    </label>
                    <div className="w-full flex h-4  mb-3">
                        <div className="w-5/12"></div>
                        {formik.errors.ProductPrice && formik.touched.ProductPrice ? <div className="w-7/12 text-xs text-red-500">{formik.errors.ProductPrice}</div> : <div className="w-7/12 text-xs text-red-300"></div>}
                    </div>

                    <label className="edit-table-details-label  edit-user-details ">
                        <div className="flex w-full items-center justify-end ">
                            <h1 className="w-3/12">Quantity:</h1>
                            <div className="w-7/12 ">

                                <input className="edit-inventory-field  w-8/12 border border-gray-300 hover:border-gray-900  focus:border-blue-400 focus-within:border-blue-500" type="number" name="ProductQuantity" placeholder="Quantity" value={formik.values.ProductQuantity} onChange={formik.handleChange} />
                            </div>
                        </div>
                    </label>
                    <div className="w-full flex h-4  mb-3">
                        <div className="w-5/12"></div>
                        {formik.errors.ProductQuantity && formik.touched.ProductQuantity ? <div className="w-7/12 text-xs text-red-500">{formik.errors.ProductQuantity}</div> : <div className="w-7/12 text-xs text-red-300"></div>}
                    </div>

					{/* {passErr ? <label className="password-err">Password and Confirm-Password does not match</label> : <></>} */}
					<div className="flex w-3/4 justify-center gap-5 ">
						<button type="submit" className="Submit-edit-details-button mt-4" >Submit</button>

						<button className="Cancel-edit-details-button  mt-4" onClick={handleCloseProductEditForm}>Cancel</button>

					

					</div>
				</form>
			</div>

		</div>
	</CustomModal>
}