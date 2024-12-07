import useAuth from "../hook/useAuth.hook";

const AuthGuardForCustomer = () => {
    const { user } = useAuth();

    return user?.role.includes("customer") ? <Outlet/> : <Navigate to={PATH_PUBLIC.login} />;
}

export default AuthGuardForCustomer;