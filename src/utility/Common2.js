import moment from "moment";

export const CheckCustomerLoggedInBoolean = () => {
    let LoggedBoolean = false;
    let loggedDetails = sessionStorage.getItem("LoggedCustomerDetails") ? sessionStorage.getItem("LoggedCustomerDetails") : "";
    if (loggedDetails) {
        LoggedBoolean = true
    }
    console.log(LoggedBoolean);
    return LoggedBoolean;
}

export const SetLoggedUser = (userDetail) => {
    console.log(userDetail);
    if (userDetail["FullName"]) {
        console.log("Setting session storage")
        sessionStorage.setItem("LoggedCustomerDetails", JSON.stringify(userDetail));
    }
    else {
        sessionStorage.setItem("LoggedCustomerDetails", JSON.stringify({}));
    }
}

export const DeleteLoggedCustomerDetails = () => {
    sessionStorage.clear("LoggedCustomerDetails");
}

export const SetCustomerDetails = (userDetails) => {
    if (localStorage.getItem("users")) {
        let users = JSON.parse(localStorage.getItem("users"));
        users.unshift({ userDetails });
        localStorage.setItem("users", JSON.stringify(users));
        SetLoggedUser(userDetails);
        return
    }
    else {
        let users = [];
        users.push({ userDetails });
        localStorage.setItem("users", JSON.stringify(users));
        SetLoggedUser(userDetails);
        return;
    }
}

export const GetCustomerDetailsMobileAsID = (userDetail) => {
    let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : "";
    let CustomerDetails = {};
    console.log(userDetail);
    console.log(users);
    let customerExistInStorageBoolean = false;
    users.forEach((user, index) => {
        console.log("Getting Comparion for MobileId boolean")
        console.log(user.userDetails.MobileNumber == userDetail);
        if (user.userDetails.MobileNumber === userDetail) {
            console.log("Found the already stored customer");
            CustomerDetails = user.userDetails;
            SetLoggedUser(CustomerDetails);
            customerExistInStorageBoolean = true;
        }
    })
    console.log(CustomerDetails)
    // return customerExistInStorageBoolean;
    return;


}
export const GetCustomerDetailsBoolean = (userDetail) => {

    let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : "";
    let userDataBoolean = false;
    if (users) {

        users.forEach((user, index) => {
            if (user.userDetails.MobileNumber === userDetail.MobileNumber) {
                userDataBoolean = true
            }
        })
    }

    return userDataBoolean;
}


export const GetCustomer = () => {
    return JSON.parse(localStorage.getItem("users"));
}

export const GetUserName = () => {
    let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : "";
    if (users) {
        var name = users[0].userDetails.FullName;
    }
    else {
        return users;
    }
    return name;
}

export const GetUserEmail = () => {
    let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : "";
    if (users) {
        var Email = users[0].userDetails.Email;
    }
    else {
        return users;
    }
    return Email;
}


const saveUser = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
}

export const ChangeCartProductStatus = (ID) => {
    let users = JSON.parse(localStorage.getItem("users"));
    users && users[0].userCart && users[0].userCart.forEach((product, index) => {
        if (product.ID == ID) {
            users[0].userCart[index].Status = false;
        }
    })

    localStorage.setItem("users", JSON.stringify(users));

}

export const CartTotalAmount = (loggedCustomerIndex) => {
    let users = JSON.parse(localStorage.getItem("users"));
    let sum = 0;
    if (users && users[loggedCustomerIndex] && users[loggedCustomerIndex].userCart) {

        users[loggedCustomerIndex].userCart.forEach((product) => {

            sum = sum + product.Total;
        })
        return sum;
    }
}

export const getCustomerElementIndexByID = (MobileAsID) => {
    if (localStorage.getItem("users")) {
        var users = JSON.parse(localStorage.getItem("users"));
    }
    let index = -1;
    if (users)
        users.forEach((user, i) => {
            if (user.userDetails.MobileNumber == MobileAsID) {
                index = i;
            }
        })
    return index;
}


