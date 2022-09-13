import { useRef, useState } from "react";
import "./Finder.css";

const URL = "https://api.scryfall.com/cards/search?q=";

const searchCardByName = async (name) => {
  const result = await fetch(URL + name);

  if (!result.ok) {
    return null;
  }

  const card = await result.json();
  console.log(card.data[0].image_uris.normal);
  return card;
};

const useCardSearchApi = () => {
  const [card, setCard] = useState(null);
  
  const search = async (name) => {
    setCard(null);
    const result = await searchCardByName(name)
    setCard(result);
  };
  
  return {card,search};
}

const Finder = ({ names }) => {
  const timer = useRef();
  const { card, search } = useCardSearchApi();

  const onChange = (e) => {
    clearTimeout(timer.current);

    if (!e.target.value.length) {
      return;
    }

    timer.current = setTimeout(() => {
      clearTimeout(timer.current);
      search(e.target.value);
    }, 800);
  };

  return (
    <div className="Finder">
      <section>
        <input list="cards" type="text" onInput={onChange} />
        <datalist id="cards">
          {names.map((name) => {
            return <option value={name} key={name} />;
          })}
        </datalist>
      </section>
      <section>
        {card !== null ? (
          <img src={card.data[0].image_uris.normal} alt="" />
        ) : null}
      </section>
    </div>
  );
};

export default Finder;
