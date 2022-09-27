import React from "react";
import style from "../card/Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { borrar } from "../../redux/actions";
import { Link } from "react-router-dom";

export default function Dogs({
  image,
  name,
  temperament,
  weight,
  createdInDb, //para que me traiga temp del formulario
  id, //para borrar perro creado por id
}) {
  const cards = useSelector((state) => state.dogs);
  const dispatch = useDispatch();

  function borrandoDb() {
    dispatch(borrar(id));
  }

  return (
    <div className={style.global}>
      <div>
        {cards.length > 0 ? (
          <>
            <Link className={style.link} to={"/detail/" + id} key={id}>
              <img
                className={style.img}
                src={image}
                alt="img not found"
                width="200px"
                height="250px"
              />
            </Link>
            <div className={style.info}>
              <div>
                <h2 className={style.name}>{name}</h2>
              </div>
              <br />
              <div className={style.temp}>
                <h3>
                  Temperamento:
                  {!createdInDb
                    ? temperament
                    : temperament.map((t) => t.temperament + ",")}
                </h3>
              </div>
              <br />
              <div className={style.weight}>
                <h4>Peso: {weight} lb</h4>
              </div>
            </div>
          </>
        ) : (
          <h2>Loading</h2>
        )}
        <div>
          {createdInDb ? <button onClick={() => borrandoDb()}>x</button> : null}
        </div>
      </div>
    </div>
  );
}

/* img={}, name={}, temperament={}, weigth={} */
