import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";


export default function AuthForm({ type }) {


    const { registerFnd, loginFnd, isLoading } = useAuth();

    const [formData, setFormData] = useState({
        name : "",
        email : "",
        password : "",
        role : "User"
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (type === "register") {

            const { name, email, password, role } = formData;

            registerFnd({ name, email, password, role });
          
        } else {

            const { email, password } = formData;

            loginFnd({ email, password });

        }
    }

    if(isLoading){
        return <div>Loading...</div>
    }


    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-2">
            <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-xl p-4 border border-slate-800">
                <h1 className="text-3xl font-bold text-white text-center">
                    {
                        type === "register" ? "Create Account" : "Welcome Back"
                    }
                </h1>

                <p className="text-slate-400 text-center mt-2">
                    {
                        type === "register" ? "Join us and get started today" : "Login to your account"
                    }
                </p>

                <form onSubmit={handleSubmit}>
                    {
                        type === "register" &&
                        <div>
                            <label className="text-slate-300 text-sm">Name</label>

                            <input
                                type="text"
                                value={formData.name}
                                name="name"
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                            />
                        </div>
                    }

                    <div>
                        <label className="text-slate-300 text-sm">Email</label>

                        <input
                            type="email"
                            value={formData.email}
                            name="email"
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-slate-300 text-sm">Password</label>

                        <input
                            type="password"
                            value={formData.password}
                            name="password"
                            onChange={handleChange}
                            placeholder="Create password"
                            className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500"
                        />
                    </div>

                    {
                        type === "register" &&
                            <div>
                                <label className="text-slate-300 text-sm">Role</label>

                                <select
                                    name="role"
                                    onChange={handleChange}
                                    value={formData.role}   
                                    className="w-full mt-2 p-3 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-blue-500">
                                    <option>User</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                    }

                    <div className = "text-end mt-2 text-sm underline">
                        <Link to="/forgot-password" className="text-blue-400 mt-2 hover:text-blue-600">
                            Forgot Password?
                        </Link> 
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-lg text-white font-semibold mt-2 hover:cursor-pointer"
                    >
                        {
                            type === "register" ? "Create Account" : "Login"
                        }
                    </button>
                </form>

                <p className="text-center text-slate-400 mt-6">
                    {
                        type === "register" ? (
                            <>
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-400 hover:underline"
                                >
                                    Login
                                </Link>
                            </>
                        ) : (
                            <>
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-400 hover:underline"
                                >
                                    Register
                                </Link>
                            </>
                        )
                    }
                </p>
            </div>
        </div>
    )
}