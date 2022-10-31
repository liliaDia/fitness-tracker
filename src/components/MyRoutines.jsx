import { useState, useEffect } from "react";
import {
  newRoutine,
  deleteRoutine,
  attachSingleActivityToRoutine,
} from "../api/routines";
import { removeActivityFromRoutine } from "../api/routine_activities";
import { usersRoutines } from "../api/users";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../api/activities";

const MyRoutines = ({
  token,
  user,
  count,
  setCount,
  duration,
  setDuration,
}) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [activityId, setActivityId] = useState("");
  const [routinesByUser, setRoutinesByUser] = useState([]);
  const [activities, setActivities] = useState([]);
  const Navigate = useNavigate();

  const newRoutineInfo = async () => {
    try {
      const routine = await newRoutine(token, name, goal, isPublic);
      return routine;
    } catch (err) {
      console.error(err);
    }
  };

  async function getAllActivities() {
    try {
      const allActivities = await getActivities();
      setActivities(allActivities);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    getAllActivities();
  }, []);

  const allUserRoutines = async () => {
    try {
      const userRoutines = await usersRoutines(token, user.username);
      setRoutinesByUser(userRoutines);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    allUserRoutines();
  }, []);

  if (routinesByUser === null) {
    return;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    //id ? editRoutine() :
    await newRoutineInfo();
    await allUserRoutines();
  };

  return (
    <div className="bg-white p-5 mt-3 mx-10">
      <div className="relative flex flex-col px-10 pt-2 pb-6 font-sans text-gray-700 bg-gray-200 sm:px-6 lg:px-8">
        <div className="p-2 text-5xl">
          <h1>Fitness Tracker</h1>
          <h2>My Routines</h2>
        </div>
        <div className="flex-1 space-y-8">
          <form>
            <label className="mr-1">Name :</label>
            <input
              id="name"
              placeholder="name"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
            ></input>
            <br></br>
            <label className="mr-5">Goal :</label>
            <input
              id="goal"
              type="text"
              placeholder="goal"
              value={goal}
              onChange={(event) => {
                setGoal(event.target.value);
              }}
              required
            ></input>
            <br></br>
            <label className="mr-5">Public Routine</label>
            <input
              value={isPublic}
              id="isPublic"
              type="checkbox"
              onChange={() => {
                setIsPublic(true);
              }}
            ></input>

            <br></br>
            <button
              className="py-2 px-4 mb-5 rounded bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
              type="submit"
              onClick={(event) => {
                onSubmit(event);
              }}
            >
              Create a Routine +
            </button>
          </form>
        </div>
        {routinesByUser.map((routine) => {
          return (
            <div
              className="sticky w-full px-8 py-12 mx-auto space-y-4 bg-white border rounded-lg shadow-lg mb-5"
              key={routine.id}
            >
              <h4>
                Routine Name:{routine.name} <br></br>Goal:{routine.goal}
                <br></br>Activitites:
                {routine.activities.map((eachActivity) => {
                  return (
                    <div
                      key={eachActivity.id}
                      className="bg-gray-300 rounded p-5 mt-3 mx-10"
                    >
                      Activitiy Name: {eachActivity.name} <br></br>Description:
                      {eachActivity.description} <br></br>Duration:
                      {eachActivity.duration} Count:{eachActivity.count}
                      <br></br>
                      <button
                        type="button"
                        className="py-2 px-4 mr-3 ml-3 rounded bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        id={routine.id}
                        onClick={async (event) => {
                          console.log(token, routine.id);
                          await removeActivityFromRoutine(
                            token,
                            eachActivity.routineActivityId
                          );
                          await allUserRoutines();
                        }}
                      >
                        Delete Activity
                      </button>
                      <button
                        className="py-2 rounded px-4 bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        onClick={() =>
                          Navigate("/CreateActivity", {
                            state: {
                              token,
                              routineId: eachActivity.routineActivityId,
                              count: eachActivity.count,
                              duration: eachActivity.duration,
                              activityName: eachActivity.name,
                            },
                          })
                        }
                      >
                        Edit an Activity
                      </button>
                    </div>
                  );
                })}
              </h4>
              <select
                className="w-50"
                name="activity"
                id="activity"
                onChange={(event) => {
                  setActivityId(event.target.value);
                }}
              >
                {activities.map((activity, idx) => {
                  return (
                    <>
                      <option value={activity.id}>{activity.name}</option>
                    </>
                  );
                })}
              </select>
              <br></br>
              <label>Count:</label>
              <input
                className="w-12"
                id="count"
                type="number"
                placeholder="count"
                value={count}
                onChange={(event) => {
                  setCount(event.target.value);
                }}
                required
              ></input>
              <label>Duration:</label>
              <input
                className="w-12"
                id="duration"
                placeholder="duration"
                type="number"
                value={duration}
                onChange={(event) => {
                  setDuration(event.target.value);
                }}
                required
              ></input>
              <button
                className="py-2 px-4 mr-3 rounded bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                type="button"
                id={routine.id}
                onClick={async (event) => {
                  await attachSingleActivityToRoutine(
                    event.target.id,
                    activityId,
                    count,
                    duration
                  );
                  await allUserRoutines();
                  setCount(0);
                  setDuration(0);
                }}
              >
                Add Activity To Routine +
              </button>
              <button
                className="py-2 px-4 mr-3 rounded bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                type="button"
                id={routine.id}
                onClick={() => {
                  Navigate("/CreateRoutines", {
                    state: {
                      token,
                      id: routine.id,
                      routineName: routine.name,
                      routineGoal: routine.goal,
                      isPublicNow: routine.isPublic,
                    },
                  });
                }}
              >
                Edit Routine
              </button>
              <button
                className="py-2 px-4 rounded bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                type="button"
                id={routine.id}
                onClick={async (event) => {
                  await deleteRoutine(token, event.target.id);
                  await allUserRoutines();
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MyRoutines;
