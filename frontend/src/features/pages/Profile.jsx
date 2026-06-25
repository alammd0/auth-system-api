import { useEffect, useState } from "react";
import AboutCard from "../components/profile/AboutCard";
import ActionCard from "../components/profile/ActionCard";
import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useAuth } from "../hooks/useAuth";


export default function Profile() {

    // const [userInfo, setUserInfo] = useState(null);

    // const { getMeFnd } = useAuth();

    // const getUserInfo = async () => {
    //     try {
    //         const response = await getMeFnd();

    //         setUserInfo(response.data.data);
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     getUserInfo();
    // }, []);

    const { user } = useAuth();

    

    return (
        <div className="min-h-screen bg-slate-950 p-6">
            <div className="max-w-6xl mx-auto space-y-6">

                 {/* Profile Header */}
                <ProfileHeader user={user} />

                {/* Information Cards */}
                <ProfileInfo user={user} />

                {/* Action Buttons */}
                <ActionCard />

            </div>
        </div>
    )
}