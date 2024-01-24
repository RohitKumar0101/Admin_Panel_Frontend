import { QrCode } from "@mui/icons-material";
import { create } from "@mui/material/styles/createTransitions";
import moment from "moment";


export const SetCustomerDetails = (userDetails) => {
    let user = [];

    user.push({ userDetails });
    sessionStorage.setItem("user", JSON.stringify(user));
}

export const GetCustomer = () => {
    return JSON.parse(sessionStorage.getItem("user"));
}

export const GetUserName = () => {
    let user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : "";
    if (user) {
        var name = user[0].userDetails.FullName;
    }
    else {
        return user;
    }
    return name;
}

export const GetUserEmail = () => {
    let user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : "";
    if (user) {
        var Email = user[0].userDetails.Email;
    }
    else {
        return user;
    }
    return Email;
}


const saveUser = (data) => {
    sessionStorage.setItem("user", JSON.stringify(data));
}

export const ChangeCartProductStatus = (ID) => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    user && user[0].userCart && user[0].userCart.forEach((product, index) => {
        if (product.ID == ID) {
            user[0].userCart[index].Status = false;
        }
    })

    sessionStorage.setItem("user", JSON.stringify(user));

}

export const CartTotalAmount = () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let sum = 0;
    let total = user && user[0].userCart && user[0].userCart.forEach((product) => {

        sum = sum + product.Total;
    })
    return sum;
}

export const successfulOrderTotalAmount = ()=>{
    let user = JSON.parse(sessionStorage.getItem("user"));
     return user[0].orders[0].orderDetails.totalAmount;
}

export const getOrderListForPrint = ()=>{
    let user = sessionStorage.getItem('user')?JSON.parse(sessionStorage.getItem("user")):[];
    if(user.length>0){
        return( user[0].orders[0].orderList);
    }

}

export const getUserDetilasObject = ()=>{
    let user = JSON.parse(sessionStorage.getItem("user"));
    return user[0].userDetails;
}


export const GetNumberOfItemInCart = () => {
    // console.log("GetCartItems");
    let user = JSON.parse(sessionStorage.getItem("user"));
    let num = 0;
    user && user[0].userCart && user[0].userCart.forEach((product) => {
        // console.log("Increment");
        if (product.Status) {
            num = num + 1;
        }

    })
    return num;
}

export const GetUserCartItems = () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
        return user[0].userCart;
    }
    else {
        return [];
    }
}

export const GetTotalByID = (ID) => {

    let user = JSON.parse(sessionStorage.getItem("user"));
    let total = 0;
    user[0].userCart && user[0].userCart.forEach(Item => {

        if (Item.ID == ID) {
            if (Item.Status == false) {
                return total;
            }
            else {
                total = Item.Total;
            }
        }
    });
    return total;
}





const SetUserArray = (array) => {
    sessionStorage.setItem("user", JSON.stringify(array));
}

const UpdateTotalByID = (val, ID) => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let ID_Boolean = false;
    if (val == 0) {

    }
    user[0].userCart.forEach((item, index) => {
        if (item.ID == ID) {

            let NewItem = { ...item, Total: val * item.ProductPrice };
            user[0].userCart[index] = NewItem;
        }
    })
    SetUserArray(user);

}

const CreateUpdateUserCart = (MyQuantity, data) => {
    let user = JSON.parse(sessionStorage.getItem("user"));

    let product = { ...data, Quantity: MyQuantity, Total: data.ProductPrice * MyQuantity };
    const cartArray = [];
    cartArray.push(product);
    user[0].userCart = cartArray;
    SetUserArray(user);
}

const UpdateCart = (MyQuantity, data) => {
    console.log("updating the na data");
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (data.Status) {
        let product = { ...data, Quantity: MyQuantity, Total: data.ProductPrice * MyQuantity };
        user[0].userCart.push(product);
        SetUserArray(user);
    }
    else {
        return;
    }
}

export const SetUserOrder = (data) => {
    let order = [...data, { PaymentCompletion: true }];
    console.log(order);
}

export const SetQuantityByID = (val, data) => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let ID = data.ID;
    let ProductBoolean = false;
    if (user[0].userCart) {
        console.log("Cart Exist");
        user[0].userCart.forEach((Item, index) => {
            // console.log(Item.Status);
            if (Item.ID == data.ID) {
                ProductBoolean = true;
                if (val == 0) {
                    UpdateTotalByID(val, data.ID);
                    user[0].userCart.splice(index, 1);
                } else {
                    let NewItem = { ...Item, Quantity: val };

                    user[0].userCart[index] = NewItem;
                }
            }

        })
        console.log("Updated OBject");

        if (ProductBoolean) {
            console.log("Setting object");
            SetUserArray(user);
            if (val) {
                UpdateTotalByID(val, data.ID);
            }
        }
        else {
            console.log("updating Cart");
            UpdateCart(val, data);
        }

    }
    else {
        console.log("Creating cart");
        CreateUpdateUserCart(val, data);
    }

}

export const changeAndSaveCart = (data, Amount) => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user[0] && user[0].orders) {
        user[0].orders.unshift({
            orderDetails: {
                orderID: Date.now(),
                totalAmount: Amount,
                paymentStatus: "successfull",
                createdDate: moment().format("YYYY/MM/DD")
            },
            orderList: data
        })
    } else {
        user[0].orders = [];
        user[0].orders.unshift({
            orderDetails: {
                orderID: Date.now(),
                totalAmount: CartTotalAmount,
                paymentStatus: "successfull",
                createdDate: moment().format("YYYY/MM/DD")
            },
            orderList: data
        })
    }
    user[0].userCart = [];
    console.log(user);
    sessionStorage.setItem("user", JSON.stringify(user));
}

export const GetQuantityByID = (ID) => {
    let user = JSON.parse(sessionStorage.getItem("user"));

    let Quantity = 0;
    user[0].userCart && user[0].userCart.forEach(Item => {
        //   console.log(Item.ID);
          console.log(ID);
        if (Item.ID == ID) {
            console.log("Quantity boolean true");
            if (Item.Status == false) {
                return Quantity;
            }
            Quantity = Item.Quantity;
        }
    });
    console.log(Quantity);
    return Quantity;
}
