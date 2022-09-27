import axios from "axios";
/* ACA ESTA TODA LA CONEXION BACK Y FRONT!! */

//----------------------DOGS--------------------------
export function getDogs() {
  return async function (dispatch) {
    var pedidoApi = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: pedidoApi.data,
    });
  };
}

//------------------------TEMPS--------------------
export function getTemps() {
  return async function (dispatch) {
    var pedidoTemps = await axios.get("http://localhost:3001/temperaments");
    return dispatch({
      type: "GET_TEMPS",
      payload: pedidoTemps.data,
    });
  };
}

//-------------------POST - FORMULARIO---------------------
export function postDog(payload) {
  return async function (dispatch) {
    const respuesta = await axios.post("http://localhost:3001/dogs", payload);
    return dispatch({
      type: "POST_DOG",
      payload: respuesta.data,
    });
  };
}

//-------------------------SEARCHBAR-------------------------
export function getNameDogs(name) {
  return async function (dispatch) {
    try {
      var dogNames = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({
        type: "GET_NAME_DOGS",
        payload: dogNames.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
//---------------------------DETAIL-------------------------
export function getDetail(id) {
  return async function (dispatch) {
    try {
      var dogId = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({
        type: "GET_DETAIL",
        payload: dogId.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//-----------------------------BORRAR------------------------
export function borrar(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      return dispatch({
        type: "DELETE",
        payload: id,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//-------------------VACIAR DETALLE------------------------
export function vaciar() {
  return {
    type: "VACIAR_DETAIL",
    payload: [],
  };
}

//--------------------------FILTER ----------------------
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

//--------------------------------- ORDENAR ----------------------------
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
