import { Button, Tooltip } from "@mui/material";
import { Layout } from "../../Layout/Layout"
import React, { useEffect } from "react";
import { CustomerSignUpForm } from "../../components/CustomerSignUpForm/CustomerSignUpForm";
import "./POS.css";
import { GetCategoriesData, PriceFormat } from "../../utility/Common";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { ProductCart } from "../../components/ProductCart/ProductCart";
import { CartTotalAmount, CheckCustomerLoggedInBoolean, DeleteLoggedCustomerDetails, DeleteLoggedUserDetails, GetNumberOfItemInCartByID, GetUserCartItems, GetUserEmail, GetUserName, SetUserOrder, changeAndSaveCart, getCustomerElementIndexByID, getMobileIDOfLoggedCustomer } from "../../utility/Common2";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Summary } from "../../components/Summary/Summary";
import { PaymentCompletion } from "../PaymentCompletionPage/PaymentCompletion";
import backgorund from "../../images/selection-443127_1920.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';
import emailjs from '@emailjs/browser';
import { CustomSnackbar } from "../../components/Snackbar/Snackbar";
import { CustomerLogin } from "../../components/CustomerLoginWithMobileForm/CustomerLogin";
// import CustomSnackbar from "../../components/Snackbar/Snackbar";




const getRandomColor = () => {

    var c = '';
    while (c.length < 7) {
        c += (Math.random()).toString(16).substr(-6).substr(-1)
    }
    return '#' + c;
}




