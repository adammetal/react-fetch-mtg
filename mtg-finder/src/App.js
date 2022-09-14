import { useEffect, useState } from "react";
import Finder from "./Finder";
import Loader from "./Loader";

const NAMES_API = "/api/names";

function App() {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch(NAMES_API, { signal: controller.signal })
      .then((res) => res.json())
      .then((res) => {
        setNames(res);
        setLoading(false);
      })
      .catch((e) => {
        console.log("Aborted");
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="App">
      {loading ? <Loader /> : <Finder names={names} />}
    </div>
  );
}

export default App;
