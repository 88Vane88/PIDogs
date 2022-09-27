import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../redux/actions/index";
import style from "../searchBar/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInput(e) {
    e.preventDefault();
    dispatch(getNameDogs(e.target.value));
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameDogs(name));
  }

  return (
    <div>
      <input
        className={style.input}
        type="text"
        placeholder="Buscar..."
        onChange={(e) => handleInput(e)}
      ></input>
      <button
        className={style.button}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
}
