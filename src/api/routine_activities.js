import { baseUrl } from "./constants";

async function updateRoutineActivity(token, id, count, duration) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      count,
      duration,
    }),
  };
  try {
    const result = await fetch(`${baseUrl}/routine_activities/${id}`, options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function removeActivityFromRoutine(token, id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const result = await fetch(`${baseUrl}/routine_activities/${id}`, options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
export { updateRoutineActivity, removeActivityFromRoutine };
