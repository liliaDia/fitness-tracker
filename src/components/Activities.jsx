import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";

const Activities = ({ token }) => {
  const Navigate = useNavigate();
  const [activities, setActivities] = useState([]);

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

  return (
    <div className="bg-white p-5 mt-3 mx-10">
      <div className="relative flex flex-col px-10 pt-2 pb-6 font-sans text-gray-700 bg-gray-200 sm:px-6 lg:px-8">
        <div className="p-2 text-5xl">
          <h1>Fitness Tracker</h1>
          <h3>Activities</h3>
        </div>
        {token && (
          <button
            className="py-2 px-4 rounded bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
            onClick={() => Navigate("/CreateActivity", { state: { token } })}
          >
            Create an Activity +
          </button>
        )}
      </div>
      {activities.map((activity) => {
        return (
          <div
            className="sticky w-full rounded px-8 py-12 mx-auto space-y-4 bg-white border rounded-lg shadow-lg mb-5"
            key={activity.id}
          >
            <h5>
              Name:{activity.name}
              <br></br> Desctiption:
              {activity.description}
            </h5>
            {token && (
              <button
                className="py-2 px-4 rounded bg-green-600 text-white w-25 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                type="button"
                id={activity.id}
                onClick={() =>
                  Navigate("/CreateActivity", {
                    state: {
                      token,
                      id: activity.id,
                      activityName: activity.name,
                      activityDescription: activity.description,
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
  );
};
export default Activities;
