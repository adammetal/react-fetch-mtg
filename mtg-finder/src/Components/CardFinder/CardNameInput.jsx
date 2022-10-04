import Autocomplete from "../Autocomplete";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import toResource from "../../utils/to-resource";

const NAMES_API = "/api/names";

const fetchNames = () =>
  fetch(NAMES_API)
    .then((res) => res.json())
    .then((cards) => cards.map((card) => card.name));

const cardNamesResouce = toResource(fetchNames());

const NamesInput = ({ onChange }) => {
  const { user } = useContext(AuthContext);
  const names = cardNamesResouce.read();

  const placeholder = user
    ? "Search for a card to your decks"
    : "Search for a card";

  return (
    <Autocomplete placeholder={placeholder} items={names} onChange={onChange} />
  );
};

export default NamesInput;
