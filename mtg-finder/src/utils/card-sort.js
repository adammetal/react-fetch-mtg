const cardSort = (cards) => {
  if (!Array.isArray(cards)) {
    return null;
  }

  if (!cards.every((card) => card.object === "card")) {
    return null;
  }

  return [...cards]
    .sort((carda, cardb) => carda.cmc - cardb.cmc);
};

export default cardSort;
