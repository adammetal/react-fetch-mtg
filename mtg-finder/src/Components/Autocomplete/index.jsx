import { useState, useTransition } from "react";
import Loader from "../Loader";
import "./index.css";

const HitList = ({ hits, activeHit, selectHit, pending }) => {
  if (!hits.length) {
    return null;
  }

  if (pending) {
    return (
      <div className="hits">
        <Loader />
      </div>
    );
  }

  return (
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
  );
};

const Autocomplete = ({ items, onChange }) => {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState("");
  const [hits, setHits] = useState([]);
  const [activeHit, setActiveHit] = useState(-1);

  const onInputValueChange = (e) => {
    const {
      target: { value: search },
    } = e;

    startTransition(() => {
      if (search.length > 1) {
        const nextHits = findHits(search);
        setHits(nextHits);
      } else {
        setHits([]);
      }
    });

    setInputValue(search);
    setActiveHit(-1);

    if (!search.length) {
      setHits([]);
      return;
    }
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
      } else if (inputValue.length > 3) {
        setActiveHit(-1);
        setHits([]);
        onChange(inputValue);
      }
    }
  };

  const findHits = (term) => {
    if (!term) {
      return [];
    }

    const lower = term.toLowerCase();

    return items.filter((item) => {
      return item.toLowerCase().includes(lower);
    });
  };

  const selectHit = (hit) => {
    setActiveHit(-1);
    setInputValue(hit);
    setHits([]);
    onChange(hit);
  };

  return (
    <div className="Autocomplete">
      <input
        type="text"
        value={inputValue}
        placeholder="Search for a card"
        onChange={onInputValueChange}
        onKeyDown={onKeyDown}
      />
      <HitList
        pending={isPending}
        hits={hits}
        activeHit={activeHit}
        selectHit={selectHit}
      />
    </div>
  );
};

export default Autocomplete;