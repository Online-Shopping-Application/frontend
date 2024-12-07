import { Navigate } from "react-router-dom";
import useAuth from "../hook/useAuth.hook";
import { PATH_PUBLIC } from "../routes/paths";

const AuthGuardForAdmin = () => {
    const { user } = useAuth();

    return user?.role.includes("admin") ? <Outlet/> : <Navigate to={PATH_PUBLIC.login} />;
}

export default AuthGuardForAdmin;