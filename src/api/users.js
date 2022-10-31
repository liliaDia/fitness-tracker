import { baseUrl } from "./constants";
async function login(username, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };
  try {
    const result = await fetch(baseUrl + "/users/login", options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function registerUser(username, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };
  try {
    const result = await fetch(baseUrl + "/users/register", options);
    const data = await result.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function userInfo(token) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(baseUrl + "/users/me", options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function usersRoutines(token, username) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(
      `${baseUrl}/users/${username}/routines`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export { login, registerUser, userInfo, usersRoutines };
