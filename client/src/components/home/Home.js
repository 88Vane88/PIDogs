import React from "react";
/* import { Link } from "react-router-dom"; */
import style from "../home/Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../nav/NavBar";
import Paginado from "../paginado/Paginado";
import Dogs from "../card/Card";
import Loading from "../loading/Loading";
import SearchBar from "../searchBar/SearchBar";
import {
  getDogs,
  filterDogsByStatus,
  orderByName,
  orderByPeso,
  getTemps,
  filterDogsByTemperament,
  getDetail,
} from "../../redux/actions/index";

export default function Home() {
  /*  const { isLoading, dogs } = useDogs(); */
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs); //traeme todo del estado Dogs
  const allTemps = useSelector((state) => state.temps);

  //TODOS LOS DOGS:
  useEffect(() => {
    //traigo del estado los Dogs y que se monte
    dispatch(getDogs());
    dispatch(getTemps()); //despacho accion e invoco función
  }, [dispatch]);

  //PAGINADO:
  const initialPage = 1;
  const dogsInPage = 8;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [dogsPerPage, setDosPerPage] = useState(dogsInPage);
  const lastDogInPage = currentPage * dogsPerPage; //1---8----8 te trae 8 perros
  const firstDogInPage = lastDogInPage - dogsPerPage; //8-----8------0
  const currentDogsInPage = allDogs.slice(firstDogInPage, lastDogInPage); // corto array y trae 0 a 8
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //FILTRADO POR ESTADO:
  function handleFilterStatus(e) {
    dispatch(filterDogsByStatus(e.target.value));
  }

  //ORDEN POR TEMPS:
  function handleFilterTemps(e) {
    dispatch(filterDogsByTemperament(e.target.value));
  }

  //ORDEN ALFABETICO:
  const [ordAlf, setOrdAlf] = useState("");

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1); //hacelo en pag 1
    setOrdAlf(`Ordenando ${e.target.value}`);
  }

  //ORDEN POR PESO:
  const [ordWeight, setOrdWeight] = useState("");
  function handleSortWeight(e) {
    e.preventDefault();
    dispatch(orderByPeso(e.target.value));
    setCurrentPage(1);
    setOrdWeight(`Ordenando ${e.target.value}`);
  }
  return (
    <div className={style.img}>
      <div className={style.nav}>
        <Nav />
      </div>
      <div>
        <h1 className={style.titulo}> RAZAS DE PERROS</h1>
      </div>
      <div className={style.ordenamientos}>
        <select className={style.select} onChange={(e) => handleSortName(e)}>
          <option value="orden">Orden Alfabetico</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <div className={style.peso} onChange={(e) => handleSortWeight(e)}>
          <select className={style.select}>
            <option value="peso">Peso</option>
            <option value="maximo">Máximo</option>
            <option value="minimo">Mínimo</option>
          </select>
        </div>
        <div className={style.temp}>
          <select
            className={style.select}
            onChange={(e) => handleFilterTemps(e)}
          >
            <option value="todos">Temperamentos</option>
            {allTemps?.map((t) => (
              <option>{t.temperament}</option>
            ))}
          </select>
        </div>
        <div className={style.creados}>
          <select
            className={style.select}
            onChange={(e) => handleFilterStatus(e)}
          >
            <option value="todos">Todos</option>
            <option value="creados">Creados</option>
          </select>
        </div>
      </div>
      <div className={style.barraPag}>
        <Paginado
          className={style.paginado1}
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>
      <div className={style.buscaRecarga}>
        <SearchBar className={style.searchbar} />
      </div>
      <div className={style.cards}>
        {currentDogsInPage?.map((p) => {
          return (
            <Dogs
              loading="lazy"
              image={p.image}
              name={p.name}
              temperament={p.createdInDb ? p.temperamentos : p.temperament}
              weight={p.weight}
              createdInDb={p.createdInDb}
              id={p.id}
            />
          );
        })}
      </div>
    </div>
  );

  /* al final poner:
    {isLoading && <loading />} */
}

/* 
-paginado: 8 por pag
input busqueda por raza
filtrar(boton/opciones): raza y temp
ordenar: peso y alfabeticamente
 */
