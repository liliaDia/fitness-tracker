import { useState } from "react";
import { newRoutine, updateRoutine } from "../api/routines";
import { useLocation } from "react-router-dom";

const CreateRoutines = ({ token }) => {
  const { id } = useLocation().state;
  const { routineName } = useLocation().state;
  const { routineGoal } = useLocation().state;
  const { isPublicNow } = useLocation().state;
  const [dataMessage, setDataMessage] = useState({});
  const [attemptedCreateActivity, setAttemptedCreateActivity] = useState(false);
  const [name, setName] = useState(id ? routineName : "");
  const [goal, setGoal] = useState(id ? routineGoal : "");
  const [isPublic, setIsPublic] = useState(id ? isPublicNow : true);

  const newRoutineInfo = async () => {
    try {
      const routine = await newRoutine(token, name, goal, isPublic);
      setDataMessage(routine);
      return routine;
    } catch (err) {
      console.error(err);
    }
  };

  const editRoutine = async () => {
    try {
      const editedRoutine = await updateRoutine(token, name, goal, id);
      setDataMessage(editRoutine);
      return editedRoutine;
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    id ? editRoutine() : newRoutineInfo();
  };

  return (
    <div className="bg-white p-5 mt-3 mx-10">
      <div className="relative flex flex-col px-10 pt-2 pb-6 font-sans text-gray-700 bg-gray-200 sm:px-6 lg:px-8">
        <h1>Fitness Tracker</h1>
      </div>
      <div>
        <form>
          <label className="mr-5">Routine Name</label>
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
          <label className="mr-5">Goal</label>

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
          <label className="mr-5">Public?</label>
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
            className="py-2 rounded px-4 bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
            type="submit"
            onClick={(event) => {
              onSubmit(event);
              setAttemptedCreateActivity(true);
            }}
          >
            submit
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

export default CreateRoutines;
