import { useState, useCallback, useEffect } from "react";

const useFetch = (
  url,
  { instant = true, mapper = (a) => a, token = "" } = {}
) => {
  const [loading, setLoading] = useState(instant);
  const [rawData, setRawData] = useState(null);
  const [error, setError] = useState(null);

  const action = useCallback(
    (query = {}) => {
      const abort = new AbortController();

      setLoading(true);
      setError(false);

      const params = new URLSearchParams();
      for (const entry of Object.entries(query)) {
        params.append(entry[0], entry[1]);
      }

      const search = params.toString();
      const options = {
        signal: abort.signal,
      };

      if (token && token.length) {
        options.headers = {
          Authorization: token,
        };
      }

      fetch(`${url}?${search}`, options)
        .then((res) => res.json())
        .then((res) => {
          setRawData(res);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            return;
          }
          setError(err);
        });

      return () => {
        abort.abort();
      };
    },
    [url]
  );

  useEffect(() => {
    if (instant === true) {
      return action();
    }
  }, [action, instant]);

  const data = rawData !== null ? mapper(rawData) : null;

  return [loading, data, action, error];
};

export default useFetch;
