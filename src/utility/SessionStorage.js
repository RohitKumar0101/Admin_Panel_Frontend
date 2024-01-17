import { create } from "@mui/material/styles/createTransitions";


export const SetCustomerDetails = (userDetails) => {
    let user = [];

    user.push({ userDetails });
    sessionStorage.setItem("user", JSON.stringify(user));
}

export const GetCustomer = () => {
    return JSON.parse(sessionStorage.getItem("user"));
}

const saveUser = (data) => {
    sessionStorage.setItem("user", JSON.stringify(data));
}

export const CartTotalAmount = () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let sum = 0;
    let total = user[0].userCart && user[0].userCart.forEach((product) => {
        
        sum = sum + product.Total;
    })
    return sum;
}

export const GetNumberOfItemInCart = () => {
    console.log("GetCartItems");
    let user = JSON.parse(sessionStorage.getItem("user"));
    let num = 0;
    user&&user[0].userCart && user[0].userCart.forEach((product) => {
        console.log("Increment");
        num = num + 1;

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
            total = Item.Total;
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
    if(val==0){

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

export const SetQuantityByID = (val, data) => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let ID = data.ID;
    let ProductBoolean = false;
    if (user[0].userCart) {
        console.log("Cart Exist");
        user[0].userCart.forEach((Item, index) => {
           
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
        } else {
            console.log("updating Cart");
            UpdateCart(val, data);
        }

    }
    else {
        console.log("Creating cart");
        CreateUpdateUserCart(val, data);
    }

}

export const GetQuantityByID = (ID) => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let Quantity = 0;
    user[0].userCart && user[0].userCart.forEach(Item => {
        //   console.log(Item.ID);
        //   console.log(ID);
        if (Item.ID == ID) {
            console.log("Quantity boolean true");
            Quantity = Item.Quantity;
        }
    });
    // console.log(Quantity);
    return Quantity;
}
