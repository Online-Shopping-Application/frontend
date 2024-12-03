import { Route, Routes } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "./paths";

import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import VerifyOtpPage from '../pages/VerifyOtpPage/VerifyOtpPage'
import Dashboard from "../Components/Dashboard";
import OrderList from "../pages/OrderList";
import RefundRequestPage from "../pages/RefundRequestPage";

const GlobalRouter = () => {
    return (
      <Routes>
        <Route path={PATH_PUBLIC.login} element={<LoginPage/>} />
        <Route path={PATH_PUBLIC.register} element={<RegisterPage/>} />
        <Route path={PATH_PUBLIC.passwordChange} element={<ForgotPasswordPage/>} />
        <Route path={PATH_PUBLIC.verifyOtp} element={<VerifyOtpPage/>} />
        
        {/* Wrap all dashboard routes in the Dashboard layout */}
        <Route path="/*" element={<Dashboard />}>
          <Route path="dashboard" element={<OrderList />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="refund-request" element={<RefundRequestPage />} />
        </Route>
      </Routes>
    );
  }

export default GlobalRouter;