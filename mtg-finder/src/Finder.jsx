import { useCallback, useEffect, useState } from "react";
import Autocomplete from "./Autocomplete";
import Loader from "./Loader";
import "./Finder.css";


const URL = "https://api.scryfall.com/cards/search?q=";

const searchCardsByName = async (name) => {
  const result = await fetch(URL + name);

  if (!result.ok) {
    return null;
  }

  const cards = await result.json();
  return cards.data;
};

const useCardSearchApi = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback((name) => {
    setCards([]);
    setLoading(true);
    searchCardsByName(name).then((result) => {
      setCards(result);
      setLoading(false);
    });
  }, []);

  return { cards, search, loading };
};

const Card = ({ image }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const img = document.createElement("img");

    const onLoad = () => {
      setLoading(false);
    };

    img.src = image;

    img.addEventListener("load", onLoad);
    
    return () => {
      img.removeEventListener("load", onLoad);
    };
  }, [image]);

  if (loading) {
    return <Loader />;
  }

  return <img className="Card" src={image} alt="" />;
};

const Finder = ({ names }) => {
  const { cards, search, loading } = useCardSearchApi();

  return (
    <div className="Finder">
      <section>
        <Autocomplete items={names} onChange={search} />
      </section>
      <section className="cards">
        {loading ? (
          <Loader />
        ) : (
          cards.filter(card => !!card.image_uris).map((card) => {
            return <Card image={card.image_uris.png} key={card.id} />;
          })
        )}
      </section>
    </div>
  );
};

export default Finder;
