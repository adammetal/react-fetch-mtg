import { useState } from "react";
import { useDeckActions } from "../../Context/DeckContext";
import "./index.css";

const DeckCreator = () => {
  const [newDeckName, setNewDeckName] = useState("");
  const { addNewDeck } = useDeckActions();

  const handleChange = (e) => {
    setNewDeckName(e.target.value);
  };

  const handleKeyUp = (e) => {
    const key = e.key;
    if (key === "Enter") {
      e.preventDefault();
      createDeck();
    }
  };

  const createDeck = () => {
    if (!newDeckName.length) {
      return;
    }

    addNewDeck(newDeckName);
    setNewDeckName("");
  };

  return (
    <div className="DeckCreator">
      <input
        type="text"
        value={newDeckName}
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
