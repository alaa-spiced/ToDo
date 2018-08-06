import React, { Component } from 'react';
import ProfilePic from './ProfilePic';
import Uploader from './Uploader';
// import axios from './axios';
// import FriendshipButton from './FriendshipButton';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);

    }

    // componentDidMount(){
    //     axios.get('/friends-wannabes').then(({data}) =>{
    //         console.log(data.userFriendsAndWannabes);
    //         console.log(data.userFriendsAndWannabes.length);
    //     });
    // }

    handleChange(e){
        // textArea = e.target.value;
        this.setState({ [e.target.name] : e.target.value }, ()=>{
        });
    }

    render() {
        const { firstName, lastName, profilePic, uploaderIsVisible, userBio, showBio, toggleShowBio, showUploader, setImage, setBio } = this.props;
        return (
            <div id="profile">
                <h1>Profile</h1>
                <ProfilePic image={profilePic} first={firstName} last={lastName} clickHandler={showUploader} />;
                {uploaderIsVisible && <Uploader setImage={setImage} />}

                <p>{ firstName } { lastName }</p>
                {userBio && <p>{userBio}</p>}
                { showBio
                    ? (<form onSubmit={()=>setBio(this.state.bioText)}><textarea name="bioText" onChange={this.handleChange}></textarea> <input type="submit" value="submit" /></form>)
                    : <p onClick={ toggleShowBio } >Click to Edit a bio</p>
                }

            </div>
        );
    }
}

export default Profile;
