import apiRequest from "./axiosConfig";

export const fetchUser = async (uid) => {
  try {
    return await apiRequest.get(`/api/users/${uid}`);
  } catch (error) {
    console.log("Error in fetching user by UID");
    console.log("Error :", error);
  }
};

export const fetchUsersByUid = async (uidArr) => {
  try {
    return await apiRequest.post(`/api/users/fetchUsersByUid`, { uidArr });
  } catch (error) {
    console.log("Error in fetching multiple users by UID");
    console.log("Error :", error);
  }
};

export const fetchUsers = async (payload) => {
  try {
    return await apiRequest.post("/api/users/search", payload);
  } catch (error) {
    console.log("Error in fetching users");
    console.log("Error :", error);
  }
};

export const addUser = async (payload) => {
  try {
    return await apiRequest.post("/api/users/add", {
      name: payload.name,
      email: payload.email,
      uid: payload.uid,
    });
  } catch (error) {
    console.log("User not created in database ");
    console.log("Error :", error);
  }
};

export const fetchSentRequests = async (payload) => {
  try {
    return await apiRequest.post("/api/users/fetchSentRequests", payload);
  } catch (error) {
    console.log("Error fetching sent requests:");
    console.log("Error :", error);
  }
};

export const sendFriendRequest = async (payload) => {
  try {
    return await apiRequest.post("/api/users/sendFriendRequest", payload);
  } catch (error) {
    console.log("sendFriendRequest operation failed");
    console.log("Error :", error);
  }
};

export const cancelFriendRequest = async (payload) => {
  try {
    return await apiRequest.post("/api/users/cancelFriendRequest", payload);
  } catch (error) {
    console.log("cancelFriendRequest operation failed");
    console.log("Error :", error);
  }
};

export const acceptFriendRequest = async (payload) => {
  try {
    return await apiRequest.post("/api/users/acceptFriendRequest", payload);
  } catch (error) {
    console.log("acceptFriendRequest operation failed");
    console.log("Error :", error);
  }
};

export const rejectFriendRequest = async (payload) => {
  try {
    return await apiRequest.post("/api/users/rejectFriendRequest", payload);
  } catch (error) {
    console.log("rejectFriendRequest operation failed");
    console.log("Error :", error);
  }
};
