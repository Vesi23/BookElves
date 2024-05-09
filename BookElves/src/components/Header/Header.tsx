import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { logoutUser } from "../../service/auth";
import houseDoor from 'bootstrap-icons/icons/house-door.svg';
import balloonHeart from 'bootstrap-icons/icons/balloon-heart.svg';
import peopleFill from 'bootstrap-icons/icons/people-fill.svg';
import plusCircle from 'bootstrap-icons/icons/plus-circle.svg';
import bookHalf from 'bootstrap-icons/icons/book-half.svg';
import postcard from 'bootstrap-icons/icons/postcard.svg';




import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { user, userData, setContext } = useAppContext();

  const logout = async () => {
    await logoutUser();
    setContext({ user: null, userData: null });
    navigate('/home');
  }



  return (
    <div className="nav-links">
      {user && <button onClick={logout} className='logout'>Logout</button>}
      <NavLink to="/home" className='home'><img src={houseDoor} alt="Home" /></NavLink>
      {user && <NavLink to="/Like" className='create-post'><img src={balloonHeart} alt="Balloon Heart" /></NavLink>}
      {user && <NavLink to="/create" className='create-post'><img src={plusCircle} alt="Plus Circle" /></NavLink>}
      {user && <NavLink to="/friends" className='friends'><img src={peopleFill} alt="Friends" /></NavLink>}
      {user && <NavLink to="/posts" className='posts'><img src={postcard} alt="Post" /></NavLink>}
      {user && <NavLink to="/books" className='books'><img src={bookHalf} alt="Books" /></NavLink>}
      <NavLink to="/about" className='about'>About</NavLink>
      {!user && <NavLink to="/register" className='register'>Register</NavLink>}
      {!user && <NavLink to="/login" className='login'>Login</NavLink>}
      {user && <NavLink to="/profile" className='profile'>Profile</NavLink>}
    </div>
  )
}

export default Header;