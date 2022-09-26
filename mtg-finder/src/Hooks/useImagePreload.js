import { useState, useEffect } from "react";

const preloadImage = (src, cb) => {
  const img = document.createElement("img");
  img.addEventListener("load", cb);

  img.src = src;

  return () => {
    img.removeEventListener("load", cb);
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
