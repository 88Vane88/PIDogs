import React, { useInsertionEffect } from "react";
import { Link } from "react-router-dom";
import style from "../home/Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../nav/NavBar";
import Paginado from "../paginado/Paginado";
import Detalle from "../detalle/Detail";
import Create from "../create/Create";
import Dogs from "../card/Card";
import Loading from "../loading/Loading";
import { getDogs, filterDogsByStatus } from "../../redux/actions/index";

export default function Home() {
  /*  const { isLoading, dogs } = useDogs(); */
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.dogs); //traeme todo del estado Dogs

  //TODOS LOS DOGS:
  useEffect(() => {
    //traigo del estado los Dogs y que se monte
    dispatch(getDogs()); //despacho accion e invoco función
  }, [dispatch]);

  //PAGINADO:
  const initialPage = 1;
  const dogsInPage = 8;

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [dogsPerPage, setDosPerPage] = useState(dogsInPage);
  const lastDogInPage = currentPage * dogsPerPage;
  const firstDogInPage = lastDogInPage - dogsPerPage;
  const currentDogsInPage = allDogs.slice(firstDogInPage, lastDogInPage);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //FILTRADO POR ESTADO
  function handleFilterStatus(e) {
    dispatch(filterDogsByStatus(e.target.value));
  }

  return (
    <div className={style.img}>
      <div className={style.nav}>
        <Nav />
      </div>
      <div>
        <h1 className={style.titulo}> RAZAS DE PERROS</h1>
      </div>
      <div className={style.orden__filtro}>
        <div className={style.alfabeto}>
          <select className={style.alfabeto__option}>
            <option value="orden">Orden Alfabetico</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>
        <div className={style.peso}>
          <select className={style.peso__option}>
            <option value="peso">Peso</option>
            <option value="maximo">Máximo</option>
            <option value="minimo">Mínimo</option>
          </select>
        </div>
        <div className={style.temp}>
          <select className={style.temp__option}>
            <option>Temperamentos</option>
          </select>
        </div>
        <div className={style.creados}>
          <select
            className={style.creados__option}
            onChange={(e) => handleFilterStatus(e)}
          >
            <option value="perros">Perros</option>
            <option value="todos">Todos</option>
            <option value="exist">Existentes</option>
            <option value="creados">Creados</option>
          </select>
        </div>
      </div>
      <Paginado
        className={style.paginado}
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />

      {currentDogsInPage?.map((p) => {
        return (
          <Link className={style.link} to={"/detail" + p.id} key={p.id}>
            <Dogs
              image={p.image}
              name={p.name}
              temperament={p.temperament}
              weight={p.weight}
            />
          </Link>
        );
      })}
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
