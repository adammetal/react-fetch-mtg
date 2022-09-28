import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useDeckStore } from "../../Context/DeckContext";
import DeckCreator from "../../Components/DeckCreator";

import "./index.css";

const Main = () => {
  const { user, signout } = useContext(AuthContext);

  const decks = useDeckStore((state) => state.decks);

  return (
    <main className="Main">
      <nav className="nav">
        <header>
          <h1 className="title">MTG Finder</h1>
        </header>
        <a href="#">Home</a>
        <a href="#">Card finder</a>

        {!user && (
          <>
            <a href="#">Sign up</a>
            <Link to="/login">Sign in</Link>
          </>
        )}

        {user && (
          <a href="#" onClick={signout}>
            Sign out
          </a>
        )}

        {user && (
          <>
            <header>
              <h2>My Decks</h2>
            </header>
            {decks.map((deck) => (
              <a herf="#" key={deck.name}>
                {deck.name}
              </a>
            ))}
            <DeckCreator />
          </>
        )}
      </nav>
      <section className="outlet">
        <Outlet />
      </section>
    </main>
  );
};

export default Main;
