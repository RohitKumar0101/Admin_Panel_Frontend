import { CustomModal } from "../CustomModal/CustomModal"
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from "@mui/material";
import { DeleteLoggedCustomerDetails, GetCustomerDetailsMobileAsID, SetCustomerDetails } from "../../utility/Common2";

const SignupSchema = Yup.object().shape({
  
  MobileNumber: Yup.string("Only numbers allowed")
    .min(10, 'Mobile field minimum of 10 numbers')
    .max(10, 'Mobile field maximum of 10 numbers')
    .required('Required')
});

export const CustomerLogin= ({handleCustomerExistBoolen,handleLoginCustomerSnackbar,open,setOpen,customerExistInStorageBoolean,setCustomerExistInStorageBoolean }) => {

 

  const handleSetCustomerStorageBooleanTrue = ()=>{
    setCustomerExistInStorageBoolean(true);
  }
  const handleSetCustomerStorageBooleanFalse = ()=>{
    setCustomerExistInStorageBoolean(false);
  }


  const handleCustomerLoginDetails = (e)=>{
    console.log(e);
    const ExistBoolean = GetCustomerDetailsMobileAsID(e);
    console.log("Exist BOolean");
    console.log(ExistBoolean);
    if(ExistBoolean == false){
      // handleCloseCustomerLoginForm();
      DeleteLoggedCustomerDetails();
      handleSetCustomerStorageBooleanFalse();
      return;
    }else{
      handleSetCustomerStorageBooleanTrue();
    }
    handleCloseCustomerLoginForm();
    handleCustomerExistBoolen();
    handleLoginCustomerSnackbar();
    setTimeout(() => {
      handleLoginCustomerSnackbar();
    }, 1000);
  }

  const handleCloseCustomerLoginForm = ()=>{
    handleSetCustomerStorageBooleanTrue();
    setOpen(false);
  }

  return <CustomModal open={open} height={250} width={600}>
    <div className="p-2">
      <h1 className="w-full flex justify-center text-3xl mb-3">Enter Login Details:</h1>
      <Formik
        initialValues={{
          MobileNumber:'',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleCustomerLoginDetails}
      >
        {({ errors, touched }) => (
          <Form className=" w-full mt-2 starlabel">
                  <div className="flex flex-col items-center">
              <label className="starlabel text-xl flex justify-start w-5/6">Mobile Number: </label>
              <div className="mt-2 w-full flex flex-col items-center">
                <Field className="w-5/6  h-10 rounded border border-gray-400" name="MobileNumber"  type="tel" pattern="[0-9]{10}" />
                {/* <input className="w-5/6  h-10 rounded border border-gray-400" name="lastName" type="tel"    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */}
                {errors.MobileNumber && touched.MobileNumber ? handleSetCustomerStorageBooleanTrue():""}
                {errors.MobileNumber && touched.MobileNumber ? (
                  <div className="h-8 w-5/6 text-red-500">{errors.MobileNumber}</div>
                ) :customerExistInStorageBoolean?<h1 className="h-8"></h1>:<h1 className="flex w-5/6 justify-start text-red-500 h-8">Customer not exist in Storage with this credentails</h1>
              }
              </div>
            </div>
            <div className="flex w-full justify-center mt-2 gap-10">
              <Button variant="contained" size="large" type="submit" onSubmit={handleCustomerLoginDetails}>Submit</Button>
              <Button variant="contained" size="large" color="error" onClick={handleCloseCustomerLoginForm}>Cancel</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </CustomModal>
}