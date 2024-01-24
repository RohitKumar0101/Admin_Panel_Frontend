import { Divider } from "@mui/material"
import Navbar from "../components/form components/Navbar/Navbar"
import { Sidebar } from "../components/form components/Sidebar/Sidebar"
import { Footer } from "../components/form components/Footer/Footer"
import { useState } from "react"
import { GoogleOAuthProvider } from "@react-oauth/google"

// export const Layout = (props) => {
//     return <div>
//       {props.children}
//     </div>
// }
export const Layout = ({ file, children }) => {
    const userInfo = JSON.parse(localStorage.getItem("LoggedUserData"));
    return <div className="flex  w-full h-screen bg-gray-100">
        {/* <div className="w-1/6 min-h-[calc(100vh-73.6px)]"> */}
        <div className="w-1/6">
            <Sidebar userInfo={userInfo} />
        </div>
        <div className="w-5/6 flex flex-col ">
            <Navbar userInfo={userInfo} />
                {children}
            <Footer />
        </div>

    </div>

}