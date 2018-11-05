import React, { Component } from "react";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import EditProfile from "./EditProfile";
import EditProject from "./EditProject";
import CreateProject from "./CreateProject";
import ManageUserProjects from "./ManageUserProjects";

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(" User Info Profile ", this.props.userInfo);
        this.state = {
            userInfo: this.props.userInfo,
            showProfileIsUpdatedMessage: "",
            uploaderIsVisible: false,
            editProfile: true,
            editProject:false,
            createProject: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.editProjectInfo = this.editProjectInfo.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.showUserProjects = this.showUserProjects.bind(this);
        this.logout = this.logout.bind(this);
        this.createProject = this.createProject.bind(this);
    }

    async updateProfile(e, profileUpdatedInfo) {
        e.preventDefault();
        if (
            profileUpdatedInfo.firstname ||
      profileUpdatedInfo.lastname ||
      profileUpdatedInfo.gender ||
      profileUpdatedInfo.phonenumber ||
      profileUpdatedInfo.email ||
      profileUpdatedInfo.password
        ) {
            const results = await axios.post("/update-user-info", profileUpdatedInfo);
            this.setState({
                userInfo: results.data,
                showProfileIsUpdatedMessage: "Udpated Successfully",
                editProfile: false
            });
            if (profileUpdatedInfo.password) {
                this.logout();
            }
            this.setState({
                editProfile: true
            });
            setTimeout(
                function() {
                    this.setState({
                        showProfileIsUpdatedMessage: "",
                        editProfile: false
                    });
                }.bind(this),
                5000
            );
            setTimeout(
                function() {
                    this.setState({
                        editProfile: true
                    });
                }.bind(this),
                5001
            );
        } else {
            this.setState({
                showProfileIsUpdatedMessage: "Nothing Changed To Update!",
                editProfile: false
            });
            setTimeout(
                function() {
                    this.setState({ editProfile: true });
                }.bind(this),
                0.0001
            );
            setTimeout(
                function() {
                    this.setState({
                        showProfileIsUpdatedMessage: "",
                        editProfile: false
                    });
                }.bind(this),
                5000
            );
            setTimeout(
                function() {
                    this.setState({
                        editProfile: true
                    });
                }.bind(this),
                5001
            );
        }
    }

    async logout() {
        await axios.get("/logout");
        location.replace("/welcome");
    }

    showUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
    }

    setImage(url) {
        this.setState({
            profilePic: url,
            uploaderIsVisible: false
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {});
    }

    editProfile() {
        this.setState({
            createProject: false,
            manageProjects: false,
            editProject : false,
            editProfile: !this.state.editProfile
        });
    }

    editProjectInfo(projectId, projectTitle, projectDescription) {
        this.setState({
            projectId : projectId,
            projectTitle : projectTitle,
            projectDescription : projectDescription,
            createProject: false,
            manageProjects: false,
            editProfile : false,
            editProject: !this.state.editProject
        });
    }

    showUserProjects() {
        console.log("Show User Projects ");
        this.setState({
            editProfile: false,
            editProject : false,
            createProject: false,
            manageProjects: !this.state.manageProjects
        });
    }

    createProject() {
        console.log("Creating Project");
        this.setState({
            editProfile: false,
            manageProjects: false,
            editProject : false,
            createProject: !this.state.createProject
        });
    }

    componentDidMount() {
        this.setState({
            profilePic: this.props.userInfo.image_url || "/images/default.jpg",
            userInfo: this.props.userInfo,
            showProfileIsUpdatedMessage: this.state.showProfileIsUpdatedMessage
        });
    }

    render() {
        const { userInfo, showProfileIsUpdatedMessage, profilePic,editProject, projectId, projectTitle, projectDescription } = this.state;
        return (
            <div className="profile-page">
                <div id="profile">
                    <ProfilePic
                        className="profile-profilepic"
                        image={profilePic}
                        first={userInfo.first_name}
                        last={userInfo.last_name}
                        gender={userInfo.gender}
                        phoneNumber={userInfo.phone_number}
                        email={userInfo.email}
                        clickHandler={this.showUploader}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader className="uploader" setImage={this.setImage} />
                    )}

                    <button className="edit-profile-button" onClick={this.editProfile}>
            Edit Profile
                    </button>

                    <button
                        className="edit-profile-button"
                        onClick={this.showUserProjects}
                    >
            Manage Your Projects
                    </button>

                    <button className="edit-profile-button" onClick={this.createProject}>
            Create Project
                    </button>

                    <button className="edit-profile-button" onClick={this.logout}>
            Log Out
                    </button>
                </div>
                <div className="edit-profile">
                    {this.state.editProfile && (
                        <EditProfile
                            userInfo={userInfo}
                            updateProfile={this.updateProfile}
                            showProfileIsUpdatedMessage={showProfileIsUpdatedMessage}
                            handleInfoChange={this.handleInfoChange}
                            logout={this.logout}
                        />
                    )}
                    {this.state.createProject && (
                        <CreateProject
                            createProject={this.createProject}
                            showUserProjects={this.showUserProjects}
                        />
                    )}
                    {this.state.manageProjects && (
                        <ManageUserProjects userInfo={userInfo} editProjectInfo={this.editProjectInfo}/>
                    )}

                    {this.state.editProject && (
                        <EditProject userInfo={userInfo} projectId={projectId} projectTitle={projectTitle} projectDescription={projectDescription} showUserProjects={this.showUserProjects}/>
                    )}
                </div>
            </div>
        );
    }
}

export default Profile;
