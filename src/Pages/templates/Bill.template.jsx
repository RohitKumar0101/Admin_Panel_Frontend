import { Button } from "@mui/material";
import { PriceFormat } from "../../utility/Common"
import { CartTotalAmount, getOrderListForPrint, getUserDetilasObject, successfulOrderTotalAmount } from "../../utility/Common2"
import React from "react"
import ReactToPrint from "react-to-print";

export const BillTemplate = ({ CompleteOrder }) => {
    const userDetails = getUserDetilasObject();
    const ComponentRef = React.useRef()
    const FinalOrderList = getOrderListForPrint();

    return <div className="h-full w-full bg-gray-200 p-4 flex flex-col  ">
        <ReactToPrint trigger={() => <div className="w-full flex justify-end"><Button variant="contained">Print/Download Pdf</Button></div>} content={() => ComponentRef.current} />
        <div ref={ComponentRef} className="bill-template w-full  h-10/12 flex flex-col items-center gap-6 pt-4">
            <div className=" w-full h-10/12 flex flex-col items-center gap-2 py-4 justify-center bg-gray-400 font-medium">
                <h3 className="font-bold">Yes Mall</h3>
                <h3>3b2 Mohali phase 6</h3>
                <h4>Main Mohali</h4>
                <h4>YesMall@support.com</h4>
            </div>

            <div className="w-full h-9/12">
                <div className="flex w-full justify-between items-center p-2">

                    <div className="Billing-Section flex flex-col w-8/12 items-start ml-3">
                        <h1 className="text-lg font-semibold">BILLING To :</h1>
                        <h1 className="text-base">{userDetails.FullName}</h1>
                        <h1>{userDetails.MobileNumber}</h1>
                        <h1>{userDetails.Email}</h1>
                    </div>
                    <div className="payment-mode-section w-4/12 flex justify-end pl-4 items-center gap-2">
                        <h1 className="text-lg font-semibold">Mode Of Payment:</h1>
                        <h1 className="text-base">CASH</h1>
                    </div>
                </div>
                <h3 className="text-lg  mb-2 mt-4 flex  ml-4 font-semibold">Order Summary:</h3>
                <div className="flex flex-col">
                    <div className="flex w-full bg-stone-500	">
                        <label className="w-2/6 flex justify-center font-bold">Product Name</label>
                        <label className="w-1/6 flex justify-end font-bold pr-5"> Price</label>
                        <label className="w-1/6 flex justify-end font-bold pr-3"> Quantity</label>
                        <label className="w-2/6 flex justify-center font-bold pl-6">Product Total</label>
                    </div>
                    {FinalOrderList && FinalOrderList.map((item) => {
                        return <div className="bg-blue-100 ">
                            <div className="flex w-11/12 items-center ml-7 mt-4 ">
                                <label className="w-2/6 flex justify-center items-center"><h1 className="w-1/4 flex justify-start items-center">{item.ProductName}</h1></label>
                                <label className="w-1/6 flex justify-end items-center">{PriceFormat(item.ProductPrice)}</label>
                                <label className="w-1/6 flex justify-end items-center">{item.Quantity}</label>
                                <label className="w-2/6 flex justify-center items-center"><h1 className="w-2/4 flex justify-end items-center">{PriceFormat(item.Total)}</h1></label>
                            </div>
                            <div className="border w-full border-current opacity-10 h-0"></div>
                        </div>
                    })}
                </div>
                <div className="flex w-full justify-end items-center mt-4"><div className="w-2/6 flex items-center justify-center items-center mr-2 gap-2"><label className="text-lg font-semibold">Total:</label> <label>{PriceFormat(successfulOrderTotalAmount())}</label></div>
                    {/* <label>{getTotalOfOrderDetails()}</label> */}
                </div>
            </div>
            <div className="w-full">

                <h1 className="text-normal font-medium bg-black text-white ">Thanks for shopping with us</h1>
                <div className="flex flex-col items-start justify-end ml-4 mt-5">
                    <h1 className="">Regards,</h1>
                    <h1 className="font-bold">POS Team</h1>
                </div>
            </div>

        </div>
    </div>
}