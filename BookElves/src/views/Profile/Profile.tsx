import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { ref, update, get, child } from "firebase/database";
import { saveImage } from "../../service/storage";
import { db } from "../../config/firebase-config";
import { useParams } from "react-router-dom";
import './Profile.css';
import Post from "../../components/Post/Post";
import { getAllPosts } from "../../service/post";

const Profile = () => {
    const { username } = useParams(); // Get the username from the URL
    const { userData } = useAppContext(); // Logged-in user's data
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [showEdit, setShowEdit] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [errorMessage] = useState('');

    const [posts, setPosts] = useState<Post[]>([]);

    // Function to fetch user data based on username
    const fetchUserProfile = async (username: string) => {
        const userRef = ref(db, `users/${username}`);
        const snapshot = await get(child(userRef, '/'));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.error("No data available");
            return null;
        }
    };

    useEffect(() => {
        getAllPosts("").then((posts) => setPosts(posts));
    }, []);

    const myPosts = posts.filter((post) => post.author === username);

    useEffect(() => {
        const loadUserProfile = async () => {
            if (username) {
                const userProfile = await fetchUserProfile(username);
                if (userProfile) {
                    setFirstName(userProfile.firstName);
                    setLastName(userProfile.lastName);
                    setEmail(userProfile.email);
                    setImage(userProfile.image);
                }
            }
        };

        loadUserProfile();
    }, [username]); // Add `username` as a dependency

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            try {
                const imgURL = await saveImage(file);
                if (imgURL) {
                    setImage(imgURL);
                    await update(ref(db, `users/${username}/`), { image: imgURL });
                }
            } catch (error) {
                console.error("Error uploading image: ", error);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            await update(ref(db, `users/${username}/`), { firstName, lastName, email });
            // Re-fetch the user profile after updating
            const updatedProfile = await fetchUserProfile(username);
            if (updatedProfile) {
                setFirstName(updatedProfile.firstName);
                setLastName(updatedProfile.lastName);
                setEmail(updatedProfile.email);
                setImage(updatedProfile.image);
            }
        } catch (error) {
            console.error("Error updating profile: ", error);
        }
    };

    const loadProfile = () => {
        setShowEdit(!showEdit);
    };

    return (
        userData && <div>
            <h1>Profile</h1>
            {image && <img src={image} alt="profile" className="profile-img" />}
            <div className="profile-edit">
                {/* render file input based on username match */}
                {userData.username === username &&
                    <label htmlFor="file-input" className='file-input-label'>Upload Image</label> &&
                    <input type="file" id="file-input" className='file-input' onChange={handleImage} />}

                {/* render edit button based on username match */}
                {userData.username === username && <button onClick={loadProfile} className="button-profile">Edit✎</button>}
            </div>
            {showEdit ? (
                <form className='edit-form-overlay'>
                    <div className='edit-form'>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <label>
                            First Name:
                            <input className='edit-info-input' type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                        </label><br />
                        <label>
                            Last Name:
                            <input className='edit-info-input' type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                        </label><br /><br />
                        {userData && <button onClick={handleSubmit} className="button-profile">Submit</button>}
                    </div>
                </form>
            ) : null}
            <div className='info-profile'>
                <p>{firstName}</p>
                <p>{lastName}</p>
                <p>{username}</p>
                <p>{email}</p>
                <p>Joined on: {new Date(userData?.createdOn).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            </div>

            <div>
               <h2>My Books</h2>
               {myPosts.length > 0 ? (
                   myPosts.map((post) => (
                       <Post key={post.id} post={post} setPosts={setPosts} />
                     ))
                ) : (   
                    <p>No books</p>
                )}
            </div>
        </div>

        
    );
}

export default Profile;
