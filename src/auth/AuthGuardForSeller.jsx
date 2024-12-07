import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth.hook";
import { PATH_PUBLIC } from "../routes/paths";

const AuthGuardForSeller = () => {
    const { user } = useAuth();

    return user?.role.includes("seller") ? <Outlet/> : <Navigate to={PATH_PUBLIC.login} />;

}

export default AuthGuardForSeller;