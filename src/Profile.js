import React, { Component } from 'react';
import ProfilePic from './ProfilePic';
import Uploader from './Uploader';
import axios from './axios';
import FriendshipButton from './FriendshipButton';

class Profile extends Component {

    constructor(props) {
        super(props);
        var textArea = "";
        this.state = {};
        this.handleChange = this.handleChange.bind(this);

    }

    // componentDidMount() {
    //     axios.get('/user-friendship').then((resp)=>{
    //         console.log('resp');
    //         if (resp.data.results == 0) {
    //             this.setState({
    //                 friendshipStatus : 0
    //             });
    //         }else {
    //             console.log(resp.data);
    //             this.setState({
    //                 friendshipStatus : resp.data.status,
    //                 senderId : resp.data.sender_id
    //             });
    //         }
    //
    //     });
    // }

    handleChange(e){
        // textArea = e.target.value;
        this.setState({ [e.target.name] : e.target.value }, ()=>{
            console.log(this.state);
        });
    }

    render() {
        const { firstName, lastName, userId, profilePic, uploaderIsVisible, showBio, toggleShowBio, showUploader, setImage, setBio } = this.props;
        return (
            <div id="profile">
                <h1>Profile</h1>
                <ProfilePic image={profilePic} first={firstName} last={lastName} clickHandler={showUploader} />;
                {uploaderIsVisible && <Uploader setImage={setImage} />}

                <p>{ firstName } { lastName }</p>

                { showBio
                    ? (<form onSubmit={()=>setBio(this.state.bioText)}><textarea name="bioText" onChange={this.handleChange}></textarea> <input type="submit" value="submit" /></form>)
                    : <p onClick={ toggleShowBio } >Click to add a bio</p>
                }

            </div>
        );
    }
}

export default Profile;
