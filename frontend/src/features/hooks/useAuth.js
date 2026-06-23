import { useContext } from "react"
import { AuthContext } from "../auth.context"
import { changePassword, forgotPassword, getMe, loginUser, logoutUser, registerUser, resetPassword } from "../services/auth.api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";


export const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setUser, isLoading, setIsLoading } = context;


    const navigate = useNavigate();

    const registerFnd = async ({ name, email, password, role }) => {
        try {
            const response = await registerUser({ name, email, password, role });

            if(response.status === 201){
                navigate("/login");
                isLoading(false)
            }
            setUser(response.data);

            setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const loginFnd = async ({ email, password }) => {
        try {
            
            const response = await loginUser({ email, password });

            if(!response){
                toast.error("Invalid Credentials");
                setIsLoading(false);
                return;
            }

            if(response.status === 200){
                navigate("/");
                setIsLoading(false);
            }

            setIsLoading(false);
            setUser(response.data);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    const logoutFnd = async () => {
        try {
            const response = await logoutUser();
            setIsLoading(false);

            if(response.status === 200){
                setUser(null);
                toast.success("Logout Successful");
                navigate("/login")
            }

            setUser(null);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const forgotPasswordFnd = async ({ email }) => {
        try {

            const response = await forgotPassword({ email });

            if(response.status === 200){
                toast.success("Password Reset Link Sent Successfully");
                setIsLoading(false);
            }

            setIsLoading(false);

        } catch (error) {
            console.log(error);
            toast.error(error.message);
            toast.error("Something went wrong");
            setIsLoading(false);
        }
    }

    const resetPasswordFnd = async ({ token, password, confirmPassword }) => {
        try {
            const response = await resetPassword({ token, password, confirmPassword });

            if(response.status === 200){
                toast.success("Password Reset Successfully");
                navigate("/login");
                setIsLoading(false);
            }

            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const changePasswordFnd = async ({ oldPassword, password, confirmPassword }) => {
        try {

            const response = await changePassword({ oldPassword, password, confirmPassword });
            setIsLoading(false);
            setUser(response.data);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    const getMeFnd = async () => {
        try {

            const response = await getMe();
            setIsLoading(false);
            setUser(response.data);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
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