import { useState } from "react";
import Loader from "../Loader";
import useImagePreload from "../../Hooks/useImagePreload";

const Card = ({ image }) => {
  const [active, setActive] = useState(false);
  const loading = useImagePreload(image);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {active && <div className="overlay" />}
      <img
        onDoubleClick={() => setActive(!active)}
        className={`Card ${active ? "active" : ""}`}
        src={image}
        alt=""
      />
    </>
  );
};

export default Card;
