import React from "react";
import { Link } from "react-router-dom";
import { getDogs } from "../../redux/actions/index";
import { useDispatch } from "react-redux";

export default function Nav() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  return (
    <>
      <div>
        <Link to="/create">Crear Perro</Link>
      </div>
      <div>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          {" "}
          Volver a cargar
        </button>
      </div>
    </>
  );
}
