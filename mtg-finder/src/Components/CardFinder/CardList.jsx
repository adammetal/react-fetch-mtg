import { useState } from "react";
import cardSort from "../../utils/card-sort";
import Loader from "../Loader";
import Card from "./Card";

const CardsList = ({ loading, cards }) => {
  const [ordered, setOrdered] = useState(false);

  if (cards === null) {
    return null;
  }

  if (loading) {
    return <Loader />;
  }

  let cardsForJsx = ordered ? cardSort(cards) : cards;

  return (
    <>
      <button onClick={() => setOrdered(true)}>Sort by cost</button>
      {cardsForJsx
        .filter((card) => !!card.image_uris)
        .map((card) => {
          return (
            <div key={card.id} data-testid="card" id={card.id}>
              <Card image={card.image_uris.png} />
            </div>
          );
        })}
    </>
  );
};

export default CardsList;
