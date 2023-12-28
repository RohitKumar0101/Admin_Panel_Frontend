import { Button } from "@mui/material"
import { Layout } from "../../Layout/Layout"
import { CustomTable } from "../../components/Table/Table"
import React from "react";
import { InventoryForm } from "../../components/InventoryForm/InventoryForm";
import CustomSnackbar from "../../components/Snackbar/Snackbar";
import { ChangeCategoriesStore, GetCategoriesData } from "../../utility/utility";
import { EditCategoryForm } from "../../components/EditCategoryForm/EditCategoryForm";




export const Categories = () => {
    const [open, setOpen] = React.useState(false);
    const [openCategoryCreationSnacker, setOpenCategoryCreationSnacker] = React.useState(false);
    const [CategoriesArray, setCategoriesArray] = React.useState(GetCategoriesData());
    const [openEditCategoryForm,setOpenEditCategoryForm] = React.useState(false);
    // let CategoriesArray = GetCategoriesData();

    const ChangeStateFromButton = (e) => {
        console.log("Change Request Recieved");
        console.log(CategoriesArray);
        console.log(e.target.id);
        let NewArray = CategoriesArray && CategoriesArray.map((row) => {
            if (row.CategoryName === e.target.id) {
                return { ...row, Status: !row.Status }
            }
            return row
        })
        // CategoriesArray = NewArray;
        setCategoriesArray(NewArray);
        ChangeCategoriesStore(NewArray);

    }


    const handleOpenEditCategoryForm = ()=>setOpenEditCategoryForm(true);
    const handleCloseEditCategoryForm = ()=>setOpenEditCategoryForm(false);

    const handleOpen = () => setOpen(true);
    
    const handleSnackbar = () => {
        setOpenCategoryCreationSnacker((prev) => !prev);
    }


    const handleCategoriesArray = (data)=>{
      setCategoriesArray(prev=>[...prev,data]);
    }


    return <Layout>
        <div className="mt-12 w-11/12 ml-8">
            <div className="flex w-full justify-end mb-6">
                <Button style={{ backgroundColor: "blue", color: "white", opacity: "65%" }} onClick={handleOpen}>Add Category</Button>
            </div>
            <div className="bg-white p-2">
                <h3 className="text-lg font-medium w-2/6 flex justify-start mb-2 opacity-90">Manage Categories</h3>
                <div>
                    <CustomTable CategoriesArray={CategoriesArray} ChangeStateFromButton={ChangeStateFromButton}  handleOpenEditCategoryForm={handleOpenEditCategoryForm} />
                </div>
            </div>
            <InventoryForm open={open} setOpen={setOpen} handleOpen={handleOpen} handleCategoriesArray={handleCategoriesArray}  handleSnackbar={handleSnackbar} />
            <EditCategoryForm open={openEditCategoryForm} handleCloseEditCategoryForm={handleCloseEditCategoryForm}  />
            <CustomSnackbar open={openCategoryCreationSnacker} message="Category created successfully" />
        </div>
    </Layout>
}