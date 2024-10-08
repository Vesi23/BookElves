
import { useAppContext } from "../../context/appContext";
import { removeLike, addLike } from "../../service/post";
import Image from "../Images/Images";
import { NavLink } from "react-router-dom";
import './Post.css';
// import { useState } from "react";

type Post = {
    id: string;
    author: string;
    category: string;
    createdOn: string;
    description: string;
    image: string;
    imagePost: string;
    likedBy: string[];
    likes: number;
    pagesRead: number; // updated this line
    totalPages: number; // updated this line
    title: string;

};

type PostProps = {
    post: Post;
    // setPosts: (posts: Post[]) => void;
    setPosts: any;
};

const Post: React.FC<PostProps> = ({ post, setPosts }) => {
    const { userData } = useAppContext();
    // const [isLiked, setIsLiked] = useState<boolean>(false);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       if(userData){
        if(event.target.checked){
            addLike(userData.username, post.id, post.likes + 1);
       }else{
        removeLike(userData.username, post.id, post.likes - 1);
       }
       }
    }
    const handleLike = async () => {

        if (userData) {
            let newLikeStatus;
            if (post.likedBy.includes(userData?.username)) {
                // Ensure post.likes is a number before decrementing
                let likes = isNaN(post.likes) ? 0 : post.likes;
                await removeLike(userData.username, post.id, likes - 1);
                newLikeStatus = false;
            } else {
                // Ensure post.likes is a number before incrementing
                let likes = isNaN(post.likes) ? 0 : post.likes;
                await addLike(userData.username, post.id, likes + 1);
                newLikeStatus = true;
            }

            setPosts((currentPosts: any) => currentPosts.map((p: any) => {
                if (p.id === post.id) {
                    let updatedPost = { ...p };
                    if (updatedPost.likedBy.includes(userData.username)) {
                        updatedPost.likes -= 1;
                        updatedPost.likedBy = updatedPost.likedBy.filter((u: any) => u !== userData.username);
                    } else {
                        updatedPost.likes += 1;
                        updatedPost.likedBy = [...updatedPost.likedBy, userData.username];
                    }
                    return updatedPost;
                }
                return p;
            }));
        };
    }

    

    return (
        <>
            <div className="post">
                <Image author={post.author} />
                <div id="user-info">
                    <NavLink to={`/profile/${post.author}`}>{post.author}</NavLink>
                    <p className='date'>{new Date(post.createdOn).toLocaleDateString('bg-BG')}</p>
                </div>
                <div id="post-info">
                    <h3>{post.title}</h3>
                    <p className="description">{post.description}</p>
                    {post?.imagePost && <img src={post.image} alt="post"  className="post-img"/>}
                    {post.pagesRead > 0 && <p>Pages Read: {post.pagesRead} / {post.totalPages}</p>}

                </div>
                <div className="heart-container" title={post.likedBy.includes(userData?.username) ? 'Unlike' : 'Like'} onClick={handleLike}>
                    {/* <input type="checkbox" className="checkbox" id="Give-It-An-Id" checked={post.likedBy.includes(userData?.username)} /> */}
                    <input
                        type="checkbox"
                        className="checkbox"
                        checked={post.likedBy.includes(userData?.username)}
                        onChange={handleCheckboxChange}
                    />
                    <div className="svg-container">
                        <svg viewBox="0 0 24 24" className="svg-outline" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                        </svg>
                        <svg viewBox="0 0 24 24" className="svg-filled" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                        </svg>
                        <svg className="svg-celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="10,10 20,20"></polygon>
                            <polygon points="10,50 20,50"></polygon>
                            <polygon points="20,80 30,70"></polygon>
                            <polygon points="90,10 80,20"></polygon>
                            <polygon points="90,50 80,50"></polygon>
                            <polygon points="80,80 70,70"></polygon>
                        </svg>
                    </div>
                </div>
            </div>

        </>
    );
};
export default Post;