export const getAllOrdersDetailsOfCustomerByID = (MobileAsID) => {
    console.log(MobileAsID);
    if (MobileAsID == -1) {
        return [];
    }

    if (localStorage.getItem("users")) {
        var users = JSON.parse(localStorage.getItem("users"));
    }
    else {
        return [];
    }

    let IndexOfCustomer = getCustomerElementIndexByID(MobileAsID);
    console.log(IndexOfCustomer);

    if (IndexOfCustomer != -1) {
        console.log("Index exists");
        console.log(IndexOfCustomer)
        console.log(users[IndexOfCustomer].orders)
        if (users && users[IndexOfCustomer].orders) {
            console.log("Filtring the odersArray")
            let FilteredArray = users[IndexOfCustomer].orders.map((singleOrder) => {
                return singleOrder.orderDetails
            })
            console.log(FilteredArray);
            return FilteredArray;
        }
        else {
            console.log("Returned empty array")
            return [];
        }
    }
    else {
        console.log("Returned empty array")
        return [];
    }

}

export const getMobileIDOfLoggedCustomer = () => {
    console.log("Getting the logged ID");
    if (sessionStorage.getItem("LoggedCustomerDetails")) {
        let CustomerDetails = JSON.parse(sessionStorage.getItem("LoggedCustomerDetails"));
        return CustomerDetails.MobileNumber;
    }
    else {
        return -1;
    }
}


export const successfulOrderTotalAmount = () => {
    let users = JSON.parse(localStorage.getItem("users"));
    return users[0].orders[0].orderDetails.totalAmount;
}

export const getOrderListForPrint = () => {
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem("users")) : [];
    if (users.length > 0) {
        return (users[0].orders[0].orderList);
    }

}


const FindOrderDetailObjectByID = (ID,customerID) => {
    console.log("FindOrderDetailObjectByID")
    let orderDetailsArray = getAllOrdersDetailsOfCustomerByID(customerID);
    console.log(orderDetailsArray);
    let index;
    orderDetailsArray.forEach((singleObject, i) => {
        console.log(singleObject.orderID);
        console.log(ID);
        console.log(i)
        if (singleObject.orderID === ID) {
            index = i;
        }
    })
    console.log(index);
    return index;
}





export const getUserDetilasObject = () => {
    let users = JSON.parse(localStorage.getItem("users"));
    return users[0].userDetails;
}


export const GetNumberOfItemInCartByID = (MobileID, CusotmerElementIndex) => {
    // console.log("GetCartItems");

    let users = JSON.parse(localStorage.getItem("users"));
    let num = 0;
    if (users && users[CusotmerElementIndex] && users[CusotmerElementIndex].userCart) {
        console.log("Calulating the Number of Items in Cart");
        users[CusotmerElementIndex].userCart.forEach((product) => {
            console.log("Increment");
            console.log(product);
            if (product.Status) {
                num = num + 1;
            }

        })
    }
    console.log(num);
    return num;
}

export const GetUserCartItems = (loggedCustomerIndex) => {
    console.log("Get Cat items funciton run");
    console.log(loggedCustomerIndex);
    if (loggedCustomerIndex < 0) {
        console.log("Can't get cart Items due to Customer Index -1");
        return;
    }
    if (localStorage.getItem("users")) {
        let users = JSON.parse(localStorage.getItem("users"));
        if (users[loggedCustomerIndex] && users[loggedCustomerIndex].userCart) {
            var items = users[loggedCustomerIndex].userCart;
            return items;
        }
    }

    return [];


}

