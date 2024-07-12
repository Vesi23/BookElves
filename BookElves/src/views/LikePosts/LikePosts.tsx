import { useEffect, useState } from "react";
import Post from "../../components/Post/Post";
import { useAppContext } from "../../context/appContext";
import { getAllPosts } from "../../service/post";

const LikedPosts: React.FC = () => {
    const { userData } = useAppContext();
    const [posts, setPosts] = useState<Post[]>([]);


    useEffect(() => {
        getAllPosts("").then((posts) => setPosts(posts));
    }, []);

    //Filter posts that have been liked by the user
    const likedPosts = posts.filter((post) => post.likedBy.includes(userData.username));

    return (
        <>
            <h1>Liked Posts</h1>
            {likedPosts.length > 0 ? (
                likedPosts.map((post) => (
                    <Post key={post.id} post={post} setPosts={setPosts} />
                ))
            ) : (
                <p>No liked posts</p>
            )}
        </>
    )
}
export default LikedPosts;