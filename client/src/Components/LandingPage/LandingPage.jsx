import style from './LandingPage.module.css'
import { NavLink } from "react-router-dom";

const LandingPage= () => {
    return (
        <div className={style.background}>
            <h1 className={style.welcome}>! WELCOME !</h1>
            <NavLink to='/home'>
                <button>HOME</button>
            </NavLink>
            <h2>Dog breed finder</h2>
        </div>
    )
};


export default LandingPage