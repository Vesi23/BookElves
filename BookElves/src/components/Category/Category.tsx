import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostsByCategory } from "../../service/post";
import Post from "../Post/Post";

const Category = () => {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (categoryName) {
      getPostsByCategory(categoryName).then(setPosts);
    }
  }, [categoryName]);


  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Post key={post.id} post={post} setPosts={setPosts} />
        ))
      ) : (
        <p>No posts found for this category.</p>
      )}
    </div>
  );
};

export default Category;