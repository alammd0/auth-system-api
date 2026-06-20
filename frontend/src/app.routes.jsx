import { createBrowserRouter } from "react-router";
import Register from "./features/pages/Register";
import Login from "./features/pages/Login";

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
    }
]);

export default routes;