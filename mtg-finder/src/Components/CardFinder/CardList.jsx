import Card from "./Card";

const CardsList = ({ cardsResource }) => {
  const cards = cardsResource.read();

  if (!cards || !cards.length) {
    return null;
  }

  return (
    <section className="cards">
      {cardsResource
        .read()
        .filter((card) => !!card.image_uris)
        .map((card) => {
          return (
            <div key={card.id} data-testid="card" id={card.id}>
              <Card image={card.image_uris.png} />
            </div>
          );
        })}
    </section>
  );
};

export default CardsList;
