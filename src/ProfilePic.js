import React from 'react';

function ProfilePic ({image, first, last, clickHandler}) {
    return (<img src={image} onClick={clickHandler} />);
}


export default ProfilePic;


//
//
// function ProfilePic(props) {
//     return `<img src={props.image}
// alt=""
// onClick={props.showUploader}
// />
// `;
// }
