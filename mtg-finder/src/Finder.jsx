import useFetch from "./Hooks/useFetch";
import Autocomplete from "./Autocomplete";
import Loader from "./Loader";
import Card from "./Card";
import "./Finder.css";

const NAMES_API = "/api/names";
const CARDS_API = "/api/cards";

const NamesAutocomplete = ({ onChange }) => {
  const [loading, names] = useFetch(NAMES_API, {
    mapper: (cards) => cards.map((card) => card.name),
  });

  if (loading) {
    return <Loader />;
  }

  return <Autocomplete items={names} onChange={onChange} />;
};

const CardsList = ({ loading, cards }) => {
  if (cards === null) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {cards
        .filter((card) => !!card.image_uris)
        .map((card) => {
          return <Card image={card.image_uris.png} key={card.id} />;
        })}
    </>
  );
};

const Finder = () => {
  const [loading, cards, fetchCards] = useFetch(CARDS_API, {
    mapper: (cards) => cards.data,
    startNow: false,
  });

  const search = (value) => {
    fetchCards({ q: value });
  };

  return (
    <div className="Finder">
      <section>
        <NamesAutocomplete onChange={search} />
      </section>
      <section className="cards">
        <CardsList loading={loading} cards={cards} />
      </section>
    </div>
  );
};

export default Finder;
