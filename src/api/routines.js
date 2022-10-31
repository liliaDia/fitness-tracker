import { baseUrl } from "./constants";

async function getRoutines() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(baseUrl + "/routines", options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function newRoutine(token, name, goal, isPublic = null) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  };
  try {
    const result = await fetch(baseUrl + "/routines", options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function updateRoutine(token, name, goal, id) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      goal,
    }),
  };
  try {
    const result = await fetch(`${baseUrl}/routines/${id}`, options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function deleteRoutine(token, id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const result = await fetch(`${baseUrl}/routines/${id}`, options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function attachSingleActivityToRoutine(
  routineId,
  activityId,
  count,
  duration
) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      activityId,
      count,
      duration,
    }),
  };
  try {
    const result = await fetch(
      `${baseUrl}/routines/${routineId}/activities`,
      options
    );
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export {
  getRoutines,
  newRoutine,
  updateRoutine,
  deleteRoutine,
  attachSingleActivityToRoutine,
};
