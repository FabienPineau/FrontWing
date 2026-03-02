import { RouteObject } from "react-router-dom";
import CartPage from "../pages/CartPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import Homepage from "../pages/Homepage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

export const coreRoutes: RouteObject[] = [
  { path: "/", element: <Homepage /> },
  { path: "cart", element: <CartPage /> },
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
  { path: "forgot-password", element: <ForgotPasswordPage /> },
  { path: "reset-password/:token", element: <ResetPasswordPage /> },
];
