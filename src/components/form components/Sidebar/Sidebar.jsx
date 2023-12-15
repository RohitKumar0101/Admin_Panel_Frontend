import { useLocation, useNavigate } from 'react-router';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import "./Sidebar.css"
import { useDropzone } from 'react-dropzone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState } from 'react';


export default function Sidebar({file}) {
// console.log(file);
  const myLocation = useLocation().pathname;
  const updatedLocation = myLocation.substring(1);
  const FirstName = localStorage.getItem("fisrtName");
  const LastName = localStorage.getItem("lastName");
  const FullName = localStorage.getItem("fullName");
  // console.log(FullName);
  

  const PersonOutlineStyle =
        { height: "100%", width: "100%", borderRadius: "100%", backgroundColor: "#B9D9EB",color:"black", cursor: "pointer", padding:"10px" }

  const navigate = useNavigate();
  // const location = myLocation

  const RedirectLoginEvent = () => {
    // window.location.href="/login";
    navigate("/");
  }

  const RedirectToProductsEvent = () => {
    navigate("/products");
  }

  const RedirectToHomeEvent = () => {
    navigate("/");
  }

  const RedirectToUsersEvent = () => {
    navigate("/users")
  }

  return <div className="sidebar-container h-full">
    <div className="user w-full  flex   mb-10 h-16 items-center justify-center ">
      {/* <img src='D:\admin_panel_project\blog_project\public\logo512.png'  /> */}
      <div className='userName font-bold  rounded-full mt-10   h-full  w-3/12 break-normal text-xs  lg:text-xs sm:text-xs xs:text-3xl md:text-xs'>
                            {/* <div className="w-full h-40  flex justify-center items-center rounded-full group  cursor-pointer  relative"  >
                                }
                            </div> */}
                            {file ? <img className="rounded-full group hover:opacity-30  h-full w-full "  src={file} alt="Upload Image..."  /> : <PersonOutlineIcon sx={{ "&:hover": { opacity: "0.7" } }} style={PersonOutlineStyle} />}
                        </div>
      
    </div>
    <div className="nav-list flex flex-col w-full ">
      <div className={updatedLocation == "" ? "Dashboard bg-blue-200  hover:text-indigo-500 hover:bg-blue-400 cursor-pointer flex items-center justify-start  min-h- h-10 border rounded-lg gap-2 mb-5 w-11/12  " : "Dashboard w-full hover:text-white bg-blue-200 hover:bg-blue-500 cursor-pointer flex justify-start   items-center h-10   gap-5  mb-2 "} onClick={RedirectToHomeEvent}>
        <DashboardIcon style={{marginLeft:"60px"}}/>
        <h1 className='font-seris  hover:text-white break-all text-sm lg:text-base sm:text-xs xs:text-xs ' >Dashboard</h1>
      </div>

      <div className={updatedLocation == "profile"?'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10 text-white  bg-blue-500  gap-5 mb-2 w-full':'login hover:text-white  hover:bg-blue-500 hover:text-opacity-100  cursor-pointer  flex items-center justify-start h-10   bg-blue-200  gap-5 mb-2 w-full'} onClick={RedirectLoginEvent}>
        <AccountBoxIcon style={{marginLeft:"60px"}}/>
        <h1 className='font-seris  break-all'>Profile</h1>
      </div>

      <div className={updatedLocation == "users" ? 'users bg-blue-200 hover:text-white hover:bg-blue-500 cursor-pointer mb-5 flex items-center justify-start h-10  rounded-lg gap-2 w-full' : 'Product w-full  hover:text-white bg-blue-200 hover:bg-blue-500 cursor-pointer mb-2  flex items-center justify-start h-10  gap-5'} onClick={RedirectLoginEvent}>



       <LogoutIcon style={{marginLeft:"60px"}}/>
        <h1 className='font-seris break-all'>Logut</h1>
      </div>


    </div>

  </div>
  // </div>
}