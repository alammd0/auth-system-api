
export default function ProfileInfo({ user }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-xl font-semibold text-white mb-4">
                Personal Information
            </h2>

            <div className="space-y-4 mb-4">

                <div>
                    <p className="text-slate-400">
                        Phone Number
                    </p>

                    <p className="text-white">
                        {user.profile?.phone}
                    </p>
                </div>

                <div>
                    <p className="text-slate-400">
                        Location
                    </p>

                    <p className="text-white">
                        {user.profile?.location}
                    </p>
                </div>

            </div>

            <hr className="border-slate-200 mt-4" />

            <div className="space-y-4 mt-2">
                <div>
                    <p className="text-slate-400">
                        Bio
                    </p>

                    <p className="text-white">
                        {user.profile?.bio}
                    </p>
                </div>
            </div>

        </div>
    )
}