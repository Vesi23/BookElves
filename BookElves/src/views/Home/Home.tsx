import { NavLink } from "react-router-dom";
import fantasyImage from '../../img/fantasy.jpeg';
import scifiImage from '../../img/scifi.jpeg';
import romanceImage from '../../img/romance.jpeg';
import autobiographyImage from '../../img/autobiography.jpeg';
import historicalImage from '../../img/historical.jpeg';
import biographyImage from '../../img/biography.jpeg';
import nonFictionImage from '../../img/nonFiction.jpeg';
import './Home.css';

const Home = () => {
  return (
    <div className="home-view">
       <NavLink to='/category/fantasy' className='nav-link'>
                <img src={fantasyImage} alt='Fantasy' className='category-image' />
                Fantasy
            </NavLink>
      {/* <NavLink to='/category/fantasy' className='nav-link'>Fantasy</NavLink> */}
      <NavLink to='/category/sci-fi' className='nav-link'>
      <img src={scifiImage} alt='Sci-Fi' className='category-image' />
      Sci-Fi
      </NavLink>
      <NavLink to='/category/mystery' className='nav-link'>Mystery</NavLink>
      <NavLink to='/category/romance' className='nav-link'>
      <img src={romanceImage} alt='Romance' className='category-image' />
      Romance
      </NavLink>
      <NavLink to='/category/horror' className='nav-link'>Horror</NavLink>
      <NavLink to='/category/thriller' className='nav-link'>Thriller</NavLink>
      <NavLink to='/category/historical-fiction' className='nav-link'>
      <img src={historicalImage} alt='Historical Fiction' className='category-image' />
      Historical Fiction</NavLink>
      <NavLink to='/category/non-fiction' className='nav-link'>
      <img src={nonFictionImage} alt='Non-Fiction' className='category-image' />
      Non-Fiction</NavLink>
      <NavLink to='/category/biography' className='nav-link'>
      <img src={biographyImage} alt='Biography' className='category-image' />
      Biography</NavLink>
      <NavLink to='/category/autobiography' className='nav-link'>
      <img src={autobiographyImage} alt='Autobiography' className='category-image' />
      Autobiography</NavLink>
    </div>
  );
}

export default Home;
