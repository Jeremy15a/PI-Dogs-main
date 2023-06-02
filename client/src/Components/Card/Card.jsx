import style from './Card.module.css'
import { NavLink } from 'react-router-dom'

function Card({ id, name, weight, image, temperaments }) {
  return (
    <div className={style.bigContainer}>
      <div className={style.body}></div>
      <div className={style.img}>
        <NavLink to={'/'}>
          <img className={style.imagenes} src={image} alt={name} />
        </NavLink>
      </div>
      <div className={style.specs}>
        <h2>{name}</h2>
        <h2>Weight: {weight} kg</h2>
        <h2>Temperaments: {temperaments}</h2>
      </div>
    </div>
  )
}

export default Card
