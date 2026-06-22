
import { useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function ResetPassword() {

    const {
        isLoading,
        resetPasswordFnd
    } = useAuth();

    const token = useParams().token;

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(formData.password === formData.confirmPassword) {
            resetPasswordFnd({ token, password: formData.password, confirmPassword: formData.confirmPassword });
        }

        setFormData({
            password: "",
            confirmPassword: ""
        });
    };

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-800">

                <h1 className="text-3xl font-bold text-white text-center">
                    Reset Password
                </h1>

                <p className="text-slate-400 text-center mt-2">
                    Create a new password for your account.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="text-slate-300 text-sm">
                            New Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-slate-300 text-sm">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-lg text-white font-semibold"
                    >
                        Reset Password
                    </button>
                </form>

                <p className="text-center text-slate-400 mt-6">
                    Remember your password?{" "}
                    <Link
                        to="/login"
                        className="text-blue-400 hover:underline"
                    >
                        Back to Login
                    </Link>
                </p>

            </div>
        </div>
    );
}