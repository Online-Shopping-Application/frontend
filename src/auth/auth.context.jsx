import { useReducer } from "react";
import { useCallback } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, setSession } from "./auth.util";
import axiosInstance from "../util/axiosInstance";
import { LOGIN_URL, ME_URL, PATH_AFTER_LOGIN, PATH_AFTER_LOGOUT, PATH_AFTER_REGISTER, REGISTER_URL } from "../util/globalConfig";
import { useEffect } from "react";
import toast from "react-hot-toast";

// we need reducer function for useReducer hook
const authReducer = (state,action) => {
    if(action.type == "LOGIN"){
        return {
            ...state,
            isAuthenticated: true,
            isAuthLoading: false,
            user: action.payload,
        };
    }
    if(action.type == "LOGOUT"){
        return {
            ...state,
            isAuthenticated: false,
            isAuthLoading: false,
            user: undefined
        };
    }

    return state;
}

// we need an initial state object(for return object) for useReducer hook
const initialAuthState = () => {
    return {
        isAuthenticated: false,
        isAuthLoading: true,
        user: undefined
    }
}

// we create our context here and export it
export const AuthContext = createContext(null);

// we create a component to manage all auth functionalities and export it and use it
const AuthContextProvider = ({ children }) => {
    const [state,dispatch] = useReducer(authReducer,initialAuthState);
    const navigate = useNavigate();

    // initialize method
    const initializeAuthContext = useCallback(async () => {
        try{
            const token = getSession();
            if(token){
                // validate access token by calling backend
                const response = await axiosInstance.post(ME_URL,{
                    token
                });
                // in response, we receive token and user data
                const {newToken,userInfo} = response;
                setSession(newToken);
                dispatch({
                    type: "LOGIN",
                    payload: userInfo
                });
            }
            else{
                setSession(null);
                dispatch({
                    type: "LOGOUT",
                });
            }

        } catch (error){
            setSession(null);
            dispatch({
                type: "LOGOUT",
            });

        }
    },[]);

    // In start of application, we call initializeAuthContext to be sure about authentication status
    useEffect(() => {
        console.log("AuthContext Initialization Start");
        initializeAuthContext()
            .then(() => console.log("initializeAuthContext was successfull"))
            .catch((error) => console.log(error));
    },[]);

    // register method
    const register = useCallback(async (firstName,lastName,email,password) => {
        const response = await axiosInstance.post(REGISTER_URL,{
            firstName,
            lastName,
            email,
            password,
        });
        console.log("Register Result : ",response);
        toast.success("Register Was Successfull, Please Login");
        navigate(PATH_AFTER_REGISTER);
    },[]);

    // login method
    const login = useCallback(async (username,password) => {
        const response = await axiosInstance.post(LOGIN_URL,{
            username,
            password
        });
        const {accessToken,userInfo} = response;
        setSession(accessToken);
        dispatch({
            type: "LOGIN",
            payload: userInfo
        });
        toast.success("Login Was Successfull");
        navigate(PATH_AFTER_LOGIN);
    },[]);

    // logout method
    const logout = useCallback(() => {
        setSession(null);
        dispatch({
            type: "LOGOUT"
        });
        navigate(PATH_AFTER_LOGOUT);
    },[]);

    // we create object for values of context provider
    const valuesObject = {
        isAuthenticated: state.isAuthenticated,
        isAuthLoading: state.isAuthLoading,
        user: state.user,
        register,
        login,
        logout
    }

    return <AuthContext.Provider value={valuesObject}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;