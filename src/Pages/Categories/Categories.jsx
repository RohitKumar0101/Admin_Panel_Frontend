import { Button } from "@mui/material"
import { Layout } from "../../Layout/Layout"
import { CustomTable } from "../../components/Table/Table"
import React, { useState } from "react";
import { InventoryForm } from "../../components/InventoryForm/InventoryForm";
import CustomSnackbar from "../../components/Snackbar/Snackbar";
import { CategoryExistInProductTableBoolean, ChangeCategoriesStore, GetCategoriesData, GetCategoryOptions } from "../../utility/Common";
import { EditCategoryForm } from "../../components/EditCategoryForm/EditCategoryForm";
import { ConfirmDailog } from "../../components/ConfirmationDailog/ConfirmationDailog";
import { FilterItems } from "../../components/FilterItems/FilterItems";

const CategoryFilterBoolean = true


export const Categories = () => {
    const [open, setOpen] = React.useState(false);
    const [openCategoryCreationSnacker, setOpenCategoryCreationSnacker] = React.useState(false);
    const [options, setCategoryOptions] = React.useState(GetCategoryOptions(CategoryFilterBoolean))
    const [openEditCategorySnackbar, setOpenEditCategorySnackbar] = React.useState(false);
    const [openCancelStatusChangeSnackbar, setOpenCancelStatusSnackbar] = React.useState(false);
    const [CategoriesArray, setCategoriesArray] = React.useState(GetCategoriesData());
    const [openEditCategoryForm, setOpenEditCategoryForm] = React.useState(false);
    const [selectedRowData, setSelectedRowData] = React.useState({});
    const [StatusChangeSnackbar, setStatusChangeSnackbar] = React.useState(false);
    const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
    const [DeleteRowData, setDeleteRowData] = React.useState({});
    const [DeleteConfirmSnackbar, setDeleteConfirmSnackbar] = React.useState(false);

   
    const handleRestictEditCategory = () => {
        setOpenCancelStatusSnackbar(prev => !prev);
    }
    // let CategoriesArray = GetCategoriesData();

    const ChangeStateFromButton = (e) => {

        console.log("Change Request Recieved");
        console.log(CategoriesArray);
        console.log(e);
        const CategoryExistBoolean = CategoryExistInProductTableBoolean(e.target.id);
        if (CategoryExistBoolean) {
            handleRestictEditCategory();
            setTimeout(() => {
                handleRestictEditCategory();
            }, 2000);
            return;
        }
        let NewArray = CategoriesArray && CategoriesArray.map((row) => {
            if (row.ID == e.target.id) {
                return { ...row, Status: !row.Status }
            }
            return row
        })
        // CategoriesArray = NewArray;
        ChangeCategoriesStore(NewArray);
        ShowCategories();
        handleStatusChangeSnackbar();
        setTimeout(() => {
            handleStatusChangeSnackbar();
        }, 1000);

    }

    const handleEditCategorySnackbar = () => {
        setOpenEditCategorySnackbar((prev) => !prev);
    }

    const ShowCategories = () => {
        setCategoriesArray(JSON.parse(localStorage.getItem("CategoryData")));
    }

    const handleSortCategories = (data) => {
        setCategoriesArray(data);
    }

    const handleStatusChangeSnackbar = () => {
        setStatusChangeSnackbar((prev) => !prev)
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
    const handleOpen = () => setOpen(true);

    const handleSnackbar = () => {
        setOpenCategoryCreationSnacker((prev) => !prev);
    }

    const handleDeleteAgreeOpen = (row) => {
        let CategoryExistBoolean = CategoryExistInProductTableBoolean(row.ID);
        if (CategoryExistBoolean) {
            handleRestictEditCategory();
            setTimeout(() => {
                handleRestictEditCategory();
            }, 2000);
        }
        else {
            setOpenDeleteConfirm(true);
            setDeleteRowData(row);
        }
    };

    const handleDeleteSnackbar = () => {
        setDeleteConfirmSnackbar(prev => !prev);
    }



    const handleCategoriesArray = (data) => {
        setCategoriesArray(prev => [...prev, data]);
    }

    const handleFilterOnCategory = (data) => {
        console.log(data);
        const OrignalArray = GetCategoriesData();
        if (data == null) {
            setCategoriesArray(OrignalArray);
            return;
        }
        const FilteredProductsArray = OrignalArray.filter((item) => {
            return (item.CategoryName === data);
        })
        console.log(FilteredProductsArray);
        setCategoriesArray(FilteredProductsArray);
    }


    return <Layout>
        <div className="mt-2 w-11/12 ml-8">
            <div className="flex w-full justify-end mb-2">
                <Button style={{ backgroundColor: "blue", color: "white", opacity: "65%" }} onClick={handleOpen}>Add Category</Button>
            </div>
            <div className="bg-white p-1">
                <h3 className="text-lg font-medium w-2/6 flex justify-start  opacity-90">Manage Categories</h3>
                <div className="flex flex-col gap-1">
                    <div className="w-11/12 ml-14 flex justify-end mb-1">
                    <FilterItems CategoryFilterBoolean={CategoryFilterBoolean} options={options} handleFilterOnCategory={handleFilterOnCategory} />
                    </div>
                    <CustomTable handleRestictEditCategory={handleRestictEditCategory} handleSortCategories={handleSortCategories} CategoriesArray={CategoriesArray} handleDeleteAgreeOpen={handleDeleteAgreeOpen} ChangeStateFromButton={ChangeStateFromButton} handleStatusChangeSnackbar={handleStatusChangeSnackbar} ShowCategories={ShowCategories} handleOpenEditCategoryForm={handleOpenEditCategoryForm} />
                </div>
            </div>
            <InventoryForm CategoryFilterBoolean={CategoryFilterBoolean} open={open} setOpen={setOpen} handleOpen={handleOpen} handleCategoriesArray={ShowCategories} handleSnackbar={handleSnackbar} ShowCategories={ShowCategories} />
            {openEditCategoryForm && <EditCategoryForm handleRestictEditCategory={handleRestictEditCategory} open={openEditCategoryForm} handleEditCategorySnackbar={handleEditCategorySnackbar} handleCloseEditCategoryForm={handleCloseEditCategoryForm} ShowCategories={ShowCategories} selectedRowData={selectedRowData} />}
            <CustomSnackbar open={openCategoryCreationSnacker} message="Category created successfully" />
            <CustomSnackbar open={openCancelStatusChangeSnackbar} message="Action unsuccessful product exists under this category" color="error" />
            <CustomSnackbar open={StatusChangeSnackbar} message="Status Changed Successfully" />
            <CustomSnackbar open={DeleteConfirmSnackbar} message="Category deleted successfully" />
            <CustomSnackbar open={openEditCategorySnackbar} message="Category Edited successfully" />
            <ConfirmDailog ShowCategories={ShowCategories} handleDeleteSnackbar={handleDeleteSnackbar} rowData={DeleteRowData} open={openDeleteConfirm} setOpen={setOpenDeleteConfirm} handleDeleteAgreeOpen={handleDeleteAgreeOpen} />
        </div>
    </Layout>
}