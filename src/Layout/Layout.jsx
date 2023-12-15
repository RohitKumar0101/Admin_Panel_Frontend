import { Divider } from "@mui/material"
import Navbar from "../components/form components/Navbar/Navbar"
import Sidebar from "../components/form components/Sidebar/Sidebar"
import { Footer } from "../components/form components/Footer/Footer"
import { useState } from "react"

// export const Layout = (props) => {
//     return <div>
//       {props.children}
//     </div>
// }
export const Layout = ({file,children}) => {
    console.log(file , '-------- here ----------')
    return <div className="flex  w-full h-screen bg-gray-100">
        {/* <div className="w-1/6 min-h-[calc(100vh-73.6px)]"> */}
        <div className="w-1/6">
            <Sidebar file={file}  />
        </div>
        <div className="w-5/6 flex flex-col">
            <Navbar file={file} />
            {children}
            <Footer />
        </div>

    </div>



}