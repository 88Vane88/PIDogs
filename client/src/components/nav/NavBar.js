import React from "react";
import { Link } from "react-router-dom";
import { getDogs } from "../../redux/actions/index";
import { useDispatch } from "react-redux";
import style from "../nav/NavBar.module.css";
/* import { Create } from "../create/Create"; */

export default function Nav() {
  const dispatch = useDispatch();

  //CARGAR TODOS LOS PERROS
  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  return (
    <>
      <div className={style.nav}>
        <div>
          <button className={style.home}>
            <Link to="/home">Home</Link>
          </button>
        </div>
        <div>
          <button className={style.create}>
            <Link to="/create">Crear Perro</Link>
          </button>
        </div>
        <div>
          <button
            className={style.cargar}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            Volver a cargar
          </button>
        </div>
      </div>
    </>
  );
}
