import { CustomModal } from "../CustomModal/CustomModal"
import React from 'react';
import { Formik, Form, Field,useFormikContext } from 'formik';
import "./CustomerSignUpForm.css";
import * as Yup from 'yup';
import { Button } from "@mui/material";
import { GetCustomerDetailsBoolean, GetCustomerDetailsMobileAsID, SetCustomerDetails, SetLoggedUser } from "../../utility/Common2";

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

export const CustomerSignUpForm = ({ handleLoginCustomerSnackbar, handleSetFalseCustomerBoolean, handleAlreadyExistCustomerBoolean, userAlreadyExistBoolean, handleCustomerExistBoolen, handleAddUserSnackbar, open, setOpenCreateCustomerForm }) => {

  const [createNewCustomerBoolean,setCreateNewCustomerBoolean] = React.useState(false);

  const handleSetCreateNewCustomerBooleanTrue = ()=>{
    setCreateNewCustomerBoolean(true);
  }
  
  const handleSetCreateNewCustomerBooleanFalse = ()=>{
    setCreateNewCustomerBoolean(false);
  }

  const handleCustomerAddAlreadyStored = ()=>{
     console.log("handleCustomerAddAlreadyStored")
  }


  const handleCustomerSignUpDetails = (e) => {
console.log("handleCustomerSignUpDetails");
    if(userAlreadyExistBoolean && createNewCustomerBoolean){
      handleCustomerAddAlreadyStored(e);
    }

    if (userAlreadyExistBoolean) {
     
      handleCustomerLoginDetails(e.MobileNumber);
   
    }




    const DetialsWithUserRole = { ...e, userRole: 3 }
    let CustomerExistBoolean = GetCustomerDetailsBoolean(e);
    if (CustomerExistBoolean) {
      handleAlreadyExistCustomerBoolean();
      return;
    }
    SetCustomerDetails(DetialsWithUserRole);
    SetLoggedUser(DetialsWithUserRole);
    handleCloseCustomerSignUpForm();
    handleCustomerExistBoolen();
    handleAddUserSnackbar();
    setTimeout(() => {
      handleAddUserSnackbar();
    }, 1000);
  }

  const handleCustomerLoginDetails = (e) => {
    console.log("handleCustomerLoginDetails");
    console.log(e);
    GetCustomerDetailsMobileAsID(e);
    handleCustomerExistBoolen();
    handleCloseCustomerSignUpForm();
    handleLoginCustomerSnackbar();
    setTimeout(() => {
      handleLoginCustomerSnackbar();
    }, 1000);
  }



  const handleCloseCustomerSignUpForm = () => {
    handleSetFalseCustomerBoolean();
    setOpenCreateCustomerForm(false);
  }

  // const useOtherButtonClick = () => {
  //   const formik = useFormikContext();
  // console.log(formik,"lll");
  // return () => {
  //   // Access the form's state and methods using useFormikContext
  //   if (formik) {
  //     const formData = formik.values;
  //     console.log('Form data:', formData);

  //     // Your logic for the other button
  //     console.log('Other button clicked');
  //   }
  //   else{
  //     console.log("FOrmik not found");
  //   }
  // };
  // };
  // const handleOtherButtonClick = useOtherButtonClick();  

  return <CustomModal open={open} height={470} width={600}>
    <div className="p-2">
      <h1 className="w-full flex justify-center text-3xl">Enter The Details:</h1>
      <Formik
        initialValues={{
          FullName: '',
          MobileNumber: '',
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
          
            { userAlreadyExistBoolean ? <h1 className="flex w-full justify-center text-red-600 h-5 mb-2">Customer Already Exists, kindly click on continue for move to pos page </h1> : <h1 className="h-5"></h1>}
            {userAlreadyExistBoolean ? <div className="flex w-full justify-center mt-1 gap-10">
              <Button variant="contained" size="large" type="submit">Continue</Button>
              <Button variant="contained" size="large" color="error" onClick={handleCloseCustomerSignUpForm}>Cancel</Button>
            </div> : <div className="flex w-full justify-center mt-1 gap-10">
              <Button variant="contained" size="large" type="submit" >Submit</Button>
              <Button variant="contained" size="large" color="error" onClick={handleCloseCustomerSignUpForm}>Cancel</Button>
            </div>}


          </Form>
        )}
      </Formik>
    </div>
  </CustomModal>
}