import { useState, useTransition } from "react";
import "./Autocomplete.css";
import Loader from "./Loader";

const Autocomplete = ({ items, onChange }) => {
  const [isPengind, startTransition] = useTransition();
  const [value, setValue] = useState("");
  const [hits, setHits] = useState([]);
  const [activeHit, setActiveHit] = useState(-1);

  const onInputValueChange = (e) => {
    const {
      target: { value: search },
    } = e;

    setValue(search);
    setActiveHit(-1);

    if (!search.length) {
      setHits([]);
      return;
    }

    startTransition(() => {
      const nextHits = findHits(search);
      setHits(nextHits);
    });
  };

  const onKeyDown = (e) => {
    const key = e.code;
    if (key === "ArrowDown") {
      setActiveHit((active) => {
        if (active < hits.length) {
          return active + 1;
        }
        return active;
      });
    }

    if (key === "ArrowUp") {
      setActiveHit((active) => {
        if (active > -1) {
          return active - 1;
        }
        return active;
      });
    }

    if (key === "Enter") {
      if (activeHit > -1) {
        selectHit(hits[activeHit]);
      } else if (value.length > 3) {
        setActiveHit(-1);
        setHits([]);
        onChange(value);
      }
    }
  };

  const findHits = (term) => {
    const lower = term.toLowerCase();
    return items.filter((item) => {
      return item.toLowerCase().includes(lower);
    });
  };

  const selectHit = (hit) => {
    setActiveHit(-1);
    setValue(hit);
    setHits([]);
    onChange(hit);
  };

  return (
    <div className="Autocomplete">
      <input
        type="text"
        placeholder="Search for a card"
        value={value}
        onChange={onInputValueChange}
        onKeyDown={onKeyDown}
      />
      {isPengind ? (
        <div className="hits">
          <Loader />
        </div>
      ) : null}
      {hits.length > 0 ? (
        <div className="hits">
          {hits.map((hit, index) => (
            <div
              className={`${index === activeHit ? "hit active" : "hit"}`}
              onClick={() => selectHit(hit)}
              key={hit}
            >
              {hit}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Autocomplete;
