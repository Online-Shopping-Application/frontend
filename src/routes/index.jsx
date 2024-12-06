import { Route, Routes } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "./paths";

import AddProduct from "../Components/AddProduct";
import Search from "../Components/Search";

import SellerLandingPage from "../Components/SellerLandingPage";

import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

import VerifyOtpPage from '../pages/VerifyOtpPage/VerifyOtpPage';

import Notification from "../Components/NotificationTest/Notification";
import ReceiveNotification from "../Components/ReceiveNotification/ReceiveNotification";


const GlobalRouter = () => {
    return (
        <Routes>
            <Route path={PATH_PUBLIC.home} element={<UsersLandingPage/>} />
            <Route path={PATH_PUBLIC.login} element={<LoginPage/>} />
            <Route path={PATH_PUBLIC.register} element={<RegisterPage/>} />
            <Route path={PATH_PUBLIC.passwordChange} element={<ForgotPasswordPage/>} />
            <Route path={PATH_PUBLIC.verifyOtp} element={<VerifyOtpPage/>} />
            <Route path={PATH_DASHBOARD.dashboard} element={<Search/>} />
            <Route path="/sellerLandingPage" element = {<SellerLandingPage/>} />

            <Route path="/addProduct" element = {<AddProduct/>} />

            <Route path="/notification" element = {<Notification/>} />
            <Route path="/receive" element = {<ReceiveNotification/>} />

        </Routes>
    );
}

export default GlobalRouter;