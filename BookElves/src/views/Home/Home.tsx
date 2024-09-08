import autobiographyImage from '../../img/autobiography.jpeg';
import historicalImage from '../../img/historical.jpeg';
import nonFictionImage from '../../img/nonFiction.jpeg';
import biographyImage from '../../img/biography.jpeg';
import fantasyImage from '../../img/fantasy.jpeg';
import romanceImage from '../../img/romance.jpeg';
import mysteryImage from '../../img/mystery.jpg';
import horrorImage from '../../img/horror.jpg';
import scifiImage from '../../img/scifi.jpeg';
import { NavLink } from "react-router-dom";
import './Home.css';

const Home = () => {

  return (
    <div className="home-view">
      <NavLink to='/category/fantasy' className='nav-link'>
        <img src={fantasyImage} alt='Fantasy' className='category-image' />
        <span>Fantasy</span>
      </NavLink>

      <NavLink to='/category/sci-fi' className='nav-link'>
        <img src={scifiImage} alt='Sci-Fi' className='category-image' />
        <span>Sci-Fi</span>
      </NavLink>

      <NavLink to='/category/mystery' className='nav-link'>
        <img src={mysteryImage} alt='Mystery' className='category-image' />
        <span>Mystery</span>
      </NavLink>

      <NavLink to='/category/romance' className='nav-link'>
        <img src={romanceImage} alt='Romance' className='category-image' />
        <span>Romance</span>
      </NavLink>

      <NavLink to='/category/horror' className='nav-link'>
        <img src={horrorImage} alt='Horror' className='category-image' />
        <span>Horror</span>
      </NavLink>

      <NavLink to='/category/historical-fiction' className='nav-link'>
        <img src={historicalImage} alt='Historical Fiction' className='category-image' />
        <span>Historical Fiction</span>
      </NavLink>

      <NavLink to='/category/non-fiction' className='nav-link'>
        <img src={nonFictionImage} alt='Non-Fiction' className='category-image' />
        <span>Non-Fiction</span>
      </NavLink>

      <NavLink to='/category/biography' className='nav-link'>
        <img src={biographyImage} alt='Biography' className='category-image' />
        <span>Biography</span>
      </NavLink>

      <NavLink to='/category/autobiography' className='nav-link'>
        <img src={autobiographyImage} alt='Autobiography' className='category-image' />
        <span>Autobiography</span>
      </NavLink>
    </div>
  );
}

export default Home;