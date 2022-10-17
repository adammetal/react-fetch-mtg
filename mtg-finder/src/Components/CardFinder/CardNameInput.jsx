import Autocomplete from "../Autocomplete";
import toResource from "../../utils/to-resource";

const NAMES_API = "/api/names";

const fetchNames = () =>
  fetch(NAMES_API)
    .then((res) => res.json())
    .then((cards) => cards.map((card) => card.name));

const cardNamesResouce = toResource(fetchNames());

const CardNameInput = ({ onChange }) => {
  const names = cardNamesResouce.read();

  return (
    <Autocomplete
      placeholder="Search for a card"
      items={names}
      onChange={onChange}
    />
  );
};

export default CardNameInput;
