import useFetch from "../../Hooks/useFetch";
import NamesInput from "./NamesInput";
import CardsList from "./CardList";
import "./index.css";

const CARDS_API = "/api/scry/cards";

const CardFinder = () => {
  const [loading, cards, fetchCards] = useFetch(CARDS_API, {
    mapper: (cards) => cards.data,
    instant: false,
  });

  const search = (value) => {
    fetchCards({ q: value });
  };

  return (
    <div className="CardFinder">
      <section>
        <NamesInput onChange={search} />
      </section>
      {cards &&  cards.length && (
        <section className="cards">
          <CardsList loading={loading} cards={cards} />
        </section>
      )}
    </div>
  );
};

export default CardFinder;
