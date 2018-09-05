import React, { Component } from 'react';
import ProfilePic from './ProfilePic';
import Uploader from './Uploader';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        this.setState({ [e.target.name] : e.target.value }, ()=>{
            console.log(this.state);
        });

    }

    render() {
        const { firstName, lastName, profilePic, uploaderIsVisible, userBio, showBio, toggleShowBio, showUploader, setImage, setBio } = this.props;
        return (
            <div id="profile">
                <div className="profilePic-uploader">
                    <ProfilePic className="profile-profilepic" image={profilePic} first={firstName} last={lastName} clickHandler={showUploader} />
                    {uploaderIsVisible && <Uploader className="uploader" setImage={setImage} />}
                </div>
                <div className="bio-div">{userBio && <h5 className="user-bio">{userBio}</h5>}

                    { showBio
                        ? (<form onSubmit={()=>setBio(this.state.bioText)}><textarea className="bio-textarea" name="bioText" onChange={this.handleChange}></textarea> <input type="submit" value="submit" /></form>)
                        : <p onClick={ toggleShowBio } >Click to Edit a bio</p>
                    }
                </div>


            </div>
        );
    }
}

export default Profile;