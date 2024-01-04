import moment from 'moment/moment';
import * as React from 'react';
import { date } from 'yup';

// const MergeData = (data,setArray)=>{
//  setArray((prev)=>[...prev,data]);
// }


export const ProductsStore = (data)=>{
const array = localStorage.getItem("ProductsData") ? JSON.parse(localStorage.getItem(("ProductsData"))) : [];
const ID = Date.now();
const ProductObjectWithId = {...data,ID};
array.unshift(ProductObjectWithId);
localStorage.setItem("ProductsData",JSON.stringify(array)); 
}


//@info : 
export const CategoriesStore = (e) => {
    // const localSotrageData = ([] || localStorage.getItem(JSON.parse("CategoryData")))
    // MergeData(e,setArray);

    const array = localStorage.getItem("CategoryData") ? JSON.parse(localStorage.getItem(("CategoryData"))) : [];
    console.log("Heloo from local storage");
    console.log(e);
    const ID = Date.now();
    const ObjectWithId = { ...e, ID };
    array.unshift(ObjectWithId);
    // const ReversedArray = array.reverse();
    localStorage.setItem("CategoryData", JSON.stringify(array));
}


export const GetCategoriesData = () => {
    const myData = localStorage.getItem("CategoryData") ? JSON.parse(localStorage.getItem("CategoryData")) : [];
    return myData;
}

export const HandleTableId = () => {
    const myId = localStorage.getItem("ID");
    localStorage.setItem("ID", `${myId + 1}`);
    return myId;
}

export const ChangeCategoriesStore = (data) => {
    localStorage.setItem("CategoryData", JSON.stringify(data));
}

export const ChangeProductsData = (data) => {
    localStorage.setItem("ProductsData", JSON.stringify(data));
}

export const AddEditCategory = (data) => {
    // console.log(OldId);
    
    const array = localStorage.getItem("CategoryData") ? JSON.parse(localStorage.getItem(("CategoryData"))) : []
   
    const indexToUpdate = array.findIndex(item => item.ID === data.ID);
    // console.log(indexToUpdate);
    array[indexToUpdate] = data;
    localStorage.setItem("CategoryData", JSON.stringify(array));
    // console.log(array);
}

export const AddEditProduct = (data) =>{
    const array = JSON.parse(localStorage.getItem(("ProductsData")));
   
    const indexToUpdate = array.findIndex(item => item.ID === data.ID);
    // console.log(indexToUpdate);
    array[indexToUpdate] = data;
    localStorage.setItem("ProductsData", JSON.stringify(array));
}

export const DateFormatConverter = (data) => {
    
    let ConvertedDate = moment(data, "YYYY-MM-DD").format("LL");
    return (ConvertedDate)
}

export const DeleteAgreedRow =(data)=>{
    const array = JSON.parse(localStorage.getItem("CategoryData"));
   const NewArray =  array.filter((item)=>{
         return item.ID !== data.ID
   })
   localStorage.setItem("CategoryData",JSON.stringify(NewArray));
}

export const DeleteAgreedProduct = (data)=>{
    const array = JSON.parse(localStorage.getItem("ProductsData"));
   const NewArray =  array.filter((item)=>{
         return item.ID !== data.ID
   })
   localStorage.setItem("ProductsData",JSON.stringify(NewArray));
}