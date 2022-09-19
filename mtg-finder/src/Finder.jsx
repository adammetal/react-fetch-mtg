import { useCallback, useEffect, useState } from "react";
import Autocomplete from "./Autocomplete";
import Loader from "./Loader";
import "./Finder.css";

const NAMES_API = "/api/names";
const CARDS_API = "https://api.scryfall.com/cards/search";

const useFetch = (url, { startNow = true, mapper = (a) => a } = {}) => {
  const [loading, setLoading] = useState(startNow);
  const [data, setData] = useState(null);

  const action = useCallback(
    (query = {}) => {
      setLoading(true);

      const search = new URLSearchParams();
      for (const entry of Object.entries(query)) {
        search.append(entry[0], entry[1]);
      }

      fetch(url + "?" + search.toString())
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          setLoading(false);
        });
    },
    [url]
  );

  useEffect(() => {
    if (startNow === true) {
      action();
    }
  }, [action, startNow]);

  const retData = data !== null ? mapper(data) : null;

  return [loading, retData, action];
};

const preloadImage = (src, cb) => {
  const img = document.createElement("img");
  img.src = src;

  const onLoad = () => {
    cb();
  };

  img.addEventListener("load", onLoad);

  return () => {
    img.removeEventListener("load", onLoad);
  };
};

const useImagePreload = (src) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    return preloadImage(src, () => {
      setLoading(false);
    });
  }, [src]);

  return loading;
};

const Card = ({ image }) => {
  const loading = useImagePreload(image);

  if (loading) {
    return <Loader />;
  }

  return <img className="Card" src={image} alt="" />;
};

const Finder = () => {
  const [cardsLoading, cards, fetchCards] = useFetch(CARDS_API, {
    mapper: (cards) => cards.data,
    startNow: false,
  });

  const [namesLoading, names] = useFetch(NAMES_API, {
    mapper: (cards) => cards.map((card) => card.name),
  });

  const search = (value) => {
    fetchCards({ q: value });
  };

  return (
    <div className="Finder">
      <section>
        {namesLoading ? (
          <Loader />
        ) : (
          <Autocomplete items={names} onChange={search} />
        )}
      </section>
      <section className="cards">
        {cardsLoading ? (
          <Loader />
        ) : cards !== null ? (
          cards
            .filter((card) => !!card.image_uris)
            .map((card) => {
              return <Card image={card.image_uris.png} key={card.id} />;
            })
        ) : null}
      </section>
    </div>
  );
};

export default Finder;
