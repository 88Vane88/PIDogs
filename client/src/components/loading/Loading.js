import React from "react";
import Style from "../loading/Loading.module.css";

export default function Loading() {
  return (
    <div className={Style.alert__info}>
      <p>Cargando...</p> {/* poner imagen cargando */}
    </div>
  );
}
