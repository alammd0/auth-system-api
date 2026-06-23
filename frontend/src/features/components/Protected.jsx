
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

export default function Protected({ children }) {

    const { isLoading, user } = useAuth();

    if (isLoading) {
        return <main>
            <div>Loading...</div>
        </main>;
    }

    if (!user) {
        <Navigate to="/login"/>;
    }

    return children;
}