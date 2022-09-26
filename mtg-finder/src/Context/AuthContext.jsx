import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext({ user: null });

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // check the state of authentication
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    const controller = new AbortController();

    fetch("/api/auth/me", {
      signal: controller.signal,
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return null;
        }
        return res.json();
      })
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const signin = (user) => {
    if (user !== null) {
      localStorage.setItem("token", user.token);
    }
    setUser(user);
  };

  const signout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
