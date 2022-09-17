/* imagen, nombre , temperamento,altura,peso,años de vida */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/index";
import { useEffect } from "react";
import style from "../detalle/Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, []);

  const myDog = useSelector((state) => state.detail);
  console.log(myDog);

  return (
    <div className={style.img}>
      <div className={style.global}>
        <div>
          {myDog.length > 0 ? (
            <>
              <img
                className={style.perro}
                src={myDog[0].image}
                alt={myDog[0].name}
              />
              <div className={style.info}>
                <div className={style.name}>Nombre : {myDog[0].name}</div>
                <div className={style.temp}>
                  Temperamento: {myDog[0].temperament}
                </div>
                <div className={style.height}>Altura: {myDog[0].height} cm</div>
                <div className={style.weight}>Peso: {myDog[0].weight} kg</div>
                <div className={style.life_span}>
                  Años de vida: {myDog[0].life_span}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/*         {myDog.activities
          ? myDog.activities.map((c) => {
              return (
                <>
                  <div>Activity Name : {c.name}</div>
                  <div>Activity difficulty : {c.difficulty}</div>
                  <div>Activity duration : {c.duration}</div>
                  <div>Activity seasons : {c.seasons}</div>
                  <div>Activity id : {c.id}</div>
                </>
              );
            })
          : null}
 */}
        <div className={style.button}>
          <Link className={style.buttonReg} to="/home">
            <button>Regresar</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
