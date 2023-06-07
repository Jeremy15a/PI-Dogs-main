import style from './HomaPage.module.css'
import Cards from '../Cards/Cards'
import Side from '../Side/Side';
import NavBar from '../NavBar/NavBar'
import Pagination from '../Pagination/Pagination';
import { NavLink } from 'react-router-dom';
import { getAllDogs } from '../../Redux/actions';
import { useDispatch } from 'react-redux';
import homeIcon from '../../assets/white-home-icon-png-21.jpg';

const HomePage = () => {
    const dispatch = useDispatch();
  
    const handleHomeButtonClick = () => {
      dispatch(getAllDogs());
    };

  
    return (
      <div className={style.super}>
        <header className={style.head}>
          <div className={style.homeButtonWrapper}>
          <button className={style.homeButton} onClick={handleHomeButtonClick}>
            <img src={homeIcon} className={style.homeIcon} alt="Home Icon" />
            <span>The Dog Breed Finder</span>
            </button>
          </div>
          <div className={style.navbar}>
            <NavBar></NavBar>
          </div>
          <div className={style.createButtonWrapper}>
            <NavLink to="/CreateDog">
              <button className={style.createButton} >Create a breed</button>
            </NavLink>
          </div>
        </header>
        <aside className={style.side}>
          <Side></Side>
        </aside>
        <div className={style.body}>
          <Cards></Cards>
        </div>
        <footer className={style.foot}>
          <Pagination></Pagination>
        </footer>
      </div>
    );
  };

export default HomePage;
