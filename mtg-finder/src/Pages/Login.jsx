import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { signin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    const body = JSON.stringify({ email, password });

    fetch("/api/auth/signin", {
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
        signin(user);
      });
  };

  return (
    <div>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="text"
        placeholder="Email"
      />
      <br />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Password"
      />
      <br />
      <button type="submit" onClick={onLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
