import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {

    const [userInfo, setUserInfo] = useState(null);

    const { getMeFn  } = useAuth();

    useEffect( () => {
        const getUserInfo = async () => {
            try {
                const data = await getMeFn();

                setUserInfo(data.user);
            }
            catch(error){
                console.log(error);
            }
        }

        getUserInfo();

    }, [])

    console.log(userInfo);

    return (
        <div>

        </div>
    )
}