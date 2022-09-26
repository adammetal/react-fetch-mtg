import CardFinder from "../../Components/CardFinder";
import "./index.css";

const Main = () => {
  return (
    <main className="Main">
      <nav className="nav">
        <header>
          <h1 className="title">MTG Finder</h1>
        </header>
        <a href="#">Home</a>
        <a href="#">Card finder</a>
        <a href="#">Sign up</a>
        <a href="#">Sign in</a>


        <header>
          <h2>My Decks</h2>
        </header>
        <a href="#">My decks</a>
        <a href="#">My decks</a>
        <a href="#">My decks</a>
      </nav>
      <section className="outlet">
        <CardFinder />
      </section>
    </main>
  );
};

export default Main;
