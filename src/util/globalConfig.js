import { PATH_DASHBOARD, PATH_PUBLIC } from "../routes/paths";

// Urls
export const HOST_API_KEY = "http://localhost:9090";
export const REGISTER_URL = "/user-service/api/v1/users/register";
export const LOGIN_URL = "/user-service/api/v1/users/login";
export const ME_URL = "/user-service/api/v1/users/me"

// Auth Routes
export const PATH_AFTER_REGISTER = PATH_PUBLIC.login;
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const PATH_AFTER_LOGOUT = PATH_PUBLIC.home;