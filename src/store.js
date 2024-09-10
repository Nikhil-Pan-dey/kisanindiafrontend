import { configureStore } from '@reduxjs/toolkit';
import {
    prodcutSeedListReducer,
    prodcutSeedDetailsReducer,
    prodcutSeedDeleteReducer,
    seedCreateReducer,
    seedUpdateReducer,
    productReviewCreateReducer
} from './reducers/productSeedReducer';
import {
    productLendMachinesListReducer,
    productLendMachinesDetailsReducer,
    productLendMachinesDeleteReducer,
    LendMachinesCreateReducer,
    LendMachinesUpdateReducer
} from './reducers/productLendMachineReducer';
import { cartSeedReducer } from './reducers/cartReducers';
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListeReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducer';
import {
    consumerProductListReducer,
    consumerProductDetailsReducer,
    consumerProductDeleteReducer,
    consumerCreateReducer,
    consumerUpdateReducer
} from './reducers/consumerProductsReducer';
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer
} from './reducers/orderReducers';
import {
    productCreateReducer,
    supplierProdictListMyReducer,
    supplierProductListReducer,
    FarmerProductDetailsReducer,
    farmerReviewCreateReducer,
    farmerProductUpdateReducer,
    supplierProductForAllListReducer
} from './reducers/supplierReducers';

// Combine reducers into a single object
const rootReducer = {
    prodcutSeedList: prodcutSeedListReducer,
    prodcutSeedDetails: prodcutSeedDetailsReducer,
    prodcutSeedDelete: prodcutSeedDeleteReducer,
    seedCreate: seedCreateReducer,
    seedUpdate: seedUpdateReducer,
    productReviewCreate: productReviewCreateReducer,

    productLendMachinesList: productLendMachinesListReducer,
    productLendMachinesDetails: productLendMachinesDetailsReducer,
    productLendMachinesDelete: productLendMachinesDeleteReducer,
    LendMachinesCreate: LendMachinesCreateReducer,
    LendMachinesUpdate: LendMachinesUpdateReducer,

    consumerProductList: consumerProductListReducer,
    consumerProductDetails: consumerProductDetailsReducer,
    consumerProductDelete: consumerProductDeleteReducer,
    consumerCreate: consumerCreateReducer,
    consumerUpdate: consumerUpdateReducer,

    productCreate: productCreateReducer,
    supplierProdictListMy: supplierProdictListMyReducer,
    supplierProductList: supplierProductListReducer,
    FarmerProductDetails: FarmerProductDetailsReducer,
    farmerReviewCreate: farmerReviewCreateReducer,
    farmerProductUpdate: farmerProductUpdateReducer,
    supplierProductForAllList: supplierProductForAllListReducer,

    cartSeed: cartSeedReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListeReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderDeliver: orderDeliverReducer
};

// Initial state from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

const initialState = {
    cartSeed: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    }
};

// Create the store
const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState
});

export default store;
