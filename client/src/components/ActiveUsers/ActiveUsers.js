import React, { useState, useEffect, useRef } from 'react';
import './ActiveUsers.css';

import downArrowIcon from '../../icons/down-arrow.png';
import upArrowIcon from '../../icons/up-arrow.png';

const ActiveUsers = ({ users }) => {
    const [dropDownActive, setDropDownActive] = useState(false);
    const dropDownRef = useRef();
    const animatedNode = dropDownRef.current;

    // if (animatedNode) {
    //     animatedNode.addEventListener("animationstart", () => {
    //         console.log("animation started")
    //     });
    //     animatedNode.addEventListener("animationend", () => {
    //         console.log("animation ended");
    //     })
    // }

    useEffect(() => {
        // if (animatedNode) {
        //     animatedNode.addEventListener("animationstart", () => {
        //         console.log("animation started")
        //     });
        //     animatedNode.addEventListener("animationend", () => {
        //         console.log("animation ended");
        //         // console.log(animatedNode.classList.add("hidden"))
        //     })
        // }
        // return () => {
        //     animatedNode.removeEventListener("animationstart");
        //     animatedNode.removeEventListener("animationend");
        // }
    })
    

    useEffect(() => {
        console.log(dropDownRef.current);
    }, [dropDownActive])

    const handleDropDown = () => {
        console.log("hello");
        if (dropDownActive == false) {
            setDropDownActive(true);
            console.log("Drop down -> ", dropDownActive);
        } else {
            setDropDownActive(false);
            console.log("Drop down -> ", dropDownActive);
        }
    }

    if (dropDownActive === true) {

    }

    return (
        <div className="usersContainer">
            <div 
                className={"activeUsersHeader"}
                onClick={handleDropDown}
                >
                <img 
                    src = {
                        dropDownActive ? upArrowIcon : downArrowIcon 
                    }
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
                    <div className="innerNameBox" >
                        {users.map((user, idx) => (
                            <div key={idx}>{idx+1} {user}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActiveUsers;