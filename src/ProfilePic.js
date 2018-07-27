import React from 'react';

function ProfilePic ({image, first, last, clickHandler}) {
    return (
        <div className="profilepic-container">
            <div > <img className="profilepic" src={image} onClick={clickHandler} /></div>
            <p>{first}{" "}{last}</p>
        </div>
    );
}


export default ProfilePic;
