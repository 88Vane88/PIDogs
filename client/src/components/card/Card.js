import React from "react";
import style from "../card/Card.module.css";

export default function Dogs({ image, name, temperament, weight }) {
  return (
    <div className={style.global}>
      <div>
        <img
          className={style.img}
          src={image}
          alt="img not found"
          width="200px"
          height="250px"
        />
      </div>
      <div className={style.info}>
        <div>
          <h2>{name}</h2>
        </div>
        <div className={style.temps}>
          <h3>Temperamento: {temperament}</h3>
        </div>
        <div className={style.peso}>
          <h4>Peso: {weight} kg</h4>
        </div>
      </div>
    </div>
  );
}

/* img, nombre, temp, weigth */
