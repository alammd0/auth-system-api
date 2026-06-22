import { createBrowserRouter } from "react-router";
import Register from "./features/pages/Register";
import Login from "./features/pages/Login";
import ForgotPassword from "./features/pages/ForgotPassword";
import RessetPassword from "./features/pages/RessetPassword";

const routes = createBrowserRouter([
    {
        path : "/register",
        element : <Register />
    },

    {
        path : "/login",
        element : <Login />
    },

    {
        path : "/profile",
        element : <div>
            THis Profile
        </div>
    },

    {
        path : "/forgot-password",
        element : <ForgotPassword />
    },

    {
        path : "/reset-password/:token",
        element : <RessetPassword />
    }
]);

export default routes;