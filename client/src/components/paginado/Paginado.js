import React from "react";
import Style from "../paginado/Paginado.module.css";

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumber &&
          pageNumber.map((number) => (
            <button
              className={Style.button}
              key={number}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          ))}
      </ul>
    </nav>
  );
}

/* 
1-----0(f)----6 (l)
2---- 

*/
