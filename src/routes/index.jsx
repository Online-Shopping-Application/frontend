import { Route, Routes } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "./paths";

import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import VerifyOtpPage from '../pages/VerifyOtpPage/VerifyOtpPage'
import Search from "../Components/Search";

const GlobalRouter = () => {
    return (
        <Routes>
            <Route path={PATH_PUBLIC.login} element={<LoginPage/>} />
            <Route path={PATH_PUBLIC.register} element={<RegisterPage/>} />
            <Route path={PATH_PUBLIC.passwordChange} element={<ForgotPasswordPage/>} />
            <Route path={PATH_PUBLIC.verifyOtp} element={<VerifyOtpPage/>} />
            <Route path={PATH_DASHBOARD.dashboard} element={<Search/>} />
        </Routes>
    );
}

export default GlobalRouter;