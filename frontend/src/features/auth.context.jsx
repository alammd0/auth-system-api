import { createContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ isLoading, user, setIsLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}