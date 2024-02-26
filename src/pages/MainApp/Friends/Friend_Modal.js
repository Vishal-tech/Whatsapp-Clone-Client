import React, { useState, useRef, useEffect } from "react";
import { Avatar, Button, Modal, CircularProgress } from "@material-ui/core";
import "./Friend_Modal.css";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import CloseOutlined from "@material-ui/icons/CloseOutlined";
import defaultAvatar from "../../../images/defaultAvatar.png";
import {
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";

const FriendModal = ({
  show,
  handleClose,
  title,
  subTitle,
  handleSearch,
  searchPlaceHolder,
  handleLoadMore,
  hasMore,
  usersArr,
  setUsersArr,
  loading,
  setLoading,
}) => {
  const { currentUser, currentUserObj, setCurrentUserObj } = useAuth();

  const handleSendRequest = async (userObj) => {
    try {
      const response = await sendFriendRequest({
        currentUser: currentUser.uid,
        targetUser: userObj.uid,
      });
      setCurrentUserObj(response.data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleCancelRequest = async (userObj) => {
    try {
      const response = await cancelFriendRequest({
        currentUser: currentUser.uid,
        targetUser: userObj.uid,
      });
      setCurrentUserObj(response.data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleAcceptRequest = async (userObj) => {
    try {
      const response = await acceptFriendRequest({
        currentUser: currentUser.uid,
        targetUser: userObj.uid,
      });
      setCurrentUserObj(response.data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const handleRejectRequest = async (userObj) => {
    try {
      const response = await rejectFriendRequest({
        currentUser: currentUser.uid,
        targetUser: userObj.uid,
      });
      setCurrentUserObj(response.data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  const actionBlock = (userObj) => {
    if (currentUserObj.pendingRequests.find((uid) => uid === userObj.uid)) {
      return (
        <div className="friend-modal__acceptReject">
          <Button
            onClick={() => handleAcceptRequest(userObj)}
            size="small"
            variant="contained"
            style={{ backgroundColor: "#4caf50", color: "#ffffff" }}
          >
            Accept
          </Button>
          <Button
            onClick={() => handleRejectRequest(userObj)}
            size="small"
            variant="contained"
            style={{ backgroundColor: "#f44336", color: "#ffffff" }}
          >
            Reject
          </Button>
        </div>
      );
    } else if (currentUserObj.sentRequests.find((uid) => uid === userObj.uid)) {
      return (
        <Button
          onClick={() => handleCancelRequest(userObj)}
          size="small"
          variant="contained"
          style={{ backgroundColor: "#ff9800", color: "#ffffff" }}
        >
          Cancel Request
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => handleSendRequest(userObj)}
          size="small"
          variant="contained"
          style={{ backgroundColor: "#4caf50", color: "#ffffff" }}
        >
          Add Friend
        </Button>
      );
    }
  };

  return (
    <div>
      <Modal className="friend-modal" open={show} onClose={handleClose}>
        <div className="friend-modal__container">
          <div className="friend-modal__closeButton" onClick={handleClose}>
            <CloseOutlined fontSize="small" />
          </div>
          <div className="friend-modal__title">{title}</div>
          <div className="friend-modal__subtitle">{subTitle}</div>

          {handleSearch && (
            <div className="friend-modal__search">
              <div className="friend-modal__searchContainer">
                <SearchOutlined />
                <input
                  placeholder={searchPlaceHolder}
                  type="text"
                  onChange={handleSearch}
                />
              </div>
            </div>
          )}

          <div className="friend-modal__results">
            {usersArr.map((userObj) => {
              return (
                <div className="friend-modal__userBlock" key={userObj.uid}>
                  <div className="friend-modal__userName">
                    <Avatar src={defaultAvatar} />
                    <div>{userObj.name}</div>
                  </div>
                  {actionBlock(userObj)}
                </div>
              );
            })}

            {hasMore ? (
              <Button
                className="friend-modal__loadMore"
                size="small"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Load more"
                )}
              </Button>
            ) : (
              "Thats all"
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FriendModal;