export const POS = ({ file }) => {
    const loggedCustomerMobileID = getMobileIDOfLoggedCustomer();
    const loggedCustomerIndex = getCustomerElementIndexByID(loggedCustomerMobileID);
    const [CustomerLoggedInBoolean, setCustomerLoggedInBoolean] = React.useState(CheckCustomerLoggedInBoolean());
    const [loginCustomerSnackbar, setLoginCustomerSnackbar] = React.useState(false);

    const [userAlreadyExistBoolean, setUserAlreadyExistBoolean] = React.useState(false);

    const [openCreateCustomerForm, setOpenCreateCustomerForm] = React.useState(false);
    const [openCustomerLoginForm, setOpenCustomerLoginForm] = React.useState(false);
    const [showUnavailableSnackbar, setShowUnavailableSnackbar] = React.useState(false);
    const [displayBillTemplate, setDisplayBillTemplate] = React.useState(false);
    const [refresh, setRefresh] = React.useState(true);
    const [showEmptyCartSnackbar, setShowEmptyCartSnackbar] = React.useState(false);
    const [SelectedCategory, setSelectedCategory] = React.useState("");
    const [openPaymentCompletion, setOpenPaymentCompletion] = React.useState(false);
    // const [user, setUser] = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : [];
    const [isCategoryClicked, setIsCategoryClicked] = React.useState(false);
    const [numberOfItems, setNumberOfItems] = React.useState(GetNumberOfItemInCartByID(loggedCustomerMobileID, loggedCustomerIndex));
    const [addUserSnackbar, setAddUSerSnackbar] = React.useState(false);
    const categories = GetCategoriesData();
    const [state, setState] = React.useState({
        right: false,
    });
    const [categoryID, setCategoryID] = React.useState(null);

    const [cartItems, setCartItems] = React.useState(GetUserCartItems(loggedCustomerIndex));
    const colorsArray = ["DarkGray", "lightCoral", "GoldenRod ", "pink"];

    console.log(cartItems);

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

    React.useEffect(() => {
        setCartItems(GetUserCartItems(loggedCustomerIndex));

    }, [loggedCustomerIndex])

    React.useEffect(() => {
        if (loggedCustomerIndex >= 0) {
            setCartItems(GetUserCartItems(loggedCustomerIndex));
        }
    }, [refresh])

    const EmptyCartItems = () => {
        setCartItems([]);
    }


    const CustomerLogout = () => {
        DeleteLoggedCustomerDetails();
        EmptyCartItems();
        handleSetFalseAreadyExistCustomerBoolean()
        setCustomerLoggedInBoolean(false);
    }


    const handleUnavailableSnackbar = () => {
        console.log("handleUnavailableSnackbar");
        setShowUnavailableSnackbar(prev => !prev);
    }

    const handleOpenCustomerSignInForm = () => {
        setOpenCreateCustomerForm(true);
    }

    useEffect(() => {
        console.log("Inside UseEffect")
        let Number = GetNumberOfItemInCartByID(loggedCustomerMobileID, loggedCustomerIndex);
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

    const handleLoginCustomerSnackbar = () => {
        setLoginCustomerSnackbar(prev => !prev);
    }

    const handlePaymentCompletionModal = (CartTotalAmount) => {
        console.log("Payment Completion Function");
        // SetUserOrder(data);
        changeAndSaveCart(cartItems, CartTotalAmount, loggedCustomerIndex);
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
        // setCartItems(GetUserCartItems());
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

    const handleTrueCustomerExistBoolean = () => {
        setCustomerLoggedInBoolean(true);
    }



    const handleOpenCustomerLoginForm = () => {
        setOpenCustomerLoginForm(true);

    }

    const handleCloseCustomerLoginForm = () => {
        setOpenCustomerLoginForm(false);
    }

    const handleSetTrueAlreadyExistCustomerBoolean = () => {
        setUserAlreadyExistBoolean(true);
    }
    const handleSetFalseAreadyExistCustomerBoolean = () => {
        setUserAlreadyExistBoolean(false);

    }



    return <Layout file={file}>
        <div className="w-full h-full overflow-auto " >

            {CustomerLoggedInBoolean ? <button className=" w-full  cursor-default flex items-center justify-end gap-3 relative " >
                <Tooltip title="Back to previous page" arrow><ArrowBackIcon sx={{ backgroundColor: "red", color: "white", fontSize: 32, marginTop: "1px", borderRadius: "100%", cursor: "pointer" }} onClick={CustomerLogout} /></Tooltip> <Tooltip title="Checkout cart" arrow><div className="flex items-center gap-1 mr-3 mt-1 w-30 rounded-lg  p-1  bg-blue-500 h-9 cursor-pointer" onClick={() => toggleDrawer("right", true)}><ShoppingCartCheckoutIcon sx={{ height: "32px", width: "32px", padding: "4px" }} onClick={() => toggleDrawer("right", true)} style={{ cursor: "pointer", position: "relative", backgroundColor: "white", color: "#007FFF", borderRadius: "10%" }} /><h1 className="text-white font-semibold">Add to Cart</h1></div></Tooltip>
                {numberOfItems > 0 ? <div style={{ cursor: "pointer" }} className="text-white font-semibold mr-28 mt-2 hover:bg-blue-600 text-xs bg-blue-600 absolute   rounded-full w-4 h-4  " onClick={() => toggleDrawer("right", true)}>{numberOfItems}</div> : ""}

            </button> : ""}

            {CustomerLoggedInBoolean ? isCategoryClicked ? "" : <h1 className="text-2xl font-bold opacity-20 ">Choose any Category</h1> : ""}
            <div style={(categories.length > 4 && categories.length <= 8) ? { marginBottom: "3px" } : {}} className="w-full h-44  flex">
                {CustomerLoggedInBoolean ?
                    <div className="flex flex-wrap w-full h-full gap-2  justify-around items-center">
                        {categories.map((category, index) => {

                            return <div style={SelectedCategory == category.CategoryName ? { opacity: "90%", backgroundColor: "blue", fontSize: "xx-large", boxShadow: '0px 1px 8px black' } : { backgroundColor: "Blue" }} onClick={() => handleCategoryClicked(category)} className="min-h-[85px] w-1/5 bg-yellow-200 text-xl hover:text-2xl  font-semibold text-white flex items-center justify-center  rounded cursor-pointer opacity-60 hover:text-opacity-100 hover:opacity-80" key={category.ID}>{category.CategoryName}</div>
                        })}
                    </div>
                    : <div className="w-full flex gap-20 justify-center items-center"><Button variant="contained" size="large" onClick={handleOpenCustomerSignInForm}><div className="flex justify-center items-center gap-2 "><PersonAddIcon />Add New Customer</div></Button></div>}
            </div>
            {isCategoryClicked && CustomerLoggedInBoolean ?
                <div className="w-full flex flex-col items-center gap-5">

                    <div className="text-black  text-2xl bg-gray-200 w-11/12 ">
                        <ProductCart loggedCustomerIndex={loggedCustomerIndex} handleUnavailableSnackbar={handleUnavailableSnackbar} refresh={refresh} setRefresh={setRefresh} ID={categoryID} />
                    </div>
                </div> : CustomerLoggedInBoolean && categories.length <= 8 ?
                    <div className="flex w-full justify-center items-end"><h1 className="text-2xl font-bold opacity-90" style={(categories.length > 4 && categories.length <= 8) ? { height: "320px", width: "17%", opacity: "30%", backgroundImage: `url(${backgorund})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" } : { height: "364px", width: "20%", opacity: "30%", backgroundImage: `url(${backgorund})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}></h1></div> : ""}

            <Summary loggedCustomerIndex={loggedCustomerIndex} loggedCustomerMobileID={loggedCustomerMobileID} cartItems={cartItems} toggleDrawer={toggleDrawer} closeDrawer={closeDrawer} state={state} handlePaymentCompletionModal={handlePaymentCompletionModal} />
            <PaymentCompletion open={openPaymentCompletion} sendEmail={sendEmail} handleClosePaymentModal={handleClosePaymentModal} />
            <CustomerSignUpForm handleLoginCustomerSnackbar={handleLoginCustomerSnackbar} handleSetFalseCustomerBoolean={handleSetFalseAreadyExistCustomerBoolean} userAlreadyExistBoolean={userAlreadyExistBoolean} handleAlreadyExistCustomerBoolean={handleSetTrueAlreadyExistCustomerBoolean} handleCustomerExistBoolen={handleTrueCustomerExistBoolean} open={openCreateCustomerForm} handleAddUserSnackbar={handleAddUserSnackbar} setOpenCreateCustomerForm={setOpenCreateCustomerForm} />
            <CustomSnackbar open={addUserSnackbar} message="Customer added and logged Successfully" />
            <CustomSnackbar open={loginCustomerSnackbar} message="Customer continued Successfully" />
            <CustomSnackbar open={showUnavailableSnackbar} message="Can't be Added Product is Unavailable" color="warning" />
            <CustomSnackbar open={showEmptyCartSnackbar} message="Cart is Empty" color="error" closeSnackbar={handleCloseEmptyCartSnackbar} />
        </div>
    </Layout>
}