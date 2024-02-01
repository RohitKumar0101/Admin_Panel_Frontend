import { CustomModal } from "../CustomModal/CustomModal"
import { getAllProductsByOrderID } from "../../utility/Common2";
import React from "react";
import { PriceFormat } from "../../utility/Common";
import "./BillTable.css"
import { Tooltip } from "@mui/material";

export const BillTable = ({customerID,customerIndex, open, orderID,handleBillModal }) => {
  const [orderDetailsObject, setOrderDetailsObject] = React.useState(getAllProductsByOrderID(orderID,customerIndex,customerID))
  const [products, setProducts] = React.useState(orderDetailsObject.orderList);
  console.log(orderID);
  console.log(orderDetailsObject)

  return <CustomModal height={570} open={open} width={700}>
    <div className=" w-full h-full  main-div p-6">
      <h1 className="flex w-full justify-end"><span className="text-white text-sm h-5 bg-red-500 w-10 flex justify-center cursor-pointer rounded-sm" onClick={handleBillModal}><Tooltip title="Close Details">Close</Tooltip></span></h1>
      <h1 className="w-full flex justify-center text-3xl font-semibold"><span >Order Details</span></h1>

      <div className="flex ml-3 items-center gap-2 mt-2 "><label className="text-lg font-medium">OrderID:</label><h1 className="font-base">{orderID}</h1></div>
      <div className=" mr-7 mt-5 w-full rounded shadow gap-4 ">

        <h1 className="mt-2 mb-5  font-bold opacity-90">Order Summary</h1>
        <div className="flex flex-col items-cente ml-2 mr-2 gap-4 ">
          <div className='final-order-summar'>

            {products && products.map((product, i) => {
              if (product.Quantity < 1) {
                return;
              }
              if (product.Status == false) {
                return;
              }
              return <div key={i} className="w-full flex flex-col gap-4">
                <div className="w-full flex justify-center items-center">

                  <span className="w-2/4 flex justify-start">{product.ProductName}</span>
                  <span className="text-xs opacity-75 flex justify-start w-1/4">x {product.Quantity}</span>
                  <span className="w-1/4 flex justify-end">{PriceFormat(product.Total)}</span>
                </div>
                <h1 className="border border-black border-1 opacity-5"></h1>

              </div>
            })
            }
          </div>
          <div className="flex w-full justify-end items-center gap-10 opacity-95"><label className="font-bold">TOTAL:</label><span className="font-semibold text-lg">{PriceFormat(orderDetailsObject.orderDetails.totalAmount)}</span></div>
          <div className="flex w-full justify-start items-center gap-1 opacity-95"><label className="font-bold">Payment Status:</label><span className=" text-lg">{orderDetailsObject.orderDetails.paymentStatus}</span></div>

        </div>
      </div>
    </div>
  </CustomModal>
}