import { getRoutines } from "../api/routines";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Routines = ({ token }) => {
  const [allRoutines, setAllRoutines] = useState([]);
  const Navigate = useNavigate();

  async function getAllRoutines() {
    try {
      const allRoutines = await getRoutines();
      setAllRoutines(allRoutines);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getAllRoutines();
  }, []);

  if (allRoutines === null) {
    return;
  }

  return (
    <div className="bg-white p-5 mt-3 mx-10">
      <div className="relative flex flex-col px-10 pt-2 pb-6 font-sans text-gray-700 bg-gray-200 sm:px-6 lg:px-8">
        <div className="p-2 text-5xl">
          <h1>Fitness Tracker</h1>
          <h1>Routines</h1>
        </div>
        <div className="flex-1 space-y-8">
          {token && (
            <button
              className="py-2 px-4 rounded bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
              onClick={() => Navigate("/CreateRoutines", { state: { token } })}
            >
              Create a Routine +
            </button>
          )}
        </div>
        {allRoutines.map((routine) => {
          return (
            <div
              className="sticky w-full px-8 py-12 mx-auto space-y-4 bg-white border rounded-lg shadow-lg mb-5"
              key={routine.id}
            >
              <h4>
                Name:{routine.name} <br></br>Goal:{routine.goal} <br></br>
                Creator Name:
                {routine.creatorName} <br></br>activity:
                {routine.activities.map((eachActivity) => {
                  return (
                    <div
                      key={eachActivity.id}
                      className="bg-gray-300 rounded p-5 mt-3 mx-10"
                    >
                      Activitiy Name: {eachActivity.name} <br></br>Description:
                      {eachActivity.description}
                      <br></br> Duration:
                      {eachActivity.duration} Count:{eachActivity.count}
                    </div>
                  );
                })}
              </h4>
              {token && (
                <button
                  className="py-2 px-4 rounded bg-green-600  text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  type="button"
                  id={routine.id}
                  onClick={() =>
                    Navigate("/CreateRoutines", {
                      state: {
                        token,
                        id: routine.id,
                        routineName: routine.name,
                        routineGoal: routine.goal,
                        isPublicNow: routine.isPublic,
                      },
                    })
                  }
                >
                  edit
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Routines;
