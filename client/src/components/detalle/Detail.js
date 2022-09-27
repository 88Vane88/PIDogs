/* imagen, nombre , temperamento,altura,peso,años de vida */
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../redux/actions/index";
import { useEffect } from "react";
import style from "../detalle/Detail.module.css";
import { vaciar } from "../../redux/actions";
import LoadingDetalle from "../loadingDetalle/LoadingDetalle";

export default function Detail(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    dispatch(vaciar());
  }, []);

  const myDog = useSelector((state) => state.detail);
  console.log(myDog);

  return (
    <div className={style.img}>
      <div className={style.global}>
        {myDog.length > 0 ? (
          <>
            <img
              className={style.perro}
              src={myDog[0].image}
              alt={myDog[0].name}
            />
            <div className={style.info}>
              <div className={style.name}>{myDog[0].name}</div>
              <div className={style.temp}>
                Temperamento:{"   "}
                {!myDog[0].createdInDb //mi dog es de la api?
                  ? myDog[0].temperament + " "
                  : myDog[0].temperamentos.map((t) => t.temperament + " , ")}
              </div>
              <div className={style.height}>Altura: {myDog[0].height} cm</div>
              <div className={style.weight}>Peso: {myDog[0].weight} kg</div>
              <div className={style.life_span}>
                Años de vida: {myDog[0].life_span}
              </div>
            </div>
            <div className={style.button}>
              <Link to="/home">
                <button className={style.buttonReg}>Regresar</button>
              </Link>
            </div>
          </>
        ) : (
          <LoadingDetalle />
        )}
      </div>
    </div>
  );
}

/* 
<div className={style.img}>
      <div className={style.global}>
        {myDog.length > 0 ? (
          <>
            <img
              className={style.perro}
              src={myDog[0].image}
              alt={myDog[0].name}
            />
            <div className={style.info}>
              <div className={style.name}>{myDog[0].name}</div>
              <div className={style.temp}>
                Temperamento:{"   "}
                {!myDog[0].createdInDb //mi dog es de la api?
                  ? myDog[0].temperament + " "
                  : myDog[0].temperamentos.map((t) => t.temperament + " , ")}
              </div>
              <div className={style.height}>Altura: {myDog[0].height} cm</div>
              <div className={style.weight}>Peso: {myDog[0].weight} kg</div>
              <div className={style.life_span}>
                Años de vida: {myDog[0].life_span}
              </div>
            </div>
            <div className={style.button}>
              <Link to="/home">
                <button className={style.buttonReg}>Regresar</button>
              </Link>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
*/
