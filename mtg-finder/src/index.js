import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Main from "./Pages/Main";
import AuthProvider from "./Context/AuthContext";
import DeckStoreProvider from "./Context/DeckContext";
import CardFinder from "./Components/CardFinder";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/Signup";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <CardFinder /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: '/decks/:id', element: null }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <DeckStoreProvider>
        <RouterProvider router={router} />
      </DeckStoreProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
