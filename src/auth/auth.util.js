import axiosInstance from "../util/axiosInstance";

export const setSession = (accessToken, refreshToken) => {
    if(accessToken && refreshToken){
        localStorage.setItem("accessToken",accessToken);
        localStorage.setItem("refreshToken",refreshToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    }
    else{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        delete axiosInstance.defaults.headers.common.Authorization;
    }
};

export const getSession = () => {
    const accToken = localStorage.getItem("accessToken");
    const refToken = localStorage.getItem("refreshToken");
    return {
        accToken,
        refToken
    };
};