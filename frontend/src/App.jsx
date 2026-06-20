import routes from "./app.routes";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./features/auth.context";

function App() {
  
  return (
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  )
}

export default App
