import * as React from 'react';

// const MergeData = (data,setArray)=>{
//  setArray((prev)=>[...prev,data]);
// }

//@info : 
export const CategoriesStore = (e,changeStorageArray)=>{
    // const localSotrageData = ([] || localStorage.getItem(JSON.parse("CategoryData")))
    // MergeData(e,setArray);
    const array = localStorage.getItem("CategoryData") ? JSON.parse(localStorage.getItem(("CategoryData"))) : []
    console.log("Heloo from local storage");
    console.log(e);
    console.log(array)
    array.push(e);
    localStorage.setItem("CategoryData",JSON.stringify(array));
    

}


export const GetCategoriesData = ()=>{
    const myData=localStorage.getItem("CategoryData")?JSON.parse(localStorage.getItem("CategoryData")):[];
    return myData;
}

export const HandleTableId = ()=>{
    const myId = localStorage.getItem("ID");
    localStorage.setItem("ID",`${myId+1}`);
    return myId;
}

export const ChangeCategoriesStore = (data)=>{
    localStorage.setItem("CategoryData",JSON.stringify(data));
}