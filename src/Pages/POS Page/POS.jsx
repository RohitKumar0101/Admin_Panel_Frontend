import { Button } from "@mui/material";
import { Layout } from "../../Layout/Layout"
import React, { useEffect } from "react";
import { CustomerSignUpForm } from "../../components/CustomerSignUpForm/CustomerSignUpForm";
import "./POS.css";
import { GetCategoriesData, PriceFormat } from "../../utility/Common";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ProductCart from "../../components/ProductCart/ProductCart";
import { CartTotalAmount, GetNumberOfItemInCart, GetUserCartItems, GetUserEmail, GetUserName, SetUserOrder, changeAndSaveCart } from "../../utility/SessionStorage";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Summary } from "../../components/Summary/Summary";
import { PaymentCompletion } from "../PaymentCompletionPage/PaymentCompletion";
import backgorund from "../../images/selection-443127_1920.png";
import emailjs from '@emailjs/browser';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import CustomSnackbar from "../../components/Snackbar/Snackbar";
// import CustomSnackbar from "../../components/Snackbar/Snackbar";




const getRandomColor = () => {

    var c = '';
    while (c.length < 7) {
        c += (Math.random()).toString(16).substr(-6).substr(-1)
    }
    return '#' + c;
}




export const POS = ({ file }) => {
    const CustomerExistBoolean = sessionStorage.getItem("user");
    const [loader, setLoader] = React.useState(false)

    const [openCreateCustomerForm, setOpenCreateCustomerForm] = React.useState(false);
    const [showUnavailableSnackbar, setShowUnavailableSnackbar] = React.useState(false);
    const [displayBillTemplate, setDisplayBillTemplate] = React.useState(false);
    const [refresh, setRefresh] = React.useState(true);
    const [showEmptyCartSnackbar, setShowEmptyCartSnackbar] = React.useState(false);
    const [SelectedCategory, setSelectedCategory] = React.useState("");
    const [openPaymentCompletion, setOpenPaymentCompletion] = React.useState(false);
    // const [user, setUser] = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : [];
    const [isCategoryClicked, setIsCategoryClicked] = React.useState(false);
    const [cartItems, setCartItems] = React.useState(GetUserCartItems());
    const [numberOfItems, setNumberOfItems] = React.useState(GetNumberOfItemInCart());
    const [addUserSnackbar, setAddUSerSnackbar] = React.useState(false);
    const categories = GetCategoriesData();
    const [state, setState] = React.useState({
        right: false,
    });
    const [categoryID, setCategoryID] = React.useState(null);

    const colorsArray = ["DarkGray", "lightCoral", "GoldenRod ", "pink"];



    // const downloadPdf = () => {
    //     const capture = document.querySelector('.bill-template');
    //     setLoader(true);
    //     html2canvas(capture).then((canvas) => {
    //         const imgData = canvas.toDataURL('img/png');
    //         const doc = new jsPDF('p', 'mm', 'a4');
    //         const componentWidth = doc.internal.pageSize.getWidth();
    //         const componentHeight = doc.internal.pageSize.getHeight();
    //         doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
    //         setLoader(false);
    //         doc.save('reciept.pdf');
    //     })
    // }


    const handleUnavailableSnackbar = () => {
        console.log("handleUnavailableSnackbar");
        setShowUnavailableSnackbar(prev => !prev);
    }

    const handleOpenCustomerSignInForm = () => {
        setOpenCreateCustomerForm(true);
    }

    useEffect(() => {
        let Number = GetNumberOfItemInCart();
        setNumberOfItems(Number);
    }, [cartItems])

    const handleChangeInCategoryClicked = (state) => {
        setIsCategoryClicked(state);
    }
    const handleSelectedCategory = (CategoryName) => {
        setSelectedCategory(CategoryName);
    }

    const handleCategoryClicked = (data) => {
        handleCloseEmptyCartSnackbar();
        console.log("handleCategoryClicked");
        setSelectedCategory((prev) => {
            if (prev == data.CategoryName) {
                console.log("CLOSE category")
                handleChangeInCategoryClicked(false);
                return "";
            }
            else {
                console.log("OPEN Category");
                handleChangeInCategoryClicked(true)
                return data.CategoryName;
            }
        })
        setCategoryID(data.ID);
    }

    const handleAddUserSnackbar = () => {
        setAddUSerSnackbar(prev => !prev);
    }
    const EmptyCartItems = () => {
        setCartItems([]);
    }

    const handlePaymentCompletionModal = (CartTotalAmount) => {
        // SetUserOrder(data);
        changeAndSaveCart(cartItems, CartTotalAmount);
        EmptyCartItems();
        closeDrawer("right", false);
        setOpenPaymentCompletion(true);
    }

    const handleClosePaymentModal = () => {
        setOpenPaymentCompletion(false);
    }

    const handleOpenEmptyCartSnackbar = async () => {
        console.log("OPEN")
        setShowEmptyCartSnackbar(true);
        setTimeout(() => {
            handleCloseEmptyCartSnackbar();
            return;
        }, 2000);
    }
    const handleCloseEmptyCartSnackbar = () => {
        setShowEmptyCartSnackbar(false);
    }

    const handleUpdatedTotalAmountCart = () => {
        setCartItems(GetUserCartItems());
    }

    const closeDrawer = (anchor, open) => {
        setState({ ...state, [anchor]: open });
    }

    const toggleDrawer = (anchor, open) => {
        handleChangeInCategoryClicked(false);
        handleSelectedCategory("");

        // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        //     return;
        // }
        if (numberOfItems < 1) {
            handleOpenEmptyCartSnackbar();
        }
        else {
            setState({ ...state, [anchor]: open });
        }
        return;
    };

    useEffect(() => {
        handleUpdatedTotalAmountCart();
    }, [refresh])

    const templateParams = { FullName: GetUserName(), Total: PriceFormat(CartTotalAmount()), to_Email: GetUserEmail() };
    const sendEmail = () => {
        handleClosePaymentModal();
        console.log(templateParams);
        emailjs.send('service_m49l157', 'template_4tz5lkd', templateParams, 'dyVGfALYvZvPWDdCg')
            .then((result) => {
                console.log("Successfull sent");
            }, (err) => {
                console.log(err);
            })
    }


    return <Layout file={file}>
        <div className="w-full h-full overflow-auto " >

            <button className=" w-full  cursor-default flex justify-end relative" >
                <ShoppingCartCheckoutIcon onClick={() => toggleDrawer("right", true)}  style={ {cursor: "pointer",position:"relative",marginRight:"20px",marginTop:"10px"}} />
                {numberOfItems > 0 ? <div style={{ cursor: "pointer" }} className="text-white font-semibold mr-6 mt-4 hover:bg-blue-600 text-xs bg-blue-500 absolute  rounded-full w-4 h-4  " onClick={() => toggleDrawer("right", true)}>{numberOfItems}</div> : ""}
            </button>

            {CustomerExistBoolean ? isCategoryClicked ? "" : <h1 className="text-2xl font-bold opacity-20 ">Choose any Category</h1> : ""}
            <div style={(categories.length > 4 && categories.length <= 8) ? { marginBottom: "3px" } : {}} className="w-full h-44  flex">
                {CustomerExistBoolean ?
                    <div className="flex flex-wrap w-full h-full gap-2  justify-around items-center">
                        {categories.map((category, index) => {

                            return <div style={SelectedCategory == category.CategoryName ? { opacity: "90%", backgroundColor:"blue", fontSize: "xx-large", boxShadow: '0px 1px 8px black' } : { backgroundColor: "Blue" }} onClick={() => handleCategoryClicked(category)} className="min-h-[85px] w-1/5 bg-yellow-200 text-xl hover:text-2xl  font-semibold text-white flex items-center justify-center  rounded cursor-pointer opacity-60 hover:text-opacity-100 hover:opacity-80" key={category.ID}>{category.CategoryName}</div>
                        })}
                    </div>
                    : <div className="w-full flex justify-center items-center"><Button variant="contained" size="large" onClick={handleOpenCustomerSignInForm}><div className="flex justify-center items-center gap-2 "><PersonAddIcon />Add New Customer</div></Button></div>}
            </div>
            {isCategoryClicked ?
                <div className="w-full flex flex-col items-center gap-5">

                    <div className="text-black  text-2xl bg-gray-200 w-11/12 ">
                        <ProductCart handleUnavailableSnackbar={handleUnavailableSnackbar} refresh={refresh} setRefresh={setRefresh} ID={categoryID} />

                    </div>
                </div> : CustomerExistBoolean && categories.length <= 8 ?
                    <div className="flex w-full justify-center items-end"><h1 className="text-2xl font-bold opacity-90" style={(categories.length > 4 && categories.length <= 8) ? { height: "320px", width: "17%", opacity: "30%", backgroundImage: `url(${backgorund})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" } : { height: "364px", width: "20%", opacity: "30%", backgroundImage: `url(${backgorund})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></h1></div> : ""}
            <Summary  cartItems={cartItems} toggleDrawer={toggleDrawer} closeDrawer={closeDrawer} state={state} handlePaymentCompletionModal={handlePaymentCompletionModal} />
            <PaymentCompletion   open={openPaymentCompletion} sendEmail={sendEmail} handleClosePaymentModal={handleClosePaymentModal} />
            <CustomerSignUpForm open={openCreateCustomerForm} handleAddUserSnackbar={handleAddUserSnackbar} setOpenCreateCustomerForm={setOpenCreateCustomerForm} />
            <CustomSnackbar open={addUserSnackbar} message="Customer Added Successfully" />
            <CustomSnackbar open={showUnavailableSnackbar} message="Can't be Added Product is Unavailable" color="warning" />
            <CustomSnackbar open={showEmptyCartSnackbar} message="Cart is Empty" color="error" closeSnackbar={handleCloseEmptyCartSnackbar} />
        </div>
    </Layout>
}