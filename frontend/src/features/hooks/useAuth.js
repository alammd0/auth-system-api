import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { changePassword, forgotPassword, loginUser, logoutUser, registerUser, resetPassword } from "../services/auth.api";


export const useAuth = () => {
    const { isLoading, user, setIsLoading, setUser } = useContext(AuthContext);

    const registerFnd = async ({ name, email, password, role }) => {
        try {
            setIsLoading(true);
            const response = await registerUser({ name, email, password, role });
            setIsLoading(false);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const loginFnd = async ({ email, password }) => {
        try {
            setIsLoading(true);
            const response = await loginUser({ email, password });
            setIsLoading(false);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const logoutFnd = async () => {
        try {
            setIsLoading(true);
            const response = await logoutUser();
            setIsLoading(false);
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }

    const forgotPasswordFnd = async ({ email }) => {
        try {
            setIsLoading(true);
            const response = await forgotPassword({ email });
            setIsLoading(false);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const resetPasswordFnd = async ({ token, password, confirmPassword }) => {
        try {
            setIsLoading(true);
            const response = await resetPassword({ token, password, confirmPassword });
            setIsLoading(false);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const changePasswordFnd = async ({ oldPassword, password, confirmPassword }) => {
        try {
            setIsLoading(true);
            const response = await changePassword({ oldPassword, password, confirmPassword });
            setIsLoading(false);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getMeFnd = async () => {
        try {
            setIsLoading(true);
            const response = await getMe();
            setIsLoading(false);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const updateProfileFnd = async ({ bio, phone, location, image }) => {
        try {

        }
        catch (error) {
            console.log(error);
        }
    }

    return {
        registerFnd,
        loginFnd,
        logoutFnd,
        forgotPasswordFnd,
        resetPasswordFnd,
        changePasswordFnd,
        getMeFnd,
        updateProfileFnd,
        isLoading,
        user
    }
}