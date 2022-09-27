import React from "react";
import style from "./LoadingHome.module.css";

export default function LoadingHome() {
  return (
    <section className={style.section}>
      <div className={style.custom}>
        <div className={style.balls}>
          <div className={style.ball}></div>
          <div className={style.ball}></div>
          <div className={style.ball}></div>
        </div>
        <span className={style.customText}>Loading...</span>
      </div>
    </section>
  );
}
