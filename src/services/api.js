import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:3001",
});

export const addUser = async (payload) => {
  try {
    return await apiRequest.post("/api/users/add", {
      name: payload.name,
      email: payload.email,
      uid: payload.uid,
    });
  } catch (error) {
    console.log("User not created in database");
  }
};
