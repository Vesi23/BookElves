import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { get, getDatabase, onValue, ref, remove } from "firebase/database";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Image from "../Images/Images";
const FriendsBlock = () => {
    const { userData } = useAppContext();
    const [blockList, setBlockList] = useState<any>([]);

    useEffect(() => {
        const db = getDatabase();
        const blockRef = ref(db, `users/${userData.username}/blockedUsers`);

        onValue(blockRef, async (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const blockList = await Promise.all(Object.keys(data).map(async (key) => {
                    const userRef = ref(db, `users/${key}`);
                    const snapshot = await get(userRef);
                    const userInfo = snapshot.val();
                    return {
                        id: key,
                        username: data[key],
                        ...userInfo
                    };
                }));
                setBlockList(blockList);
            } else {
                setBlockList([]);
            }
        });
    }, [userData]);

    const handleUnblock = (id: string) => {
        const db = getDatabase();
        const blockUserRef = ref(db, `users/${userData.username}/blockedUsers/${id}`);
        remove(blockUserRef).then(() => {
            setBlockList(blockList.filter((user: any) => user.id !== id));
            toast.success('User unblocked successfully');
        });
    };

    return (
        <>
            <h3 >Block List</h3>
            <div >
                {blockList && blockList.map((user: any, index: number) => (
                    <div key={index}>
                        <div>
                            <div className="image">
                                <Image />
                            </div>
                            <div >
                                <NavLink to={`/profile/${user.username}`}>{user.username}</NavLink>
                            </div>
                        </div>
                        <button onClick={() => handleUnblock(user.id)}>Unblock</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default FriendsBlock;