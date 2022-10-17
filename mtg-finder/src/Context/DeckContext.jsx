import { useMemo } from "react";
import { createContext, useCallback, useReducer, useContext } from "react";

const defState = {
  decks: [],
};

const reducer = (state, action) => {
  const payload = action.payload;

  console.log(action, payload);

  switch (action.type) {
    case "add-new-deck":
      return {
        ...state,
        decks: [
          ...state.decks,
          {
            ...payload,
            loading: true,
            cards: [],
          },
        ],
      };
    case "deck-created-on-be": {
      return {
        ...state,
        decks: state.decks.map((deck) => {
          if (deck._id !== payload.clientId) {
            return deck;
          }

          return {
            ...deck,
            ...payload.deck,
            loading: false,
          };
        }),
      };
    }
    default:
      return state;
  }
};

export const DeckContext = createContext();

const DeckStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defState);

  const addNewDeck = useCallback((deck) => {
    dispatch({ type: "add-new-deck", payload: deck });
  }, []);

  const deckCreated = useCallback((deck, clientId) => {
    dispatch({ type: "deck-created-on-be", payload: { deck, clientId } });
  }, []);

  const actions = useMemo(
    () => ({ addNewDeck, deckCreated }),
    [addNewDeck, deckCreated]
  );

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
