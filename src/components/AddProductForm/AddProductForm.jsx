
import * as Yup from "yup";
import { useFormik } from "formik";
// import "./InventoryForm.css";
// import "./SignUpForm.css"; 
import { Navigate, useNavigate } from "react-router-dom";
import "./AddProductForm.css";
import React, { useEffect } from "react";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { CustomModal } from "../CustomModal/CustomModal";
import { CategoriesStore, GetCategoryDetailsByID, ProductsStore } from "../../utility/Common";
import { CategorySelect } from "../CategorySelect/CategorySelect";
import { SelectCategoryForProduct } from "../SelectCategory/SelectCategory";


export const AddProductForm = ({ ShowNewProducts,CategoriesArray, AddProductFormOpen, setAddProductFormOpen,handleAddProductSnackbar }) => {
    const [status,setStatus] = React.useState(1);
    const [selectedCategory, setSelectdCategory] = React.useState("");
    const [selectedCategoryID,setSelectdCategoryID] = React.useState("");

    // const [showErrors,setShowErrors] = React.useState();
    // const localSotrageData = localStorage.getItem("CategoryData") ? localStorage.getItem(JSON.parse("CategoryData")) : [] ;
    const defaultDate = "2022-04-17"

    // const ChangeStorageArray = (data) => {
    //     setArray(data);
    // }


    const navigate = useNavigate();
    const initialValues = {
        ProductName: "",
        ProductPrice:null,
        ProductQuantity:null,
        Status: status,
        Date: defaultDate,
        SelectedCategory: selectedCategory,
        CategoryID:selectedCategoryID
    }

    const SignUpSchema = Yup.object().shape({
        ProductName: Yup.string().required("It is a required field").trim().min(5, "Minimum of 5 characters").max(20, "Maximum of 20 characters"),
        ProductPrice: Yup.number().required("It is a requird field").min(50,"Price should be greater than 50 Rs.").max(80000,"Price should be less than 80000 Rs."),
        ProductQuantity: Yup.number().required("It is a required field").min(2,"Should be in greater or equal to 2 units").max(100,"Maximum Quantiy is 100 units")
        
    })

    const SetLocalStorage = (e) => {
        console.log(e)
    }

    // const handleSetCategory= (e)=>{
    // 	setCategoriesArray(prev=>{
    // 		return [...prev,e]
    // 	})
    // }

    const SubmitCategory = (e) => {
        console.log(e);
        ProductsStore(e);
        formik.setFieldValue("Status", 1);
        setStatus(1);
        formik.setFieldValue("ProductName", "");
        formik.setFieldValue("CategoryID", "");
        formik.setTouched(false);
        formik.setFieldValue("SelectedCategory","")
        formik.setFieldValue("ProductPrice", null);
        formik.setFieldValue("ProductQuantity",null);
        ShowNewProducts();
        handleClose();
        handleAddProductSnackbar();
        setSelectdCategory("");
        setSelectdCategoryID("");
        setTimeout(() => {
            handleAddProductSnackbar();
        }, 500);
        
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

    const handleClose = () => {
        setAddProductFormOpen(false);
    }

    const CancelAddProductForm = () => {
        formik.setFieldValue("Status", 1);
        formik.setFieldValue("ProductName", "");
        formik.setFieldValue("ProductPrice", null);
        formik.setFieldValue("ProductQuantity",null);
        formik.setFieldValue("SelectedCategory","");
        formik.setFieldValue("CategoryID","");
        formik.setTouched(false);
        setSelectdCategory(""); 
        setSelectdCategoryID("")
        handleClose();
        // formik.setFieldValue("Status",");
        setStatus(1);
    }

    const ChangeCategory = (e)=>{
        console.log(e);
        let CategoryName = GetCategoryDetailsByID(e.target.value);
        formik.setFieldValue("SelectedCategory",CategoryName);
        formik.setFieldValue("CategoryID",e.target.value);
        setSelectdCategory(CategoryName);
        setSelectdCategoryID(e.target.value);
      }

    const height = 585;


    return <CustomModal open={AddProductFormOpen} height={height}>
        <div className="flex flex-col h-full w-full ">
            <label className="product-details-text" style={{ color: "black" }}>Add Product Details:</label>
            <div className="flex justify-center">

                <form className="edit-Inventory-details w-full" onSubmit={formik.handleSubmit}>

                    <label className="edit-table-details-label  edit-user-details ">
                        <div className="flex w-full items-center justify-end ">
                            <h1 className="w-3/12">Product Name:</h1>
                            <div className="w-7/12 ">

                                <input className="edit-inventory-field  w-8/12 border border-gray-300 hover:border-gray-900  focus:border-blue-400 focus-within:border-blue-500" type="text" name="ProductName" placeholder="Enter product name" value={formik.values.ProductName} onChange={formik.handleChange} />
                            </div>
                        </div>
                    </label>
                    <div className="w-full flex h-4 mb-1">
                        <div className="w-5/12"></div>
                        {formik.errors.ProductName && formik.touched.ProductName ? <div className="w-7/12 text-xs text-red-500">{formik.errors.ProductName}</div> : <div className="w-7/12 text-xs text-red-300"></div>}
                    </div>

                    <label className="edit-table-details-label edit-user-details">
                        <div className="flex w-full items-center justify-end">
                            <h1 className="w-3/12">Category:</h1>
                            {/* <input className="edit-form-field email-field w-7/12" type="text" name="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} /> */}
                            <div className="w-7/12">
                                {/* <CategorySelect selectedCategory={selectedCategory} setSelectdCategory={setSelectdCategory} CategoriesArray={CategoriesArray} ChangeCategory={ChangeCategory} /> */}
                                 <SelectCategoryForProduct selectedCategoryID={selectedCategoryID} CategoriesArray={CategoriesArray} ChangeCategory={ChangeCategory} />
                            </div>
                        </div>
                    </label>
                    <div className="w-full flex h-4 mb-1">
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
                    <div className="w-full flex h-4 mb-1">
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
                    <div className="w-full flex h-4 mb-1">
                        <div className="w-5/12"></div>
                        {formik.errors.ProductQuantity && formik.touched.ProductQuantity ? <div className="w-7/12 text-xs text-red-500">{formik.errors.ProductQuantity}</div> : <div className="w-7/12 text-xs text-red-300"></div>}
                    </div>

                    <label className="edit-table-details-label edit-user-details">
                        <div className="flex w-full items-center justify-end">
                            <h1 className="w-3/12">Status:</h1>
                            {/* <input className="edit-form-field email-field w-7/12" type="text" name="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} /> */}
                            <div className="w-7/12"> <CustomSelect status={status} ChangeStatus={ChangeStatus} /></div>
                        </div>
                    </label>
                    <div className="w-full flex h-4 mb-1">
                        <div className="w-5/12"></div>
                        <div className="w-7/12 text-xs text-red-300" ></div>
                    </div>


                    

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <label className="edit-table-details-label  edit-user-details">
                            <div className="flex w-full items-center justify-end ">
                                <h1 className="w-3/12">Created At:</h1>
                                {/* <input className="edit-form-field mobile-field w-7/12" type="number" min={1} name="mobile" value={formik.values.mobile} placeholder="Enter your moblile number" onChange={formik.handleChange} /> */}
                                <div className="w-7/12">
                                    <DesktopDatePicker defaultValue={dayjs(defaultDate)} disabled />
                                </div>

                            </div>
                        </label>
                        <div className="w-full flex h-4 mb-1">
                            <div className="w-5/12"></div>
                            <div className="w-7/12 text-xs text-red-300"></div>
                        </div>
                    </LocalizationProvider>



                    {/* {passErr ? <label className="password-err">Password and Confirm-Password does not match</label> : <></>} */}
                    <div className="flex w-3/4 justify-center gap-5  ">
                        <button type="submit" className="Submit-edit-details-button mt-4" >Submit</button>

                        <button className="Cancel-edit-details-button  mt-4" onClick={CancelAddProductForm}>Cancel</button>

                    </div>
                </form>
            </div>

        </div>
    </CustomModal>
}