import { useMemo } from "react";
import { createContext, useCallback, useReducer, useContext } from "react";


const defState = {
  decks: [],
};

const reducer = (state, action) => {
  const payload = action.payload;

  switch (action.type) {
    case "add-new-deck":
      return {
        ...state,
        decks: [...state.decks, { name: payload, cards: [] }],
      };
    default:
      return state;
  }
};

export const DeckContext = createContext();

const DeckStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defState);

  const addNewDeck = useCallback((name) => {
    dispatch({ type: "add-new-deck", payload: name });
  }, []);

  const actions = useMemo(() => ({ addNewDeck }), [addNewDeck]);

  return (
    <DeckContext.Provider value={{ state, actions }}>
      {children}
    </DeckContext.Provider>
  );
};

export const useDeckStore = (selector = (state) => state) => {
  const { state } = useContext(DeckContext);
  return selector(state);
};

export const useDeckActions = () => {
  const { actions } = useContext(DeckContext);
  return actions;
};

export default DeckStoreProvider;
