import * as actions from '../../Redux/actions';
import { useDispatch} from "react-redux";
import { useState } from 'react';
import style from './NavBar.module.css'
import searchIcon from '../../assets/search-icon-png-5.png';

const NavBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = () => {
    const trimmedName = name.trim();
    if (trimmedName === "") {
      return; 
    }
    dispatch(actions.filterByName(trimmedName));
  }
  

    const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className={style.container}>
      <nav className={style.navigator}>
        <input type="text" placeholder="Search a breed..." onChange={handleChange} onKeyPress={handleKeyPress} className={style.searcher}/>
        <button onClick={handleSubmit} className={style.searcherButton}>
          <img src={searchIcon} alt="Search" className={style.searchIcon} onClick={handleSubmit}/>
        </button>
      </nav>
    </div>
  )
}

export default NavBar;
