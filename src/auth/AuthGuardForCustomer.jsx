import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth.hook";
import { PATH_PUBLIC } from "../routes/paths";
import AuthSpinner from "../Components/public/AuthSpinner";

const AuthGuardForCustomer = () => {
    const { isAuthenticated, user, isAuthLoading } = useAuth();

    // console.log(user);
    // console.log(isAuthenticated);
    // console.log(isAuthLoading);

    const hasAccess = isAuthenticated && user?.role.includes("customer");

    if(isAuthLoading){
        return <AuthSpinner/>
    }

    return hasAccess ? <Outlet/> : <Navigate to={PATH_PUBLIC.unauthorized} />;
}

export default AuthGuardForCustomer;