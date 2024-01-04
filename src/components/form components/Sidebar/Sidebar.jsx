import { useLocation, useNavigate } from 'react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';import "./Sidebar.css"
import { useDropzone } from 'react-dropzone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState } from 'react';


export const Sidebar = ({ userInfo }) => {
  // console.log(file);
  const myLocation = useLocation().pathname;
  const updatedLocation = myLocation.substring(1);
  const FirstName = localStorage.getItem("fisrtName");
  const LastName = localStorage.getItem("lastName");
  const FullName = localStorage.getItem("fullName");
  // console.log(FullName);


  const PersonOutlineStyle =
    { height: "100%", width: "100%", borderRadius: "100%", backgroundColor: "#B9D9EB", color: "black", padding: "10px" }

  const navigate = useNavigate();
  // const location = myLocation

  const RedirectLoginEvent = () => {
    // window.location.href="/login";
    navigate("/");
  }

  const RedirectToCategories = ()=>{
    navigate("/categories");
  }
  const RedirectToProducts = ()=>{
    navigate("/products");
  }

  const RedirectToProfile = () => {
    navigate("/profile");
  }

  const RedirectToListing = () => {
    navigate("/listing");
  }

  const RedirectToBlock = () => {
    navigate("/block");
  }

  const RedirectToHomeEvent = () => {
    navigate("/");
  }

  const RedirectToUsersEvent = () => {
    navigate("/users")
  }

  return <div className="sidebar-container h-full">
    <div className="user w-full  flex   mb-14 h-16 items-center justify-center ">
      {/* <img src='D:\admin_panel_project\blog_project\public\logo512.png'  /> */}
      <div className='userName font-bold  rounded-full mt-10   h-full  w-3/12 break-normal text-xs  lg:text-xs sm:text-xs xs:text-3xl md:text-xs'>
        {/* <div className="w-full h-40  flex justify-center items-center rounded-full group  cursor-pointer  relative"  >
                                }
                            </div> */}
        {userInfo ? <img className="rounded-full h-full w-full object-fill" src={userInfo.Image} alt="Upload Image..." /> : <PersonOutlineIcon style={PersonOutlineStyle} />}
      </div>

    </div>
    <div className="nav-list flex flex-col w-full ">
      <div className={updatedLocation == "" ? "Dashboard bg-blue-200  hover:text-indigo-500 hover:bg-blue-400 cursor-pointer flex items-center justify-start  min-h- h-10 border rounded-lg gap-2 mb-5 w-11/12  " : "Dashboard w-full hover:text-white bg-blue-200 hover:bg-blue-500 cursor-pointer flex justify-start   items-center h-10   gap-5  mb-2 "} onClick={RedirectToHomeEvent}>
        <DashboardIcon style={{ marginLeft: "60px" }} />
        <h1 className='font-seris  hover:text-white break-all text-sm lg:text-base sm:text-xs xs:text-xs ' >Dashboard</h1>
      </div>

      <div className={updatedLocation == "profile" ? 'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10 text-white  bg-blue-500  gap-5 mb-2 w-full' : 'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10   bg-blue-200  gap-5 mb-2 w-full'} onClick={RedirectToProfile}>
        <AccountBoxIcon style={{ marginLeft: "60px" }} />
        <h1 className='font-seris  break-all'>Profile</h1>
      </div>

      <div className={updatedLocation == "categories" ? 'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10 text-white  bg-blue-500  gap-5 mb-2 w-full' : 'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10   bg-blue-200  gap-5 mb-2 w-full'} onClick={RedirectToCategories}>
        <ViewModuleIcon style={{ marginLeft: "60px" }} />
        <h1 className='font-seris  break-all'>Categories</h1>
      </div>

      <div className={updatedLocation == "products" ? 'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10 text-white  bg-blue-500  gap-5 mb-2 w-full' : 'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10   bg-blue-200  gap-5 mb-2 w-full'} onClick={RedirectToProducts}>
        <AddShoppingCartIcon style={{ marginLeft: "60px" }} />
        <h1 className='font-seris  break-all'>Products</h1>
      </div>



      <div className={updatedLocation == "listing" ? 'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10 text-white  bg-blue-500  gap-5 mb-2 w-full' : 'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10   bg-blue-200  gap-5 mb-2 w-full'} onClick={RedirectToListing}>
        <ListAltIcon style={{ marginLeft: "60px" }} />
        <h1 className='font-seris  break-all'>Listing</h1>
      </div>

      <div className={updatedLocation == "block" ? 'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10 text-white  bg-blue-500  gap-5 mb-2 w-full' : 'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10   bg-blue-200  gap-5 mb-2 w-full'} onClick={RedirectToBlock}>
        <TableRowsIcon style={{ marginLeft: "60px" }} />
        <h1 className='font-seris  break-all'>Block</h1>
      </div>

      <div className={updatedLocation == "users" ? 'users bg-blue-200 hover:text-white hover:bg-blue-500 cursor-pointer mb-5 flex items-center justify-start h-10  rounded-lg gap-2 w-full' : 'Product w-full  hover:text-white bg-blue-200 hover:bg-blue-500 cursor-pointer mb-2  flex items-center justify-start h-10  gap-5'} onClick={RedirectLoginEvent}>
        <LogoutIcon style={{ marginLeft: "60px" }} />
        <h1 className='font-seris break-all'>Logout</h1>
      </div>


    </div>

  </div>
  // </div>
}