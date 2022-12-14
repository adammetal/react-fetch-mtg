import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
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
        <Link to="/">Home</Link>

        {!user && (
          <>
            <Link to="/signup">Sign up</Link>
            <Link to="/signin">Sign in</Link>
          </>
        )}

        {user && (
          <a href="" onClick={signout}>
            Sign out
          </a>
        )}

        {user && (
          <>
            <header>
              <h2>My Decks</h2>
            </header>
            {decks.map((deck) => (
              <div className="deck" key={deck._id}>
                {deck.loading ? (
                  <div className="deck-loading">{deck.name}</div>
                ) : (
                  <Link to={`/decks/${deck._id}`}>{deck.name}</Link>
                )}
              </div>
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
