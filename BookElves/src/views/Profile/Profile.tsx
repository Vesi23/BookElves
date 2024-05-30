import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { ref,  update } from "firebase/database";
import { saveImage } from "../../service/storage";
import { db } from "../../config/firebase-config";
import './Profile.css';

const Profile = () => {
    const { userData } = useAppContext();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [showEdit, setShowEdit] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [image, setImage] = useState<string>('');
    const [errorMessage] = useState('');

    useEffect(() => {
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setImage(userData.image);
    }, [userData]);

    const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];

        if (file) {
            const imgURL = await saveImage(file);
            imgURL && setImage(imgURL);
            update(ref(db, `users/${userData.username}/`), { image: imgURL })
        }
    };

    const handleSubmit = async () => {
        update(ref(db, `users/${userData.username}/`), { firstName: firstName, lastName: lastName, email: email });
    };

    const loadProfile = () => {
        setFirstName(userData?.firstName || '');
        setLastName(userData?.lastName || '');
        setEmail(userData?.email || '');
        setImage(userData?.image || '');
        setShowEdit(!showEdit);
    };

    return (
    userData && <div>
        <h1>Profile</h1>
        {userData.image && <img src={image} alt="profile" className="profile-img" />}
      <div className="profile-edit">
      <label htmlFor="file-input" className='file-input-label'>Upload Image</label>
          <input type="file" id="file-input" className='file-input' onChange={handleImage} />
          {userData && <button onClick={loadProfile} className="button-profile">Edit✎</button>}
      </div>
      {showEdit ? (
        <form className='edit-form-overlay'>
          <div className='edit-form'>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <label>
              First Name:
              <input className='edit-info-input' type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
            </label><br></br>
            <label>
              Last Name:
              <input className='edit-info-input' type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
            </label><br></br><br></br>
            {userData && <button onClick={handleSubmit} className="button-profile">Submit</button>}
          </div>
        </form>
      ) : null}
       <div className='info-profile'>
        <p>First Name: {userData?.firstName}</p>
        <p>Last Name: {userData?.lastName}</p>
        <p>Username: {userData?.username}</p>
        <p>Email: {userData?.email}</p>
        <p>Joined on: {new Date(userData?.createdOn).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
      </div>
    </div>
    )
}
export default Profile;