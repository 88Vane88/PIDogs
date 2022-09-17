import React from "react";
import { Link } from "react-router-dom";
import { getDogs } from "../../redux/actions/index";
import { useDispatch } from "react-redux";
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
      <div>
        <button>
          <Link to="/home">Home</Link>
        </button>
      </div>
      <div>
        <button>
          <Link to="/create">Crear Perro</Link>
        </button>
      </div>
      <div>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Volver a cargar
        </button>
      </div>
    </>
  );
}
