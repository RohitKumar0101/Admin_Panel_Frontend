import { Button } from "@mui/material";
import { Layout } from "../../Layout/Layout"
import React, { useEffect } from "react";
import { CustomerSignUpForm } from "../../components/CustomerSignUpForm/CustomerSignUpForm";
import "./POS.css";
import { GetCategoriesData } from "../../utility/Common";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ProductCart from "../../components/ProductCart/ProductCart";
import { CartTotalAmount, GetNumberOfItemInCart, GetUserCartItems } from "../../utility/SessionStorage";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Summary } from "../../components/Summary/Summary";
import { PaymentCompletion } from "../PaymentCompletionPage/PaymentCompletion";


const getRandomColor = () => {

    var c = '';
    while (c.length < 7) {
        c += (Math.random()).toString(16).substr(-6).substr(-1)
    }
    return '#' + c;
}




export const POS = ({ file }) => {
    const CustomerExistBoolean = sessionStorage.getItem("user");
    const [openCreateCustomerForm, setOpenCreateCustomerForm] = React.useState(false);
    const [refresh, setRefresh] = React.useState(true);
    const [SelectedCategory, setSelectedCategory] = React.useState("");
    const [openPaymentCompletion,setOpenPaymentCompletion]=React.useState(false);


    const [isCategoryClicked, setIsCategoryClicked] = React.useState(false);
    const [cartItems, setCartItems] = React.useState(GetUserCartItems());
    const [numberOfItems, setNumberOfItems] = React.useState(0);
    const categories = GetCategoriesData();
    const [state, setState] = React.useState({
        right: false,
    });
    const [categoryID, setCategoryID] = React.useState(null);
    console.log(cartItems);

    const colorsArray = ["DarkGray", "lightCoral", "GoldenRod ", "pink"];

    const handleOpenCustomerSignInForm = () => {
        setOpenCreateCustomerForm(true);
    }

    useEffect(() => {
        let Number = GetNumberOfItemInCart();
        setNumberOfItems(Number);
    }, [cartItems])

    const handleCategoryClicked = (data) => {
        setSelectedCategory((prev) => {
            if (prev == data.CategoryName) {
                setIsCategoryClicked(false);
                return "";
            }
            setIsCategoryClicked(true)
            return data.CategoryName;
        })
        setCategoryID(data.ID);
    }

    const handlePaymentCompletionModal = ()=>{
        closeDrawer("right",false);
        setOpenPaymentCompletion(true);
    }

    const handleClosePaymentModal = ()=>{
        setOpenPaymentCompletion(false);
    }

    const handleUpdatedTotalAmountCart = () => {
        setCartItems(GetUserCartItems());
    }

    const closeDrawer = (anchor, open) => {
        setState({ ...state, [anchor]: open });
    }

    const toggleDrawer = (anchor, open) => (event) => {

        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    useEffect(() => {
        handleUpdatedTotalAmountCart();
    }, [refresh])



    return <Layout file={file}>
        <div className="w-full h-full overflow-auto ">
            <button className="left-move  relative bg-pink-40" onClick={toggleDrawer("right", true)}>
                <ShoppingCartCheckoutIcon sx={{ position: "absolute", cursor: "pointer" }} />
                {numberOfItems > 0 ? <div className=" absolute text-white font-semibold text-xs bg-blue-500 top-2 left-2 rounded-full w-4 h-4">{numberOfItems}</div> : ""}
            </button>
            <div className="w-full h-44  flex ">
                {CustomerExistBoolean ?
                    <div className="flex flex-wrap w-full h-full gap-2 justify-around items-center">
                        {categories.map((category, index) => {

                            return <div style={SelectedCategory == category.CategoryName ? { opacity: "100%",border: '1px solid rgba(0,0,0)',backgroundColor: colorsArray[index], fontSize: "xx-large" } : { backgroundColor: colorsArray[index] }} onClick={() => handleCategoryClicked(category)} className="min-h-[85px] w-1/5 bg-yellow-200 text-xl font-semibold text-gray-50 flex items-center justify-center rounded cursor-pointer opacity-80 hover:opacity-100" key={category.ID}>{category.CategoryName}</div>
                        })}
                    </div>
                    : <div className="w-full flex justify-center items-center"><Button variant="contained" size="large" onClick={handleOpenCustomerSignInForm}><div className="flex justify-center items-center gap-2 "><PersonAddIcon />Add New Customer</div></Button></div>}
            </div>
            {isCategoryClicked ?
                <div className="w-full flex flex-col items-center gap-5">

                    <div className="text-black  text-2xl bg-gray-200 w-11/12 ">
                        <ProductCart refresh={refresh} setRefresh={setRefresh} ID={categoryID} />
                    </div>
                </div> :
                <h1 className="text-2xl font-bold opacity-90">Choose any category</h1>}
            <Summary cartItems={cartItems} toggleDrawer={toggleDrawer} closeDrawer={closeDrawer} state={state} handlePaymentCompletionModal={handlePaymentCompletionModal} />
            <PaymentCompletion open={openPaymentCompletion}  handleClosePaymentModal={handleClosePaymentModal}/>

            <CustomerSignUpForm open={openCreateCustomerForm} setOpenCreateCustomerForm={setOpenCreateCustomerForm} />
        </div>
    </Layout>
}