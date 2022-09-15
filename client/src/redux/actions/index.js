import axios from "axios";
/* ACA ESTA TODA LA CONEXION BACK Y FRONT!! */

//Todos los perros
export function getDogs() {
  return async function (dispatch) {
    var pedidoApi = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: pedidoApi.data,
    });
  };
}

export function filterDogsByStatus(payload) {
  return {
    type: "FILTER_BY_STATUS",
    payload,
  };
}

export function filterDogsByTemperament(payload) {
  return {
    type: "FILTER_BY_TEMP",
    payload,
  };
}

export function orderByAlfabeto(payload) {
  return {
    type: "ORDER_BY_ALFABETO",
    payload,
  };
}

export function orderByPeso(payload) {
  return {
    type: "ORDER_BY_PESO",
    payload,
  };
}
