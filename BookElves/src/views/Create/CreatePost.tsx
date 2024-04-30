import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { toast } from 'react-hot-toast';
import { addPost } from "../../service/post";
import { Button } from "react-bootstrap";

const CreatePost = () => {

    const { userData } = useAppContext();
    const [post, setPost] = useState({
        user: '',
        title: '',
        description: '',
        imagePost: '',
        image: '',
    });

    const [category, setCategory] = useState('');
    const [pageCounter, setPageCounter] = useState(1);

    const handleSubmit = (event: any) => {
        setCategory(event.target.value);
    };

    const updatePost = (value: string, key: string) => {
        setPost({
            ...post,
            [key]: value,
        });
    };

    const updateImage = (files: any, key: string) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPost({
                ...post,
                [key]: reader.result,
            });
        };
        reader.readAsDataURL(files[0]);
    };
    const createPost = async () => {
        let isValid = true;
      
        if (post.title.length < 1 || post.title.length > 60) {
          toast.error('Post title must be between 1 and 60 characters');
          isValid = false;
        }
      
        if(post.description.length < 5 || post.description.length > 500){
          toast.error('Post description must be between 5 and 500 characters');
          isValid = false;
        }
      
        if (!isValid) {
          return;
        }
      
        let currentUserImg = '';
        if(userData.image){
          currentUserImg = userData.image;
        } else {
          currentUserImg = userData.username[0];
        }
      
        await addPost(userData.username, post.title, post.description, post.imagePost, currentUserImg, category);
      
        setPost({
          user: '',
          title: '',
          description: '',
          imagePost: '',
          image: '',
        });
      
        setCategory('');
        toast.success('Post created successfully');
      };
        return (
            <>
            <h2 id='create-h2'>Create post</h2>
            <label htmlFor="input-title" id='input-title'>Name of the Book:</label>
            <input value={post.title} onChange={e => updatePost(e.target.value, 'title')} type="text" name="input-title" id="input-title" /><br />
            <label htmlFor="input-description" id='input-description'>Description:</label><br />
            <textarea value={post.description} onChange={e => updatePost(e.target.value, 'description')} name="input-description" id="input-description" cols={30} rows={10}></textarea><br /><br />
            <label htmlFor="input-image" id='input-image'>Image:</label>
            <input id="input-image" type="file" accept="image/*" onChange={e => updateImage(e.target.files, 'imagePost')} /><br />
            <Button id='btn-create' onClick={createPost}>Create</Button>

            </>
        )};
    export default CreatePost;