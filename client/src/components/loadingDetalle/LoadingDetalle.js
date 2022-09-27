import React from "react";
import style from "./LoadingDetalle.module.css";

export default function LoadingDetalle() {
  return (
    <div className={style.custom}>
      <div className={style.balls}>
        <div className={style.ball}></div>
        <div className={style.ball}></div>
        <div className={style.ball}></div>
      </div>
      <span className={style.customText}>Loading...</span>
    </div>
  );
}
