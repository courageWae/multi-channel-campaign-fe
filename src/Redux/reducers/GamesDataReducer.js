const getGames = () => {
  const games = localStorage.getItem("games")
    ? JSON.parse(localStorage.getItem("games"))
    : null;

  if (games) return games;

  return null;
};

const InitialState = {
  games: getGames(),
};

const GamesDataReducer = (state = InitialState, action) => {
  if (action.type === "Save_Games_Data") {
    const newState = {
      games: action.payload,
    };

    localStorage.setItem("games", JSON.stringify(action.payload));

    return newState;
  }

  return state;
};

export default GamesDataReducer;
