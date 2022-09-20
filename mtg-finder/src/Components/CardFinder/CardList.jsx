import Loader from "../Loader";
import Card from "./Card";

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

export default CardsList;
