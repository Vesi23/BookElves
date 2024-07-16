import { useState } from "react";
import FriendsList from "../../components/FriendsList/FriendsList";
import FriendsRequest from "../../components/FriendsRequest/FriendsRequest";
import FriendsBlock from "../../components/FriendsBlock/FriendsBlock";
import Search from "../../components/Search/Search";
import './Friends.css';

const Friends = () => {
    const [view, setView] = useState('friendsList');//status->default

    const handleView = (view: string) => {
        switch (view) {
            case 'friendsList':
                return <FriendsList />
            case 'friendsRequest':
                return <FriendsRequest />
            case 'block':
                return <FriendsBlock/>
            default:
                return <FriendsList/>
        }
    };

    return (
        <div id="friends-view">
            <div>
                <button onClick={() => setView('friendsList')}>Friends</button>
                <button onClick={() => setView('friendsRequest')}>Friend Requests</button>
                <button onClick={() => setView('block')}>Block</button>
            <Search/>
            </div>
            {handleView(view)}
        </div>
    );

}
export default Friends;