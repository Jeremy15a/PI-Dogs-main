import * as actions from '../../Redux/actions';
import { useDispatch} from "react-redux";
import { useState } from 'react';

const NavBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = () => {
    const trimmedName = name.trim();
    dispatch(actions.filterByName(trimmedName));
    setName("");
  }

  return (
    <div>
      <nav>
        <input type="text" placeholder="Search a recipe..." onChange={handleChange} />
        <button onClick={handleSubmit}>BUSCAR🔎</button>
      </nav>
    </div>
  )
}

export default NavBar;
