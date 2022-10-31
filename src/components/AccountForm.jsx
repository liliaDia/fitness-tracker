import { login } from "../api/users";
import { registerUser } from "../api/users";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const AccountForm = ({ setToken, token }) => {
  const Navigate = useNavigate();
  const { action } = useParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const loginOrRegister = action === "login" ? login : registerUser;
      const data = await loginOrRegister(username, password);
      await setToken(data.token);
      setError(data);
      if (data.token) {
        Navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div className="bg-white p-5 mt-3 mx-10">
      <div className="relative flex flex-col px-10 pt-2 pb-6 font-sans text-gray-700 bg-gray-200 sm:px-6 lg:px-8">
        <header>
          <h1 className="p-10 text-5xl">Fitness Tracker</h1>
          <h2>{action === "login" ? "Login" : "Signup"}</h2>
        </header>
      </div>
      <form onSubmit={onSubmit} className="mt-8">
        <label className="p-2">Username:</label>
        <input
          placeholder="username"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          value={username}
          required
        ></input>
        <label className="p-2">Password:</label>
        <input
          id="password"
          placeholder="password"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          value={password}
          required
        ></input>
        <button
          className="py-2 px-4 rounded bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
          type="submit"
        >
          {action === "login" ? "LOGIN" : "SIGN UP"}
        </button>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default AccountForm;
