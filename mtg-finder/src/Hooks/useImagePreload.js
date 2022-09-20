import { useState, useEffect } from "react";

const preloadImage = (src, cb) => {
  const img = document.createElement("img");
  img.src = src;

  const onLoad = () => {
    cb();
  };

  img.addEventListener("load", onLoad);

  return () => {
    img.removeEventListener("load", onLoad);
  };
};

const useImagePreload = (src) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    return preloadImage(src, () => {
      setLoading(false);
    });
  }, [src]);

  return loading;
};

export default useImagePreload;
