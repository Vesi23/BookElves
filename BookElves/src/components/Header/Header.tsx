import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { logoutUser } from "../../service/auth";

const Header = () => {
    const navigate = useNavigate();
    const { user, userData, setContext } = useAppContext();
    
    const logout = async () => {
        await logoutUser();
        setContext({ user: null, userData: null });
        navigate('/home');
    }



    return (
        <>
            <NavLink to="/home" className='home'>Home </NavLink>
            <NavLink to="/about" className='about'>About</NavLink>
            {!user && <NavLink to="/register" className='register'>Register</NavLink>}
            {!user && <NavLink to="/login" className='login'>Login</NavLink>}
            {user && <button onClick={logout} className='logout'>Logout</button>}
            {user && <NavLink to="/profile" className='profile'>Profile</NavLink>}
            {user && <NavLink to="/create" className='create-post'>Create</NavLink>}
            
        </>
    )
}

export default Header;