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

//Todos los temperamentos:
export function getTemps() {
  return async function (dispatch) {
    var pedidoTemps = await axios.get("http://localhost:3001/temperaments");
    return dispatch({
      type: "GET_TEMPS",
      payload: pedidoTemps.data,
    });
  };
}

//Todos los names (searchBar)
export function getNameDogs(name) {
  return async function (dispatch) {
    try {
      var dogNames = await axios.get("http://localhost:3001/dogs?name=" + name);
      return dispatch({
        type: "GET_NAME_DOGS",
        payload: dogNames.data,
      });
    } catch (e) {
      console.log(e);
    }
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

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPeso(payload) {
  return {
    type: "ORDER_BY_PESO",
    payload,
  };
}
