
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function ForgotPassword() {

    const [email, setEmail] = useState("");

    const { isLoading, forgotPasswordFnd } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email) {
            forgotPasswordFnd({ email });

            setEmail("");
        } else {
            toast.error("Email is required");
        }
    }

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-800">

                <h1 className="text-3xl font-bold text-white text-center">
                    Forgot Password
                </h1>

                <p className="text-slate-400 text-center mt-2">
                    Enter your email address and we'll send you a password reset link.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-5">

                    <div>
                        <label className="text-slate-300 text-sm">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg text-white font-semibold"
                    >
                        Send Reset Link
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