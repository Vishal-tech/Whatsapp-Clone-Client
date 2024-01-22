import React, { useRef } from "react";
import "./AddFrd_Modal.css";

import { useAuth } from "../../auth/AuthContext";

const Modal = ({ handleClose, show }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const secretCode = useRef();

  const { currentUser } = useAuth();

  const handleAddFrd = (e) => {
    // e.preventDefault();
    // axios
    //   .get("/getUser", { params: { uid: secretCode.current.value } })
    //   .then((userRecord) => {
    //     userRecord.data.map((user) => {
    //       console.log(`Successfully fetched user data: ${user.full_name}`);
    //       axios
    //         .post("/friend/new", {
    //           current_user: currentUser,
    //           frd: user,
    //         })
    //         .then((data) => {
    //           console.log(data);
    //           handleClose();
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("Error fetching user data:", error);
    //   });
  };
  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <form id="secretcode_form" onSubmit={(e) => handleAddFrd(e)}>
          <h2>Add friend</h2>
          <br />
          <label>
            Your Friend's Secret code
            <br />
            <input ref={secretCode} className="secret_code" type="text" />
          </label>
          <br />
          <button className="modal_buttons add" type="submit">
            Add friend
          </button>
          <button
            className="modal_buttons close"
            type="button"
            onClick={handleClose}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
