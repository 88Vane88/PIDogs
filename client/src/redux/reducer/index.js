const initialState = {
  dogs: [],
  allDogs: [], //copia del estado de todos los perros
  detail: [],
  temps: [],
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
    case "GET_TEMPS":
      return {
        ...state,
        temps: action.payload,
      };
    case "GET_NAME_DOGS":
      return {
        ...state,
        dogs: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "VACIAR_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "POST_DOG":
      return {
        ...state,
      };
    case "DELETE":
      return {
        ...state,
        dogs: state.dogs.filter((d) => d.id !== action.payload),
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

    case "FILTER_BY_TEMP":
      const allTemps = state.allDogs;
      const tempsFilter =
        action.payload === "todos"
          ? allTemps
          : allTemps.filter((t) => t.temperament?.includes(action.payload));
      return {
        ...state,
        dogs: tempsFilter,
      };

    case "ORDER_BY_NAME":
      let nameSort =
        action.payload === "asc"
          ? state.dogs.sort((a, b) =>
              a.name > b.name ? 1 : a.name < b.name ? -1 : 0
            )
          : state.dogs.sort((a, b) =>
              a.name > b.name ? -1 : a.name < b.name ? 1 : 0
            );
      return {
        ...state,
        dogs: nameSort,
      };
    case "ORDER_BY_PESO":
      let weightSort =
        action.payload === "minimo"
          ? state.dogs.sort((a, b) =>
              a.weight > b.weight ? 1 : a.weight < b.weight ? -1 : 0
            )
          : state.dogs.sort((a, b) =>
              a.weight > b.weight ? -1 : a.weight < b.weight ? 1 : 0
            );
      return {
        ...state,
        dogs: weightSort,
      };
    /*    case "ORDER_BY_LIFE":
      let life =
        action.payload === "min_life"
          ? state.dogs.sort((b, c) =>
              b.life_span > c.life_span ? 1 : b.life_span < c.life_span ? -1 : 0
            )
          : state.dogs.sort((b, c) =>
              b.life_span > c.life_span ? -1 : b.life_span < c.life_span ? 1 : 0
            );
      return {
        ...state,
        dogs: life,
      }; */

    default:
      return state;
  }
}

export default rootReducer;
