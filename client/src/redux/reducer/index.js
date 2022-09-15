const initialState = {
  dogs: [],
  allDogs: [], //copia del estado de todos los perros
  detail: [],
  temperamentos: [],
  //se puede guardar filtro.
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "FILTER_BY_STATUS":
      const allDogs = state.allDogs;
      const filterStatus =
        action.payload === "creados"
          ? allDogs.filter((el) => el.createdInDb)
          : allDogs.filter((el) => !el.createdInDb);
      return {
        ...state,
        dogs: action.payload === "todos" ? state.allDogs : filterStatus,
      };
    default:
      return state;
  }
}

export default rootReducer;
