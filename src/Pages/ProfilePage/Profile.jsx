import { useCallback, useState } from "react";
import { Layout } from "../../Layout/Layout"
import "./Profile.css";
import { useDropzone } from "react-dropzone";
import { getIn } from "formik";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EditIcon from '@mui/icons-material/Edit';
import { hover } from "@testing-library/user-event/dist/hover";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import EditTable from "../../components/form components/modal/modal";
import { useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";

export const Profile = ({ file,setFile,className,open,handleSnacker}) => {
    //  handleSnacker();
    // const [file, setFile] = useState();
    const [userDetails,setUserDetails] = useState({fullName:"John smith",email:"JohnSmith@gmail.com",mobile:+914142314123,address:"CA,LosAngelos-America",designation:"Fullstack Developer"});
    
    const userInfo = JSON.parse(localStorage.getItem("LoggedUserData"));


    const myLocation = useLocation().pathname.substring(1);
    if(myLocation === "profile"){
        console.log("error");
    }


    const onDrop = useCallback(acceptedFiles => {    // This funciton will only run whenever i dropped any file

        console.log(URL.createObjectURL(acceptedFiles[0]));
        // localStorage.setItem(URL.createObjectURL(acceptedFiles[0]));
        userInfo.Image = (URL.createObjectURL(acceptedFiles[0]));
        localStorage.setItem("LoggedUserData",JSON.stringify(userInfo));
        // const url = URL.createObjectURL(acceptedFiles.)

    })


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const PersonOutlineStyle =
        { height: "100%", width: "100%", borderRadius: "100%", backgroundColor: "#B9D9EB", cursor: "pointer", padding:"10px" }





    const handleChange = (e) => {
        if (e.target.files) {
            const result = URL.createObjectURL(e.target.files[0]);
            setFile(result);
        }
    }



    return <Layout file={file}>

        <div className="profile-container bg-gray-100 my-8 ml-8   ">

            <div><h1 className="text-2xl font-bold flex justify-start  opacity-80">Account Details</h1> </div>
            {/* <div className="profile-picture h-24 w-17  flex flex-col items-center gap-1 ml-3">
                <div className="image h-full w-1/12 ">
                    {file && <img className=" border w-full h-full rounded-full border-current " src={file} />}
                </div>
                <div className="image-upload flex  gap-1 ">
                    <div className="change-image-input border border-current rounded-xl  bg-gray-700 text-xs text-white p-1 flex relative">
                        <span className="text-l font-medium  ">Change picture </span>
                        <input className="cursor-pointer" type='file' accept="image/*" multiple={false} onChange={handleChange} placeholder="Choose image" />
                    </div>
                </div>
            </div>
            <div className="user-information-inputs">
            <div className="name-input">
            <input className="profile-name" type="text" value="Rohit"/>
            <input className="profile-name" type="text" value="Kumar"/>
            </div>
            </div> */}



            <div className="flex mt-6 justify-start  items-center gap-12  ">


                <div className="picture-section bg-neutral-50  w-3/12 h-96  rounded-xl shadow-xl flex flex-col gap-1 ">

                    <div className="h-3/5 w-full items-center flex flex-col justify-center items-center ">

                        <div {...getRootProps({
                            className: className
                        })} className="w-1/2  rounded-full h-full flex justify-center items-center relative" >
                            <input {...getInputProps()} />
                            {/* {isDragActive ? (<p>Drop Files here...</p>) : (<p>Drag some files</p>)} */}
                            <div className="w-full h-40  flex justify-center items-center rounded-full group  cursor-pointer  relative"  >
                               
                                {userInfo.Image ?  <img src={userInfo.Image} alt="Upload Image..." className="rounded-full group hover:opacity-30  h-full w-full object-fill" /> : <PersonOutlineIcon sx={{ "&:hover": { opacity: "0.7" } }} style={PersonOutlineStyle} />}
                               
                                <div className=" hidden  group-hover:block h-full w-full rounded-full bg-gray-100 bg-opacity-60 absolute p-12"><Tooltip title="Change picture" arrow><AddAPhotoIcon style={{height:"70%",width:"70%"}}/></Tooltip></div>
                            </div>
                        </div>
                    </div>
                    <hr className="w-full" />
                    <div className="flex flex-col gap-2">

                        <span className="text-3xl font-bold opacity-70">{userInfo.name}</span>
                        <span className="text-xl font-semibold opacity-60" > {userDetails.designation}</span>
                        <span className="text-lg  font-medium opacity-50">{userDetails.address}</span>
                    </div>

                </div>

                <div className="info-section bg-neutral-50	relative rounded-2xl w-4/6  h-96 shadow-xl ">
                    <div className="h-full w-full  flex flex-col justify-evenly items-center">

                        <div className="w-10/12 flex flex-col  ">
                            <div className="w-full flex gap-12">
                                <div className="flex w-1/5 " >
                                    <span className="ml-4 text-lg font-semibold opacity-80">Full Name</span>
                                </div>
                                <div className="w-3/5 flex justify-start">
                                    <span className="text-lg font-normal opacity-70">{userInfo.name}</span>
                                </div>
                            </div>
                            <span className="border border-current w-full  opacity-20 mt-7" ></span>
                        </div>

                        <div className="w-10/12 flex flex-col">
                            <div className="w-full flex gap-12">
                                <div className="flex w-1/5" >
                                    <span className="ml-4 text-lg font-semibold opacity-80">Email</span>
                                </div>
                                <div className="w-3/5 flex justify-start">
                                    <span className="text-lg font-normal opacity-70">{userInfo.email}</span>
                                </div>
                            </div>
                            <span className="border border-current w-full  opacity-20 mt-7" ></span>
                        </div>

                        <div className="w-10/12 flex flex-col">
                            <div className="w-full flex gap-12">
                                <div className="flex w-1/5" >
                                    <span className="ml-4 text-lg font-semibold opacity-80">Phone</span>
                                </div>
                                <div className="w-3/5 flex justify-start">
                                    <span className="text-lg font-normal opacity-70">{userDetails.mobile}</span>
                                </div>
                            </div>
                            <span className="border border-current w-full  opacity-20 mt-7" ></span>
                        </div>


                        <div className="w-10/12 flex flex-col">
                            <div className="w-full flex gap-12">
                                <div className="flex w-1/5" >
                                    <span className="ml-4 text-lg font-semibold opacity-80">Address</span>
                                </div>
                                <div className="w-3/5 flex justify-start">
                                    <span className="text-lg font-normal opacity-70">{userDetails.address}</span>
                                </div>
                            </div>
                            <span className="border border-current w-full  opacity-20 mt-7" ></span>
                        </div>


                        <div className="w-10/12 flex flex-col">
                            <div className="w-full flex gap-12">
                                <div className="flex w-1/5" >
                                    <span className="ml-4 text-lg font-semibold opacity-80">Designation</span>
                                </div>
                                <div className="w-3/5 flex justify-start">
                                    <span className="text-lg font-normal opacity-70">{userDetails.designation}</span>
                                </div>
                            </div>
                            
                        </div>
                        {/* <div className="flex justify-around "></div>
                        <div className="flex justify-around "></div>
                        <div className="flex justify-start gap-6"></div>
                        <div className="flex justify-start gap-6"></div>
                        <div className="flex justify-start gap-6"></div> */}
                        <div className="absolute w-full h-full flex justify-end">
                           
                        <EditTable userDetails={userDetails} setUserDetails={setUserDetails} snackerOpen={open} handleSnacker={handleSnacker}/>
                        </div>
                    </div>
                </div >

            </div>
        </div>


    </Layout>
}