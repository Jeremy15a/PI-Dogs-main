import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ id, name, weight, image, temperaments }) {
  return (
    <div className={styles.card}>
      <div className={styles.body}></div>
      <div className={styles.image}>
        <NavLink to={`/detail/${id}`}>
          <img className={styles.imageContent} src={image} alt={name} title='Click to details' />
        </NavLink>
      </div>
      <div className={styles.details}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.info}>
          <p className={styles.weight}>Weight: {weight} kg</p>
          <p className={styles.temperaments}>Temperaments: {temperaments}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;