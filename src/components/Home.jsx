import { userInfo } from "../api/users";
import { useEffect } from "react";

const Home = ({ token, user, setUser }) => {
  async function getInfo() {
    try {
      const userObj = await userInfo(token);
      setUser(userObj);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getInfo();
  }, []);

  if (user === null) {
    return;
  }

  return (
    <div className="bg-white p-10 mt-6">
      <div className="relative flex flex-col px-10 pt-2 pb-6 font-sans text-gray-700 bg-gray-200 sm:px-6 lg:px-8">
        <h1>Fitness Tracker</h1>
        <h1>welcome {user.username}</h1>
        <div></div>
      </div>
    </div>
  );
};
export default Home;
