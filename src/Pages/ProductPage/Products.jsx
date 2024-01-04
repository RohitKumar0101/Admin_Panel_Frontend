import { Button } from "@mui/material"
import { Layout } from "../../Layout/Layout"
import { CustomTable } from "../../components/Table/Table"
import React, { useState } from "react";
import { InventoryForm } from "../../components/InventoryForm/InventoryForm";
import CustomSnackbar from "../../components/Snackbar/Snackbar";
import { ChangeCategoriesStore, ChangeProductsData, GetCategoriesData } from "../../utility/Common";
import { EditCategoryForm } from "../../components/EditCategoryForm/EditCategoryForm";
import {ConfirmDailog} from "../../components/ConfirmationDailog/ConfirmationDailog";
import { AddProductForm } from "../../components/AddProductForm/AddProductForm";
import { ProductTable } from "../../components/ProductTable/ProductTable";
import { EditProductDetailsForm } from "../../components/EditProductDetailsForm/EditProductDetailsForm";



export const Products = ({ file }) => {
    const [CategoriesArray, setCategoriesArray] = React.useState(localStorage.getItem("CategoryData") ? JSON.parse(localStorage.getItem(("CategoryData"))) : []);
    const [open, setOpen] = React.useState(false);
    const [openEditProductDetailsForm,setOpenProductEditDetailsForm] = useState(false);
    const [openEditProductSnackbar,setOpenEditProductSnackbar] = useState(false);
    const [productDeleteSnackbar,setProductDeleteSnackbar] = useState(false);
    const [selectedEditProduct,setSelectedEditProduct] = useState({});
    const [openAddProductSnackbar,setOpenAddProductSnackbar] = React.useState(false);
    const [openCategoryCreationSnacker, setOpenCategoryCreationSnacker] = React.useState(false);
    // const [CategoriesArray, setCategoriesArray] = React.useState(GetCategoriesData());
    const [openEditCategoryForm, setOpenEditCategoryForm] = React.useState(false);
    const [selectedRowData, setSelectedRowData] = React.useState({});
    const [StatusChangeSnackbar, setStatusChangeSnackbar] = React.useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
    const [DeleteRowData, setDeleteRowData] = React.useState({});
    const [DeleteConfirmSnackbar, setDeleteConfirmSnackbar] = React.useState(false);
    const [AddProductFormOpen,setAddProductFormOpen] = React.useState(false);
    // let CategoriesArray = GetCategoriesData();

    const [ProductsArray, setProductsArray] = React.useState(localStorage.getItem("ProductsData") ? JSON.parse(localStorage.getItem(("ProductsData"))) : []);

    const ShowNewProducts = ()=>{
        setProductsArray(JSON.parse(localStorage.getItem("ProductsData")));
    }
 
    const ChangeStatusFromButton = (e) => {

        console.log("Change Request Recieved");
        console.log(ProductsArray);
        console.log(e);
        let NewArray = ProductsArray && ProductsArray.map((row) => {
            console.log(row.ID);
            console.log(e.target.id);
            if (row.ID == e.target.id) {
                return { ...row, Status: !row.Status }
            }
            return row
        })
        console.log(NewArray);
        // CategoriesArray = NewArray;
        ChangeProductsData(NewArray);
        ShowNewProducts();
        handleStatusChangeSnackbar();
        setTimeout(() => {
            handleStatusChangeSnackbar();
        }, 1000);

    }

    const ShowCategories = () => {
        setCategoriesArray(JSON.parse(localStorage.getItem("CategoryData")));
    }

    const handleStatusChangeSnackbar = () => {
        setStatusChangeSnackbar((prev) => !prev)
    }

    const handleEditProductSnackbar = ()=>{
        setOpenEditProductSnackbar(prev=>!prev)
    }


    const handleOpenEditCategoryForm = (row) => {
        setOpenEditCategoryForm(true);
        setSelectedRowData(row);
        console.log(row);
    }
    const handleCloseEditCategoryForm = () => {
        setOpenEditCategoryForm(false);
        setSelectedRowData({});
    }
    const handleOpen = () => setAddProductFormOpen(true);

    const handleAddProductSnackbar = () => {
        setOpenAddProductSnackbar((prev) => !prev);
    }

    const handleDeleteAgreeOpen = (row) => {
        setOpenDeleteConfirm(true);
        setDeleteRowData(row);
    };

    const handleDeleteSnackbar = () => {
        setDeleteConfirmSnackbar(prev => !prev);
    }

    const handleOpenProductEditForm = (data)=>{
        console.log(data);
        setSelectedEditProduct(data);
        setOpenProductEditDetailsForm(true)
    }

    const handleCloseProductEditForm = ()=>{
        setOpenProductEditDetailsForm(false);
    }

    const handleProductDeleteSnackbar = ()=>{
        setProductDeleteSnackbar(prev=>!prev);
    }



    const handleCategoriesArray = (data) => {
        setCategoriesArray(prev => [...prev, data]);
    }
    return <Layout file={file}>
        <div className="mt-8 w-11/12 ml-8">
            <div className="flex w-full justify-end mb-6">
                <Button style={{ backgroundColor: "blue", color: "white", opacity: "65%" }} onClick={handleOpen}>Add Product</Button>
            </div>
            <div className="bg-white p-2">
                <h3 className="text-lg font-medium w-2/6 flex justify-start mb-2 opacity-90">Manage Products</h3>
                <div>
                    <ProductTable handleProductDeleteSnackbar={handleProductDeleteSnackbar} ShowNewProducts={ShowNewProducts} handleOpenProductEditForm={handleOpenProductEditForm} handleCloseProductEditForm={handleCloseProductEditForm}  ProductsArray={ProductsArray} ChangeStatusFromButton={ChangeStatusFromButton} openEditProductDetailsForm={openEditProductDetailsForm}/>
                    {/* <CustomTable CategoriesArray={CategoriesArray} handleDeleteAgreeOpen={handleDeleteAgreeOpen} ChangeStateFromButton={ChangeStateFromButton} handleStatusChangeSnackbar={handleStatusChangeSnackbar} ShowCategories={ShowCategories} handleOpenEditCategoryForm={handleOpenEditCategoryForm} /> */}
                </div>
            </div>
            <AddProductForm CategoriesArray={CategoriesArray} AddProductFormOpen={AddProductFormOpen} ShowNewProducts={ShowNewProducts} handleAddProductSnackbar={handleAddProductSnackbar} setAddProductFormOpen={setAddProductFormOpen}/>
            {openEditProductDetailsForm && <EditProductDetailsForm handleEditProductSnackbar={handleEditProductSnackbar} ShowNewProducts={ShowNewProducts} CategoriesArray={CategoriesArray} open={openEditProductDetailsForm} ProductsArray={ProductsArray} selectedEditProduct={selectedEditProduct} handleCloseProductEditForm={handleCloseProductEditForm}  />}
            <CustomSnackbar open={openAddProductSnackbar} message="Product Created successfully" />
            <CustomSnackbar open={openEditProductSnackbar} message="Product Edited successfully" />
            <CustomSnackbar open={StatusChangeSnackbar} message="Status Changed Successfully" />
            <CustomSnackbar open={productDeleteSnackbar} message="Product Deleted Successfully" />
            <ConfirmDailog ShowCategories={ShowCategories} handleDeleteSnackbar={handleDeleteSnackbar} rowData={DeleteRowData} open={openDeleteConfirm} setOpen={setOpenDeleteConfirm} handleDeleteAgreeOpen={handleDeleteAgreeOpen} />
        </div>
    </Layout>
}