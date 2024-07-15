import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { onValue, ref, onChildRemoved } from "firebase/database";
import { db } from "../../config/firebase-config";
import { acceptFriendRequest, rejectFriendRequest } from "../../service/friends";
import { NavLink } from "react-router-dom";
import Image from "../Images/Images";

interface Request {
    id: string;
    uid: string;
    username: string;
}

const FriendsRequest = () => {
    const [requests, setRequests] = useState<Request[]>([]);
    const { userData } = useAppContext();

    useEffect(() => {
        onValue(ref(db, `users/${userData?.username}/friendsRequest`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const requests = Object.keys(data).map((key) => ({
                    id: key,
                    uid: data[key].uid,
                    username: data[key].username
                }));
                setRequests(requests);
            } else {
                setRequests([]);
            }
        });

        onChildRemoved(ref(db, `users/${userData?.username}/friendsRequest`), (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const requests = Object.keys(data).map((key) => ({
                    id: key,
                    uid: data[key].uid,
                    username: data[key].username
                }
                ));
                setRequests(requests);
            } else {
                setRequests([]);
            }
        });
    }, [userData]);

    const handleAcceptRequest = (friendUser: any) => {
        acceptFriendRequest(userData, friendUser);
    };

    const handleRejectRequest = (friendUser: any) => {
        rejectFriendRequest(userData, friendUser);
    };

    return (
        <>
            <h4 >Friend Requests</h4>
            <div>
                {requests.map(request => (
                    <div key={request.id}>
                        <div>
                            <div>
                                <Image />
                            </div>
                            <div>
                                <NavLink to={`/profile/${request.username}`}>{request.username}</NavLink>
                            </div>
                        </div>
                        <button onClick={() => handleAcceptRequest(request)}>Accept</button>
                        <button onClick={() => handleRejectRequest(request)}>Reject</button>
                    </div>
                ))}
            </div>
        </>
    )

}
export default FriendsRequest;