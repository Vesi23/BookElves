// import { get } from "firebase/database";
// import { useAppContext } from "../../context/appContext";
// import { useState } from "react";
// import { ref } from "firebase/storage";

// const Image=()=>{
// const [data, setData] = useState<any>(null);
// const { userData } = useAppContext();
// const [image, setImage] = useState<string>('');
// const [error, setError] = useState(false);
// const [errorMessage] = useState('');
// const [loading, setLoading] = useState(false);

// const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files && e.target.files[0];

//     if (file) {
//         const imgURL = await saveImage(file);
//         imgURL && setImage(imgURL);
//         update(ref(db, `users/${userData.username}/`), { image: imgURL })
//     }
// };

// const handleSubmit = async () => {
//     update(ref(db, `users/${userData.username}/`), { image: image });
// };

// const loadProfile = () => {
//     setImage(userData.image);
// };

// return (
//     userData && <div>
//         <h1>Profile</h1>
//         {userData.image && <img src={userData?.image} alt="profile" />}
//         {userData}
//     </div>
// )

// }