export const GetTotalByID = (ID, loggedCustomerIndex) => {

    let users = JSON.parse(localStorage.getItem("users"));
    let total = 0;
    users[loggedCustomerIndex].userCart && users[loggedCustomerIndex].userCart.forEach(Item => {

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
    localStorage.setItem("users", JSON.stringify(array));
}

const UpdateTotalByID = (val, ID, loggedCustomerIndex) => {
    let users = JSON.parse(localStorage.getItem("users"));
    let ID_Boolean = false;
    if (val == 0) {

    }
    users[loggedCustomerIndex].userCart.forEach((item, index) => {
        if (item.ID == ID) {

            let NewItem = { ...item, Total: val * item.ProductPrice };
            users[loggedCustomerIndex].userCart[index] = NewItem;
        }
    })
    SetUserArray(users);

}

const CreateUpdateUserCart = (MyQuantity, data, loggedCustomerIndex) => {
    let users = JSON.parse(localStorage.getItem("users"));
    let product = { ...data, Quantity: MyQuantity, Total: data.ProductPrice * MyQuantity };
    console.log(loggedCustomerIndex);
    let updatedCustomerDetails = { ...users[loggedCustomerIndex], userCart: [] }
    updatedCustomerDetails["userCart"].push(product);
    //  users = {...users, userCart:[]};
    users[loggedCustomerIndex] = updatedCustomerDetails;
    SetUserArray(users);
}

const UpdateCart = (MyQuantity, data, loggedCustomerIndex) => {
    console.log("updating the na data");
    let users = JSON.parse(localStorage.getItem("users"));
    if (data.Status) {
        let product = { ...data, Quantity: MyQuantity, Total: data.ProductPrice * MyQuantity };
        users[loggedCustomerIndex].userCart.push(product);
        SetUserArray(users);
    }
    else {
        return;
    }
}

export const SetUserOrder = (data) => {
    let order = [...data, { PaymentCompletion: true }];
    console.log(order);
}


export const SetQuantityByID = (val, data, loggedCustomerIndex) => {
    console.log("loggedCustomerIndex");
    console.log(loggedCustomerIndex);
    console.log(data);
    let users = JSON.parse(localStorage.getItem("users"));
    let ID = data.ID;
    let ProductBoolean = false;
    if (users[loggedCustomerIndex] && users[loggedCustomerIndex].userCart) {
        console.log("Cart Exist");
        users[loggedCustomerIndex].userCart.forEach((Item, index) => {
            // console.log(Item.Status);
            if (Item.ID == data.ID) {
                ProductBoolean = true;
                if (val == 0) {
                    UpdateTotalByID(val, data.ID, loggedCustomerIndex);
                    users[loggedCustomerIndex].userCart.splice(index, 1);
                } else {
                    let NewItem = { ...Item, Quantity: val };

                    users[loggedCustomerIndex].userCart[index] = NewItem;
                }
            }

        })
        console.log("Updated OBject");

        if (ProductBoolean) {
            console.log("Setting object");
            SetUserArray(users);
            if (val) {
                UpdateTotalByID(val, data.ID, loggedCustomerIndex);
            }
        }
        else {
            console.log("updating Cart");
            UpdateCart(val, data, loggedCustomerIndex);
        }

    }
    else {
        console.log("Creating cart");
        CreateUpdateUserCart(val, data, loggedCustomerIndex);
    }

}

export const  getAllProductsByOrderID = (ID, CustomerIndex,customerID) => {
    console.log(ID);
    console.log(CustomerIndex);
    let users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem("users")) : [];
    let indexOfObject = FindOrderDetailObjectByID(ID,customerID)
    console.log("indexOfObject",indexOfObject);
         if(users[CustomerIndex].orders[indexOfObject].orderList)
    return users[CustomerIndex].orders[indexOfObject];

}

export const changeAndSaveCart = (data, Amount, CustomerIndex) => {
    let users = JSON.parse(localStorage.getItem("users"));
    console.log(data);
    console.log(Amount);
    console.log(CustomerIndex);
    if (users[CustomerIndex] && users[CustomerIndex].orders) {
        users[CustomerIndex].orders.unshift({
            orderDetails: {
                orderID: Date.now(),
                totalAmount: Amount,
                paymentStatus: "successfull",
                createdDate: moment().format("YYYY/MM/DD")
            },
            orderList: data
        })
    } else {
        let userWithOrders = { ...users[CustomerIndex], orders: [] }

        userWithOrders.orders.unshift({
            orderDetails: {
                orderID: Date.now(),
                totalAmount: Amount,
                paymentStatus: "successfull",
                createdDate: moment().format("YYYY/MM/DD")
            },
            orderList: data
        })

        users[CustomerIndex] = userWithOrders;
    }

    users[CustomerIndex].userCart = [];
    console.log(users);
    localStorage.setItem("users", JSON.stringify(users));
}


export const GetQuantityByID = (ID, loggedCustomerIndex) => {
    console.log(loggedCustomerIndex)
    let users = JSON.parse(localStorage.getItem("users"));

    let Quantity = 0;
    if (users[loggedCustomerIndex]) {
        users[loggedCustomerIndex].userCart && users[loggedCustomerIndex].userCart.forEach(Item => {
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
    }
    console.log(Quantity);
    return Quantity;
}
