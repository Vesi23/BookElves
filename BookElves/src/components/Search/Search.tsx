import { useEffect, useState } from "react";
import { getAllUsers } from "../../service/user";
import { NavLink, } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { getDatabase, ref, update } from "firebase/database";
import Button from "../Button/Button";


const Search = () => {
    const { userData } = useAppContext();
    const [users, setUsers] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const navigate = useNavigate();

    useEffect(() => {
        if (search !== '') {
            searchUser();
        }
    }, [search]);

    const handleSearch = (value: string) => {
        setSearch(value);

        if (value !== '') {
            searchUser();
        } else {
            setUsers([]);
        }
    };

    const searchUser = async () => {
        const snapshot = await getAllUsers();
        const filtered = snapshot.filter((user: any) => {
            return user.username && user.username.includes(search);
        });
        setUsers(filtered);
    };


    const handleAddFriend = async (user: { username: string, uid: string }) => {
        const db = getDatabase();
        const friendRequestRef = ref(db, `/users/${user.username}/friendsRequest/${userData.username}`);
        const newRequest = {
            username: userData.username,
            uid: userData.uid,
        };
        await update(friendRequestRef, newRequest);
    };


    return (
        <>
            {<Button onClick={() => setIsModalOpen(true)}
                id='btn-search'
            // className='btn-search'
            >Search
            </Button>}

            {isModalOpen && (
                <div>
                    <div>
                        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                        <input type='text' value={search} onChange={(e) => handleSearch(e.target.value)} />
                        <Button onClick={() => searchUser()}>Search</Button>
                        <div>
                            {users.map((user: any) => {

                                const isAlreadyFriend = userData?.friends ? Object.keys(userData?.friends)?.includes(user.username) : false;
                                const isAlreadyRequested = user?.friendsRequest ? Object.keys(user.friendsRequest)?.includes(userData?.username) : false;
                                return (
                                    <div key={user.uid}>
                                        <div>
                                            <NavLink to={`/profile/${user.username}`}>{user.username}</NavLink>
                                            {userData?.username !== user?.username && !isAlreadyFriend && !isAlreadyRequested && <Button className='search-modal-btn' onClick={() => handleAddFriend(user)}>Add Friend</Button>}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>)}
        </>
    );
};
export default Search;