import { useState } from "react";
import { newActivity, updateActivity } from "../api/activities";
import { useLocation } from "react-router-dom";
import { updateRoutineActivity } from "../api/routine_activities";
//updateRoutineActivity(token, id, count, duration)

const CreateActivity = ({ token, count, setCount, duration, setDuration }) => {
  const { id } = useLocation().state;
  const { activityName } = useLocation().state;
  const { activityDescription } = useLocation().state;
  const [dataMessage, setDataMessage] = useState({});
  const [attemptedCreateActivity, setAttemptedCreateActivity] = useState(false);
  const { routineId } = useLocation().state;
  const [name, setName] = useState(id ? activityName : "");
  const [description, setDescription] = useState(id ? activityDescription : "");

  const newActivityInfo = async () => {
    try {
      const activity = await newActivity(token, name, description);
      setDataMessage(activity);
      return activity;
    } catch (err) {
      console.error(err);
    }
  };

  const editActivity = async () => {
    try {
      const editedActivity = await updateActivity(token, name, description, id);
      setDataMessage(editedActivity);
      return editedActivity;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (routineId) {
      const editedRoutineActivity = await updateRoutineActivity(
        token,
        routineId,
        count,
        duration
      );
      return editedRoutineActivity;
    }
    id ? editActivity() : newActivityInfo();
  };

  return (
    <div className="bg-white p-5 mt-3 mx-10">
      <div className="relative flex flex-col px-10 pt-2 pb-6 font-sans text-gray-700 bg-gray-200 sm:px-6 lg:px-8">
        <h1 className="p-10 text-5xl">Fitness Tracker</h1>
      </div>
      <div>
        <form>
          {routineId ? (
            <>
              <h2>{activityName}</h2>
              <label>Count :</label>
              <input
                id="count"
                type="number"
                placeholder="count"
                value={count}
                onChange={(event) => {
                  setCount(event.target.value);
                }}
                required
              ></input>
              <label>Duration :</label>
              <input
                id="duration"
                placeholder="duration"
                type="number"
                value={duration}
                onChange={(event) => {
                  setDuration(event.target.value);
                }}
                required
              ></input>
            </>
          ) : (
            <>
              <label>Name :</label>
              <input
                className="mt-5 ml-5"
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
              <label>Description :</label>
              <input
                className="mt-5 ml-5"
                id="description"
                type="text"
                placeholder="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                required
              ></input>
            </>
          )}

          <br></br>
          <button
            className="py-2 rounded px-4 bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
            type="submit"
            onClick={(event) => {
              onSubmit(event);
              setAttemptedCreateActivity(true);
              setCount(0);
              setDuration(0);
            }}
          >
            Submit
          </button>
          {attemptedCreateActivity ? (
            <>
              {dataMessage.message ? (
                <div>
                  <p>{dataMessage.message}</p>
                </div>
              ) : (
                <div>
                  <p>sucess</p>
                </div>
              )}
            </>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default CreateActivity;
