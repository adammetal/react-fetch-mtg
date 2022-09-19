import { useEffect, useState } from "react";
import Loader from "./Loader";

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

const Card = ({ image }) => {
  const loading = useImagePreload(image);

  if (loading) {
    return <Loader />;
  }

  return <img className="Card" src={image} alt="" />;
};

export default Card;
