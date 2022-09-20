import useFetch from "../../Hooks/useFetch";
import Loader from "../Loader";
import Autocomplete from "../Autocomplete";

const NAMES_API = "/api/names";

const NamesInput = ({ onChange }) => {
  const [loading, names] = useFetch(NAMES_API, {
    mapper: (cards) => cards.map((card) => card.name),
  });

  if (loading) {
    return <Loader />;
  }

  return <Autocomplete items={names} onChange={onChange} />;
};

export default NamesInput;
