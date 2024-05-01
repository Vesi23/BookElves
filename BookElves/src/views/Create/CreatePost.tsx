import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { toast } from 'react-hot-toast';
import { addPost } from "../../service/post";
import { Button } from "react-bootstrap";
import './CreatePost.css';

const CreatePost = () => {

    const { userData } = useAppContext();
    const [post, setPost] = useState({
        user: '',
        title: '',
        description: '',
        imagePost: '',
        image: '',
        pagesRead: '',
        totalPages: '',
    });

    const [category, setCategory] = useState('');
    const [totalPages, setTotalPages] = useState(0);
const [pagesRead, setPagesRead] = useState(0);

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
          pagesRead: '',
          totalPages: '',
        });
      
        setCategory('');
        toast.success('Post created successfully');
      };
     
      // const handlePageCounter = () => {
      //   // Use totalPages and pagesRead here...
      //   setPagesRead(pagesRead + 1);
      //   setTotalPages(totalPages);
      // };

        return (
            <div className="create-post-div">
            <h2 id='create-h2'>Create post</h2>
            <label htmlFor="input-title" id='input-title'>Name of the Book:</label>
            <input value={post.title} onChange={e => updatePost(e.target.value, 'title')} type="text" name="input-title" id="input-title" /><br />
            <label htmlFor="input-description" id='input-description'>Description:</label><br />
            <textarea value={post.description} onChange={e => updatePost(e.target.value, 'description')} name="input-description" id="input-description" cols={40} rows={10}></textarea><br /><br />
            <label htmlFor="input-image" id='input-image'>Image:</label>
            <input id="input-image" type="file" accept="image/*" onChange={e => updateImage(e.target.files, 'imagePost')} /><br />
            <label htmlFor="total-pages">Total Pages:</label>
<input type="text" id="total-pages" value={totalPages} onChange={e => {
  if (!isNaN(Number(e.target.value))) {
    // setTotalPages(e.target.value);
  }
}} />

<label htmlFor="pages-read">Pages Read:</label>
<input type="text" id="pages-read" value={pagesRead} onChange={e => {
  if (!isNaN(Number(e.target.value))) {
    // setPagesRead(e.target.value);
  }
}} />
            <Button id='btn-create' onClick={createPost}>Create</Button>


            </div>
        )};
    export default CreatePost;