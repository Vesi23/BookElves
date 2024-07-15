import { getDatabase, onChildRemoved, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { db } from "../../config/firebase-config";
import Image from "../Images/Images";

const FriendsList = () => {
    const [friendList, setFriendList] = useState<any>([]);
    const { userData } = useAppContext();

    useEffect(() => {
        onValue(ref(db, `users/${userData?.username}/friends`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const friends = Object.keys(data).map((key) => ({
                    id: key,
                    uid: data[key].uid,
                    username: data[key].username
                }));
                setFriendList(friends);
            } else {
                setFriendList([]);
            }
        });
        onChildRemoved(ref(db, `users/${userData?.username}/friends`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const friends = Object.keys(data).map((key) => ({
                    id: key,
                    uid: data[key].uid,
                    username: data[key].username
                }
                ));
                setFriendList(friends);
            } else {
                setFriendList([]);
            }
        });
    }, [userData]);



    const handleRemoveFriend = async (user: { username: string, uid: string }) => {
        const db = getDatabase();
        const friendRef = ref(db, `/users/${userData.username}/friends/${user.username}`);
        await remove(friendRef);
        const friendRef2 = ref(db, `/users/${user.username}/friends/${userData.username}`);
        await remove(friendRef2);
    };

    return (
        <>
            <h4>Friends</h4>
            <div>
                {friendList && friendList.map((friend: any, index: number) => (
                    <div key={index} >
                        <div>
                            <div>
                                <Image />
                            </div>
                            <div >
                                <NavLink  to={`/profile/${friend.username}`}>{friend.username}</NavLink>
                            </div>
                        </div>
                        <button  onClick={() => handleRemoveFriend(friend)}>Remove </button>
                    </div>
                ))}
            </div>
        </>
    );

}

export default FriendsList;
