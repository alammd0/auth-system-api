
export default function ProfileHeader({ user }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                    src={user.profile?.image}
                    alt={user.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                />

                <div>
                    <h1 className="text-3xl font-bold text-white">
                        {user.name}
                    </h1>

                    <p className="text-slate-400">
                        {user.email}
                    </p>

                    <div className="flex gap-3 mt-4">

                        <span className="bg-blue-600 px-3 py-1 rounded-full text-white text-sm">
                            {user.role}
                        </span>

                        <span
                            className={`px-3 py-1 rounded-full text-sm text-white ${
                                user.isVerified
                                ? "bg-green-600"
                                : "bg-red-600"
                            }`}
                        >
                        {user.isVerified
                            ? "Verified"
                            : "Not Verified"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}