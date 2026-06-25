import { useAuth } from "../../hooks/useAuth";


export default function ActionCard() {

    const { logoutFnd } = useAuth();

    const handleLogout = () => {
        logoutFnd();
    }

    return (
        <div className="flex flex-wrap gap-4">

            <button className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">
                Edit Profile
            </button>

            <button className="px-5 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white">
                Change Password
            </button>

            <button onClick={handleLogout} className="px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white">
                Logout
            </button>

        </div>
    )
}