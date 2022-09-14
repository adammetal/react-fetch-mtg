import { useState } from "react";
import "./Autocomplete.css";

const AutocompleteDemo = ({ items, onChange }) => {
  const [value, setValue] = useState("");
  const [hits, setHits] = useState([]);
  const [active, setActive] = useState(-1);

  const onInputChange = (e) => {
    const term = e.target.value;

    setValue(term);
    setActive(-1);

    if (!term.length) {
      setHits([]);
      return;
    }

    const lower = term.toLowerCase();
    setHits(
      items.filter((item) => {
        if (item.toLowerCase().startsWith(lower)) {
          return true;
        }
        return false;
      })
    );
  };

  const onKeyDown = (e) => {
    const code = e.code;

    if (code === "ArrowDown") {
      setActive((prev) => {
        if (prev < hits.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }

    if (code === "ArrowUp") {
      setActive((prev) => {
        if (prev > -1) {
          return prev - 1;
        }
        return prev;
      });
    }

    if (code === "Enter") {
      if (active !== -1) {
        const term = hits[active];
        setValue(term);
        setHits([]);
        setActive(-1);
        onChange(term);
      } else {
        setHits([]);
        setActive(-1);
        onChange(value);
      }
    }
  };

  return (
    <div className="Autocomplete">
      <input
        type="text"
        value={value}
        onKeyDown={onKeyDown}
        onChange={onInputChange}
      />
      {hits.length ? (
        <div className="hits">
          {hits.map((hit, index) => (
            <div
              className={`${index === active ? "hit active" : "hit"}`}
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

export default AutocompleteDemo;
