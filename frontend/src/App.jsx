import routes from "./app.routes";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./features/auth.context";
import { ToastContainer } from "react-toastify";


function App() {
  
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
      <ToastContainer />
    </AuthProvider>
  )
}

export default App
