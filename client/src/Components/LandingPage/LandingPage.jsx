import style from './LandingPage.module.css'
import { NavLink } from "react-router-dom";

const LandingPage= () => {
    return (
        <div className={style.background}>
            <div className={style.containerWrapper}>
                <div className={style.container}>
                    <h1 className={style.welcome}>¡ WELCOME !</h1>
                    <h2 className={style.finder}>Dog breed finder</h2>
                    <br />
                    <NavLink to='/home'>
                        <button className={style.homeButton}>HOME</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
};


export default LandingPage