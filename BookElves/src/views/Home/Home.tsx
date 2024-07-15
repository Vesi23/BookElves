import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <NavLink to='/category/fantasy' className='nav-link'>Fantasy</NavLink>
      <NavLink to='/category/sci-fi' className='nav-link'>Sci-Fi</NavLink>
      <NavLink to='/category/mystery' className='nav-link'>Mystery</NavLink>
      <NavLink to='/category/romance' className='nav-link'>Romance</NavLink>
      <NavLink to='/category/horror' className='nav-link'>Horror</NavLink>
      <NavLink to='/category/thriller' className='nav-link'>Thriller</NavLink>
      <NavLink to='/category/historical-fiction' className='nav-link'>Historical Fiction</NavLink>
      <NavLink to='/category/non-fiction' className='nav-link'>Non-Fiction</NavLink>
      <NavLink to='/category/biography' className='nav-link'>Biography</NavLink>
      <NavLink to='/category/autobiography' className='nav-link'>Autobiography</NavLink>
    </div>
  );
}

export default Home;
