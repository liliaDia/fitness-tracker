import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import AccountForm from "./components/AccountForm";
import Activities from "./components/Activities";
import Routines from "./components/Routines";
import MyRoutines from "./components/MyRoutines";
import Home from "./components/Home";
import CreateActivity from "./components/CreateActivity";
import CreateRoutines from "./components/CreateRoutines";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);

  const logout = () => {
    setToken("");
    navigate("/Account/login");
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <div>
            <>
              <Link className="mr-10" to="/">
                Home
              </Link>
              <Link className="mr-10" to="/Routines">
                Routines
              </Link>
              <Link className="mr-10" to="/Activities">
                Activities
              </Link>
            </>
            {token ? (
              <div>
                <Link className="mr-10" to="/MyRoutines">
                  My Routines
                </Link>
                <button className="mr-10" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <Link className="mr-10" to="/Account/signup">
                  Register
                </Link>
                <Link className="mr-10" to="/Account/login">
                  Login
                </Link>
              </div>
            )}
          </div>
        </nav>
        <div>
          <Routes>
            <Route
              path="/Account/:action"
              element={<AccountForm setToken={setToken} token={token} />}
            ></Route>
            <Route
              path="/"
              element={<Home token={token} user={user} setUser={setUser} />}
            ></Route>
            <Route
              path="/Activities"
              element={<Activities token={token} />}
            ></Route>
            <Route
              path="/CreateActivity"
              element={
                <CreateActivity
                  token={token}
                  count={count}
                  setCount={setCount}
                  duration={duration}
                  setDuration={setDuration}
                />
              }
            ></Route>
            <Route
              path="/Routines"
              element={<Routines token={token} />}
            ></Route>
            <Route
              path="/CreateRoutines"
              element={<CreateRoutines token={token} />}
            ></Route>
            <Route
              path="/MyRoutines"
              element={
                <MyRoutines
                  token={token}
                  user={user}
                  count={count}
                  setCount={setCount}
                  duration={duration}
                  setDuration={setDuration}
                />
              }
            ></Route>
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
