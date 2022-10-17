import { useState } from "react";
import { useDeckActions } from "../../Context/DeckContext";
import { Api } from "../../Api";
import "./index.css";

const idGen = (function* () {
  let i = 1;
  while (true) {
    yield i++;
  }
})();

const DeckCreator = () => {
  const [name, setName] = useState("");
  const { addNewDeck, deckCreated } = useDeckActions();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleKeyUp = (e) => {
    const key = e.key;
    if (key === "Enter") {
      e.preventDefault();
      createDeck();
    }
  };

  const createDeck = () => {
    if (!name.length) {
      return;
    }
    setName("");

    const id = idGen.next().value;
    
    addNewDeck({ name, _id: id });
    Api.post(`/api/user/decks`, { name }).then((deck) => {
      deckCreated(deck, id);
    });
  };

  return (
    <div className="DeckCreator">
      <input
        type="text"
        value={name}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Name of new deck"
        className="DeckCreator"
      />
      <button onClick={createDeck}>Create Deck</button>
    </div>
  );
};

export default DeckCreator;
