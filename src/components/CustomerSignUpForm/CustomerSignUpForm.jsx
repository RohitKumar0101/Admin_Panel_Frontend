import { CustomModal } from "../CustomModal/CustomModal"
import React from 'react';
import { Formik, Form, Field } from 'formik';
import "./CustomerSignUpForm.css";
import * as Yup from 'yup';
import { Button } from "@mui/material";
import { SetCustomerDetails } from "../../utility/SessionStorage";

const SignupSchema = Yup.object().shape({
  FullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  MobileNumber: Yup.string("Only numbers allowed")
    .min(10, 'Mobile field minimum of 10 numbers')
    .max(10, 'Mobile field maximum of 10 numbers')
    .required('Required'),
  Email: Yup.string().email('Invalid email').required('Required'),
});

export const CustomerSignUpForm = ({handleAddUserSnackbar,open,setOpenCreateCustomerForm }) => {


  const handleCustomerSignUpDetails = (e)=>{
    SetCustomerDetails(e);
    handleCloseCustomerSignUpForm();
    // setTimeout(() => {
    //   handleAddUserSnackbar();
    // }, 1000);
    // handleAddUserSnackbar();
  }

  const handleCloseCustomerSignUpForm = ()=>{
    setOpenCreateCustomerForm(false);
  }

  return <CustomModal open={open} height={450} width={600}>
    <div className="p-2">
      <h1 className="w-full flex justify-center text-3xl">Enter The Details:</h1>
      <Formik
        initialValues={{
          FullName: '',
          MobileNumber:'',
          Email: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleCustomerSignUpDetails}
      >
        {({ errors, touched }) => (
          <Form className=" w-full mt-2 starlabel">
            <div className="flex flex-col items-center">
              <label className=" text-xl flex justify-start w-5/6">Full Name: </label>
              <div className="mt-2 w-full flex flex-col items-center">
                <Field className="w-5/6  h-10 rounded border border-gray-400" name="FullName" />
                {errors.FullName && touched.FullName ? (
                  <div className="h-8 w-5/6 text-red-500">{errors.FullName}</div>
                ) : <div className="h-8"></div>}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <label className="starlabel text-xl flex justify-start w-5/6">Mobile Number: </label>
              <div className="mt-2 w-full flex flex-col items-center">
                <Field className="w-5/6  h-10 rounded border border-gray-400" name="MobileNumber" type="tel" pattern="[0-9]{10}" />
                {/* <input className="w-5/6  h-10 rounded border border-gray-400" name="lastName" type="tel"    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" */}
                {errors.MobileNumber && touched.MobileNumber ? (
                  <div className="h-8 w-5/6 text-red-500">{errors.MobileNumber}</div>
                ) : <div className="h-8"></div>}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <label className="starlabel text-xl flex justify-start w-5/6">Email:</label>
              <div className="mt-2 w-full flex flex-col items-center">
                <Field className="w-5/6  h-10 rounded border border-gray-400" type="email" name="Email" />
                {errors.Email && touched.Email ? (
                  <div className="h-8 w-5/6 text-red-500">{errors.Email}</div>
                ) : <div className="h-8"></div>}
              </div>
            </div>
            <div className="flex w-full justify-center mt-2 gap-10">
              <Button variant="contained" size="large" type="submit" onSubmit={handleCustomerSignUpDetails}>Submit</Button>
              <Button variant="contained" size="large" color="error" onClick={handleCloseCustomerSignUpForm}>Cancel</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </CustomModal>
}