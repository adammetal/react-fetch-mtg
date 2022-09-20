import Loader from "../Loader";
import useImagePreload from "../../Hooks/useImagePreload";

const Card = ({ image }) => {
  const loading = useImagePreload(image);

  if (loading) {
    return <Loader />;
  }

  return <img className="Card" src={image} alt="" />;
};

export default Card;
