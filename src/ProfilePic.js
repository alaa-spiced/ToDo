import React from 'react';

function ProfilePic ({image, first, last, clickHandler}) {
    return (
        <div className="profilepic-container">
            <img className="profile-profilepic" src={image} onClick={clickHandler} />
            <h1 className="user-name-profile">{first}{" "}{last}</h1>
        </div>
    );
}


export default ProfilePic;
