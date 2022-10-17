import { Suspense, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../Api";
import toResource from "../../utils/to-resource";
import Loader from "../../Components/Loader";

const fetchDeck = (id) => Api.get(`/api/user/decks/${id}`);

const DeckDisplay = ({ resource }) => {
  const deck = resource.read();

  return <div className="DeckDisplay">
    <div className="header">{deck.name}</div>
    Card goes here
  </div>;
};

const Deck = () => {
  const { id } = useParams("id");

  const res = useMemo(() => {
    return toResource(fetchDeck(id));
  }, [id]);

  return (
    <div className="Deck">
      <Suspense fallback={<Loader />}>
        <DeckDisplay resource={res} />
      </Suspense>
    </div>
  );
};

export default Deck;
