
import { Button } from "react-bootstrap";
import { useAppContext } from "../../context/appContext";
import { removeLike, addLike } from "../../service/post";
import Image from "../Images/Images";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

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

    const handleLike = async () => {
        if (userData) {
            if (post.likedBy.includes(userData?.username)) {
                await removeLike(userData.username, post.id, post.likes - 1);
             
            } else {
                await addLike(userData.username, post.id, post.likes + 1);
              
            }

            setPosts((currentPosts: any) => currentPosts.map((p: any) => {
                if (p.id === post.id) {
                    let updatedPost = { ...p };
                    if (updatedPost.likedBy.includes(userData.username)) {
                        updatedPost.likes -= 1;
                        updatedPost.likedBy = updatedPost.likedBy.filter((u:any) => u !== userData.username);
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

    // console.log(post.pagesRead, post.totalPages); // should log 23 and 200

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
                    {post.imagePost && <img src={post.image} alt="post" />}
                    {post.pagesRead && <p>Pages read: {post.pagesRead}/{post.totalPages}</p>}

                </div>
<Button onClick={handleLike} variant="outline-primary">{post.likedBy.includes(userData?.username) ? 'Unlike' : 'Like'} {post.likes}</Button>
            </div>
        </>
    );
};
export default Post;