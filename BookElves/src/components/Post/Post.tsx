
import { useAppContext } from "../../context/appContext";
import { removeLike, addLike } from "../../service/post";
import Image from "../Images/Images";
import { NavLink } from "react-router-dom";

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
    pagesRead: string;
    totalPages: string;
    title: string;

};

type PostProps = {
    post: Post;
    setPosts: (posts: Post[]) => void;
};

const Post: React.FC<PostProps> = ({ post, setPosts }) => {
    const { user, userData } = useAppContext();

    const handleLike = async () => {
        if (userData) {
            if (userData.likedPosts && userData.likedPosts.includes(post.id)) {
                await removeLike(userData.username, post.id, post.likes);
            } else {
                await addLike(userData.username, post.id, post.likes);
            }
        }
    }
    // console.log(post.author);


    return (
        <>
            <div className="post">
                <Image author={post.author} />
                <div id="user-info">
                    <NavLink to={`profile/${post.author}`}>{post.author}</NavLink>                    <p className='date'>{new Date(post.createdOn).toLocaleDateString('bg-BG')}</p>
                </div>
                <div id="post-info">
                    <h3>{post.title}</h3>
                    <p className="description">{post.description}</p>
                    {post.imagePost && <img src={post.image} alt="post" />}


                </div>
            </div>
        </>
    );
};
export default Post;