import { useState, useCallback, useEffect } from "react";

const useFetch = (url, { instant = true, mapper = (a) => a } = {}) => {
  const [loading, setLoading] = useState(instant);
  const [data, setData] = useState(null);

  const action = useCallback(
    (query = {}) => {
      setLoading(true);

      const search = new URLSearchParams();
      for (const entry of Object.entries(query)) {
        search.append(entry[0], entry[1]);
      }

      fetch(url + "?" + search.toString())
        .then((res) => res.json())
        .then((res) => {
          setData(res);
          setLoading(false);
        });
    },
    [url]
  );

  useEffect(() => {
    if (instant === true) {
      action();
    }
  }, [action, instant]);

  const retData = data !== null ? mapper(data) : null;

  return [loading, retData, action];
};

export default useFetch;
