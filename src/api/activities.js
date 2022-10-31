import { baseUrl } from "./constants";
async function getActivities() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(baseUrl + "/activities", options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function newActivity(token, name, description) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  };
  try {
    const result = await fetch(baseUrl + "/activities", options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function updateActivity(token, name, description, id) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
    }),
  };
  try {
    const result = await fetch(`${baseUrl}/activities/${id}`, options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export { updateActivity, getActivities, newActivity };
