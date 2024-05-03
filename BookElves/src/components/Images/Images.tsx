import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { getUserByUsername } from "../../service/user";

const Image = ({ author }: string | any) => {
    const [user, setUser] = useState<any>(null);
    const { userData } = useAppContext();

    useEffect(() => {
        (async () => {
            const result = await getUserByUsername(author);
            setUser(result.val());
        })()

    }, [userData]);
    return (
        <>
            {user?.image ? <img className="img" src={user?.image} alt="user" /> : <span className="letter">{user?.handle[0]}</span>}
        </>
    )
}
export default Image;


