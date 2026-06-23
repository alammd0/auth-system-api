import { createBrowserRouter } from "react-router";
import Register from "./features/pages/Register";
import Login from "./features/pages/Login";
import ForgotPassword from "./features/pages/ForgotPassword";
import RessetPassword from "./features/pages/RessetPassword";
import Protected from "./features/components/Protected";
import Profile from "./features/pages/Profile";

const routes = createBrowserRouter([

    {
        path : "/",
        element : <Protected>
            <Profile />
        </Protected>
    },

    {
        path : "/register",
        element : <Register />
    },

    {
        path : "/login",
        element : <Login />
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