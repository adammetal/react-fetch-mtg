import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import CardFinder from "../../Components/CardFinder";
import { AuthContext } from "../../Context/AuthContext";
import "./index.css";

const Main = () => {
  const { user, signin, signout } = useContext(AuthContext);

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
            <Link to="/login">
              Sign in
            </Link>
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
            <a href="#">My decks</a>
            <a href="#">My decks</a>
            <a href="#">My decks</a>
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
