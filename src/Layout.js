import React from 'react';
import {Routes, Route } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LoginComponent from './components/Login/LoginComponent';
import Register from './components/Register/Register';
import PlaceOrder from './components/PlaceOrder/PlaceOrder.jsx';

import HomeScreen from './screens/Home/HomeScreen';
import Consumer from './screens/Consumer/ConsumerScreen';
import Farmer from './screens/Farmer/FarmerScreen';
import Supplier from './screens/Supplier/SupplierScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import DashboardScreen from './screens/Dashboard/DashboardScreen';
import AdminProfileScreen from './screens/Dashboard/ProfileScreen';
import Farmer_ProductSeed from './screens/Farmer_ProductSeed/Farmer_ProductSeedScreen';
import SeedProductScreen from './screens/Product_Seed/SeedProductScreen';
import Farmer_LendScreen from './screens/Farmer_LendMachine/Farmer_LendScreen';
import LendMachineProduct from './screens/Product_LendMachine/LendMachineProduct';
import PaymentMethodScreen from './screens/Payment/PaymentMethodScreen';
import ConsumerProductDetailScreen from './screens/Product_Consumer/ConsumerProductDetailScreen';
import ShippingScreen from './screens/Shipping/ShippingScreen';
import OrderScreen from './screens/Order/OrderScreen';
import Cart from './screens/Cart/Cart';
import UserListScreen from './screens/Dashboard/UserListScreen';
import UserEditScreen from './screens/UserEdit/UserEditScreen';
import ProductListScreen from './screens/Dashboard/ProductListScreen';
import SeedListEdit from './screens/ProductListEdit/SeedListEdit/SeedListEdit';
import MachineListEdit from './screens/ProductListEdit/MachineListEdit/MachineListEdit';
import ConsumerListEdit from './screens/ProductListEdit/ConsumerListEdit/ConsumerListEdit';
import SupplierProductEdit from './components/SupplierProductEdit/SupplierProductEdit';
import OrderListScreen from './screens/Dashboard/OrderListScreen';
import HarvestScreen from './screens/Dashboard/HarvestScreen';
import FarmerProduct from './screens/FarmerProducts/FarmerProducts';
import MapScreen from './screens/Dashboard/MapScreen';

const Layout = () => {
    return (
        <div>
        
            <Header />
            <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/farmer" element={<Farmer />} />
                <Route path="/consumer" element={<Consumer />} />
                <Route path="/supplier" element={<Supplier />} />
                <Route path="/farmers/sellMeterial" element={<LoginComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/login/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentMethodScreen />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
                <Route path="/cart/:id?" element={<Cart />} />
                <Route path="/order/:id" element={<OrderScreen />} />

                <Route path="/admin/userList" element={<UserListScreen />} />
                <Route path="/admin/dashboard" element={<DashboardScreen />} />
                <Route path="/admin/profile" element={<AdminProfileScreen />} />
                <Route path="/admin/productlist" element={<ProductListScreen />} />
                <Route path="/admin/orderlist" element={<OrderListScreen />} />
                <Route path="/admin/supplierproducts" element={<HarvestScreen />} />
                <Route path="/admin/map" element={<MapScreen />} />
                <Route path="/admin/productlist/seed/:id/edit" element={<SeedListEdit />} />
                <Route path="/admin/productlist/machine/:id/edit" element={<MachineListEdit />} />
                <Route path="/admin/productlist/consumer/:id/edit" element={<ConsumerListEdit />} />
                <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
                <Route path="/supplierproducts/:id/review" element={<FarmerProduct />} />
                <Route path="/supplierproducts/:id/edit" element={<SupplierProductEdit />} />

                <Route path="/farmers/purchaseSeeds" element={<Farmer_ProductSeed />} />
                <Route path="/farmers/purchaseSeeds/:id" element={<SeedProductScreen />} />
                <Route path="/farmers/lendMachines" element={<Farmer_LendScreen />} />
                <Route path="/farmers/lendMachines/:id" element={<LendMachineProduct />} />
                <Route path="/consumer/:id" element={<ConsumerProductDetailScreen />} />
            </Routes>
            <Footer />
        
        </div>
    );
};

export default Layout;
