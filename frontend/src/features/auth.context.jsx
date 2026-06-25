import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        const getandSetUser = async () => {
            try {
                const data = await getMe();

                console.log(data.data.data);

                setUser(data.data.data);

                setIsLoading(false);
            }
            catch(error){
                console.log(error);
                setIsLoading(false);
            }
        }
        
        getandSetUser();

    }, [])

    return (
        <AuthContext.Provider value={{ isLoading, user, setIsLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}