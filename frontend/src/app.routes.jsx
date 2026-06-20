import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
    {
        path : "/",
        element : <div>Home</div>
    },

    {
        path : "/hello-world",
        element : <div>Hello world!</div>
    }
]);

export default routes;