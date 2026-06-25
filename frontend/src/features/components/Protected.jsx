
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

export default function Protected({ children }) {

    const { isLoading, user } = useAuth();

    console.log(user);

    if (isLoading) {
        return <main>
            <div>Loading...</div>
        </main>;
    }

    if (!user && !isLoading) {
        return <Navigate to="/login"/>;
    }

    return children;
}