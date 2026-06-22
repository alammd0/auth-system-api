import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { changePassword, forgotPassword, loginUser, logoutUser, registerUser, resetPassword } from "../services/auth.api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


export const useAuth = () => {
    const { isLoading, user, setIsLoading, setUser } = useContext(AuthContext);


    const navigate = useNavigate();

    const registerFnd = async ({ name, email, password, role }) => {
        try {
            setIsLoading(true);

            console.log(name, email, password, role);

            const response = await registerUser({ name, email, password, role });

            if(response.status === 201){
                navigate("/login");
            }

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

            if(!response){
                toast.error("Invalid Credentials");
                setIsLoading(false);
                return;
            }

            if(response.status === 200){
                navigate("/profile");
            }

            setIsLoading(false);
            setUser(response.data);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
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

            if(response.status === 200){
                toast.success("Password Reset Link Sent Successfully");
            }

            setIsLoading(false);

        } catch (error) {
            console.log(error);
            toast.error(error.message);
            toast.error("Something went wrong");
        }
    }

    const resetPasswordFnd = async ({ token, password, confirmPassword }) => {
        try {
            setIsLoading(true);
            const response = await resetPassword({ token, password, confirmPassword });

            if(response.status === 200){
                toast.success("Password Reset Successfully");
                navigate("/login");
            }

            setIsLoading(false);
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