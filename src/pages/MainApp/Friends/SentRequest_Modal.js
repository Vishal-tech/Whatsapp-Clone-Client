import React, { useState, useEffect } from "react";
import { fetchUsersByUid } from "../../../services/api";
import { useData } from "../../../contexts/DataContext";
import FriendModal from "./Friend_Modal";

const SentRequestModal = ({ show, handleClose }) => {
  const { currentUserObj } = useData();
  const [usersArr, setUsersArr] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetchUsersByUid([...currentUserObj.sentRequests]);
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
      title="Sent Requests"
      subTitle="People to whom you sent friend request"
      show={show}
      handleClose={handleClose}
      usersArr={usersArr}
      setUsersArr={setUsersArr}
    />
  );
};
export default SentRequestModal;
