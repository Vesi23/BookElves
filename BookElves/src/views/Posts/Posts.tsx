import { useSearchParams } from 'react-router-dom';
import './Posts.css';
import { useEffect, useState } from "react";
import { getAllPosts } from '../../service/post';
import Post from '../../components/Post/Post';


const Posts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [search, setSearch] = useSearchParams();

    const searchPosts = search.get('search') || '';
    const setSearchPosts = (value: string) => {
        setSearch({ search: value });
    }
    useEffect(()=>{
        getAllPosts(searchPosts).then(setPosts);

    },[searchPosts]);

    return (
        <>
        <label htmlFor="search">Search</label>
        <input type="text" id="search" value={searchPosts} onChange={(e) => setSearchPosts(e.target.value)} />

        {posts.length>0 ? (
            posts.map((post) => (
                <Post key={post.id} post={post} setPosts={setPosts} />
            ))

            ):
            (<h1>No posts found</h1>)
        }
        </>
    );


}
export default Posts;
