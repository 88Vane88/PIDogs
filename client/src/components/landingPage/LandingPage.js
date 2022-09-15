import React from "react";
import { Link } from "react-router-dom";
import style from "../landingPage/LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.img}>
      {/* <div className={style.contenedor}> */}
      <h1 className={style.titulo}>DOGS</h1>

      <p className={style.info}>
        Bienvenidos a la página de perros. <br />
        Acá vamos a aprender un poco sobre las razas <br />y sus caracterísitcas
        más importantes.
        <br />
        Empecemos...
        <br />
      </p>
      <div className={style.cont__button}>
        <Link to="/home">
          <button className={style.button}> Ingresar</button>
        </Link>
      </div>
    </div>
  );
}
