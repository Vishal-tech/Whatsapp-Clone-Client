import React, { useState, useEffect } from "react";
import { fetchUsersByUid } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";
import FriendModal from "./Friend_Modal";

const ReceivedRequestsModal = ({ show, handleClose }) => {
  const { currentUserObj } = useAuth();
  const [usersArr, setUsersArr] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetchUsersByUid([
        ...currentUserObj.pendingRequests,
      ]);
      const newUsers = response.data;
      setUsersArr(newUsers);
    } catch (error) {
      console.error("Error fetching sent requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FriendModal
      title="Received requests"
      subTitle="People who sent you friend request"
      show={show}
      handleClose={handleClose}
      usersArr={usersArr}
      setUsersArr={setUsersArr}
    />
  );
};

export default ReceivedRequestsModal;
