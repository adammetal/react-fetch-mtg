import { useState, useCallback, useEffect } from "react";

const useFetch = (url, { startNow = true, mapper = (a) => a } = {}) => {
  const [loading, setLoading] = useState(startNow);
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
    if (startNow === true) {
      action();
    }
  }, [action, startNow]);

  const retData = data !== null ? mapper(data) : null;

  return [loading, retData, action];
};

export default useFetch;
