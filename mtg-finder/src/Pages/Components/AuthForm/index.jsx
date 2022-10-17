import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../Api";
import { AuthContext } from "../../../Context/AuthContext";

import "./index.css";

const AuthForm = ({ isSignIn }) => {
  const navigate = useNavigate();
  const { signin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    const body = JSON.stringify({ email, password });
    const url = isSignIn ? "/api/auth/signin" : "/api/auth/signup";

    setLoading(true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          return null;
        }

        return res.json();
      })
      .then((user) => {
        if (isSignIn) {
          signin(user);
          Api.setToken(user.token);
          return navigate("/");
        }
        navigate("/signin");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="Login">
      <input
        disabled={loading}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        placeholder="Email"
      />
      <input
        disabled={loading}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Password"
      />
      <button disabled={loading} type="submit" onClick={onSubmit}>
        {isSignIn ? "Sign In" : "Sign Up"}
      </button>
    </div>
  );
};

export default AuthForm;
