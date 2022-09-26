import useFetch from "../../Hooks/useFetch";
import Loader from "../Loader";
import Autocomplete from "../Autocomplete";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const NAMES_API = "/api/names";

const NamesInput = ({ onChange }) => {
  const { user } = useContext(AuthContext);

  const [loading, names] = useFetch(NAMES_API, {
    mapper: (cards) => cards.map((card) => card.name),
  });

  if (loading) {
    return <Loader />;
  }

  const placeholder = user
    ? "Search for a card to your decks"
    : "Search for a card";

  return <Autocomplete placeholder={placeholder} items={names} onChange={onChange} />;
};

export default NamesInput;
