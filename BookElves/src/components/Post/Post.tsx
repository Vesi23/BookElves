import { useAppContext } from "../../context/appContext";
import { removeLike, addLike } from "../../service/post";

type Post = {
    user: string;
    title: string;
    description: string;
    imagePost: string;
    image: string;
    pagesRead: string;
    totalPages: string;
    createdOn: string;
    likes: number;
    id: string;
  };
  
  type PostProps = {
    post: Post;
    setPosts: (posts: Post[]) => void;
  };
  
  const Post: React.FC<PostProps> = ({ post, setPosts }) => {
    const {user, userData}=useAppContext();
 
    const handleLike = async () => {
        if (userData) {
            if (userData.likedPosts && userData.likedPosts.includes(post.id)) {
                await removeLike(user.username, post.id, post.likes);
            } else {
                await addLike(user.username, post.id, post.likes);
            }
        }
    }
    
return (
    <>
        <div className="post-div">
            <div className="post-header">
                <img src={post?.imagePost} alt="user" />
                <h4>{post.user}</h4>
            </div>
            <div className="post-body">
                <h3>{post?.title}</h3>
                <p>{post?.description}</p>
                <img src={post?.imagePost} alt="post" />
                <p>{post?.pagesRead}/{post?.totalPages}</p>
              
            </div>
            <div className="post-footer">
                <p>{post.createdOn}</p>
                <p>{post?.likes} likes</p>
                <button onClick={handleLike}>Like</button>
            </div>

        </div>
    </>
);
};
export default Post;