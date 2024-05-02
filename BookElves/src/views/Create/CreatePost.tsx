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
    pagesRead: Number(),
    totalPages: Number(),
  });

  const [category, setCategory] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [pagesRead, setPagesRead] = useState('');

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

  const handlePageCounter = () => {
    if (Number(pagesRead) > Number(totalPages)) {
      toast.error('Pages read cannot be greater than total pages');
      return;
    }

    if (Number(pagesRead) < 0 || Number(totalPages) < 0) {
      toast.error('Pages cannot be less than 0');
      return;
    }

    if (isNaN(Number(pagesRead)) || isNaN(Number(totalPages))) {
      toast.error('Pages must be a number');
      return;
    }

    setPost(prevPost => ({
      ...prevPost,
      pagesRead: Number(pagesRead),
      totalPages: Number(totalPages),
    }));
  };
  const createPost = async () => {
    let isValid = true;

    if (post.title.length < 1 || post.title.length > 60) {
      toast.error('Post title must be between 1 and 60 characters');
      isValid = false;
    }

    if (post.description.length < 5 || post.description.length > 500) {
      toast.error('Post description must be between 5 and 500 characters');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    let currentUserImg = '';
    if (userData.image) {
      currentUserImg = userData.image;
    } else {
      currentUserImg = userData.username[0];
    }

    await addPost(userData.username, post.title, post.description, post.imagePost, currentUserImg, category, post.pagesRead, post.totalPages);

    setPost({
      user: '',
      title: '',
      description: '',
      imagePost: '',
      image: '',
      pagesRead: Number(),
      totalPages: Number(),
    });

    setCategory('');
    toast.success('Post created successfully');
  };


  return (
    <div className="create-post-div">
      <h2 id='create-h2'>Create post</h2>
      <label htmlFor="input-title" id='input-title'>Name of the Book:</label>
      <input value={post.title} onChange={e => updatePost(e.target.value, 'title')} type="text" name="input-title" id="input-title" /><br />
      <label htmlFor="input-description" id='input-description'>Description:</label><br />
      <textarea value={post.description} onChange={e => updatePost(e.target.value, 'description')} name="input-description" id="input-description" cols={40} rows={10}></textarea><br /><br />
      {/* img */}
      <label htmlFor="input-image" id='input-image'>Image:</label>
      <input id="input-image" type="file" accept="image/*" onChange={e => updateImage(e.target.files, 'imagePost')} /><br />
      {/* pages */}
      <label htmlFor="input-read-pages" id='input-read-pages'>Pages read:</label>
      <input value={pagesRead} onChange={e => setPagesRead(e.target.value)} type="number" name="input-read-pages" id="input-read-pages" onBlur={handlePageCounter} min={0} /><br />
      <label htmlFor="input-total-pages" id='input-total-pages'>Total pages:</label>
      <input value={totalPages} onChange={e => setTotalPages(e.target.value)} type="number" name="input-total-pages" id="input-total-pages" onBlur={handlePageCounter} min={0} /><br />

      <Button id='btn-create' onClick={createPost}>Create</Button>


    </div>
  )
};
export default CreatePost;