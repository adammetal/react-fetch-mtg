import { useState, Suspense } from "react";
import CardNameInput from "./CardNameInput";
import CardsList from "./CardList";
import Loader from "../Loader";
import toResource from "../../utils/to-resource";

import "./index.css";

const CARDS_API = "/api/scry/cards";

const fetchCards = (q) =>
  fetch(CARDS_API + "?q=" + q)
    .then((res) => res.json())
    .then((cards) => cards.data);

const CardFinder = () => {
  const [cardsResource, setCardsResource] = useState(
    toResource(Promise.resolve([]))
  );

  const searchForACards = (q) => {
    const promise = fetchCards(q);
    setCardsResource(toResource(promise));
  };

  return (
    <div className="CardFinder">
      <section>
        <Suspense fallback={<Loader />}>
          <CardNameInput onChange={searchForACards} />
        </Suspense>
      </section>
      <Suspense fallback={<Loader />}>
        <CardsList cardsResource={cardsResource} />
      </Suspense>
    </div>
  );
};

export default CardFinder;
