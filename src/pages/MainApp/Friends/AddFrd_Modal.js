import React, { useState, useRef, useEffect } from "react";
import { fetchUsers } from "../../../services/api";

import FriendModal from "./Friend_Modal";

const AddFrdModal = ({ show, handleClose }) => {
  const [usersArr, setUsersArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const searchRef = useRef("");
  const pageSize = 10;

  const fetchData = async () => {
    console.log("inside fetchData");
    try {
      const response = await fetchUsers({
        page: pageRef.current,
        pageSize,
        searchTerm: searchRef.current,
      });

      const newUsers = response.data;
      if (newUsers.length < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      console.log(newUsers);
      if (pageRef.current === 1) {
        setUsersArr(newUsers);
      } else {
        setUsersArr((prevUsers) => [...prevUsers, ...newUsers]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setLoading(true);
    pageRef.current = pageRef.current + 1;
    fetchData();
  };

  const handleSearch = (e) => {
    searchRef.current = e.target.value;
    pageRef.current = 1;
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FriendModal
      title="Find friends"
      subTitle="Search your friend"
      show={show}
      handleClose={handleClose}
      handleSearch={handleSearch}
      searchPlaceHolder="Enter your friend's name"
      handleLoadMore={handleLoadMore}
      hasMore={hasMore}
      usersArr={usersArr}
      setUsersArr={setUsersArr}
      loading={loading}
      setLoading={setLoading}
    />
  );
};

export default AddFrdModal;
