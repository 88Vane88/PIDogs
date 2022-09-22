import React from "react";
import style from "../card/Card.module.css";
import { useDispatch } from "react-redux";
import { borrar } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function Dogs({
  image,
  name,
  temperament,
  weight,
  createdInDb,
  id,
}) {
  /* function handleDelete(t) {
    setForm({
      ...form,
      temperament: form.temperament.filter((tem) => tem !== t),
    });
  } */

  const dispatch = useDispatch();

  function borrandoDb() {
    dispatch(borrar(id));
  }

  return (
    <div className={style.global}>
      <div>
        <Link className={style.link} to={"/detail/" + id} key={id}>
          <img
            className={style.img}
            src={image}
            alt="img not found"
            width="200px"
            height="250px"
          />
        </Link>
      </div>
      <div className={style.info}>
        <div>
          <h2>{name}</h2>
        </div>
        <div className={style.temps}>
          <h3>
            Temperamento:
            {!createdInDb
              ? temperament
              : temperament.map((t) => t.temperament + ",")}
          </h3>
        </div>
        <div className={style.peso}>
          <h4>Peso: {weight} kg</h4>
        </div>
        <div>
          {createdInDb ? <button onClick={() => borrandoDb()}>x</button> : null}
        </div>
      </div>
    </div>
  );
}

/* img, nombre, temp, weigth */
