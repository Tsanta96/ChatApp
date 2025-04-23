import React, { useState, useRef } from "react";
import "./ActiveUsers.css";

import downArrowIcon from "../../icons/down-arrow.png";
import upArrowIcon from "../../icons/up-arrow.png";

const ActiveUsers = ({ users }) => {
  const [dropDownActive, setDropDownActive] = useState(false);
  const dropDownRef = useRef();

  const handleDropDown = () => {
    if (dropDownActive === false) setDropDownActive(true);
    else setDropDownActive(false);
  };

  return (
    <div className="usersContainer">
      <div className={"activeUsersHeader"} onClick={handleDropDown}>
        <img
          src={dropDownActive ? upArrowIcon : downArrowIcon}
          alt="Down Arrow Icon"
          className="downArrowIcon"
        />
        <h1 className="activeUsersHeaderText">Active Users</h1>
      </div>
      <div className="nameBox">
        <div
          className={dropDownActive ? "names" : "names hidden"}
          ref={dropDownRef}
          onClick={handleDropDown}
        >
          <div className="innerNameBox">
            {users.map((user, idx) => (
              <div key={idx}>
                {idx + 1} {user}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
