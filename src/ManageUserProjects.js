import React, { Component } from "react";
import axios from "./axios";

class ManageUserProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.userInfo,
            showProjectInfo: false
        };
        this.changeDateStyle = this.changeDateStyle.bind(this);
        this.toggleShowProjectInfo = this.toggleShowProjectInfo.bind(this);
    }

    changeDateStyle(date) {
        var d = new Date(date);
        var n = d.toLocaleString();
        return n;
    }

    toggleShowProjectInfo() {
        this.setState({
            showProjectInfo: !this.state.showProjectInfo
        });
    }

    async componentDidMount() {
        const projectsTasks = await axios.get("user-projects");
        console.log("projectsTasks are ", projectsTasks.data.projectsTasks);
        this.setState({
            projectsTasks: projectsTasks.data.projectsTasks
        });
    }

    render() {
        const { projectsTasks } = this.state;

        if (!projectsTasks) {
            return null;
        }

        var userProjectsDiv = (
            <div className="user-projects-div">
                {projectsTasks.map(project => (
                    <div className="project" key={project.id}>
                        <div className="project-info">
                            <div className="project-title">
                                <h2>{project.title}</h2>
                            </div>
                            <div className="project-description">{project.description}</div>
                            <div className="project-created-at">
                                <p>
                  Created At: <br />
                                </p>
                                {this.changeDateStyle(project.created_at)}
                            </div>
                            <div className="button">
                                <button type="button" className="edit-profile-button" onClick={()=> this.props.editProjectInfo(project.id, project.title, project.description)}>
                  Edit Project
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );

        return <div className="user-projects-div">{userProjectsDiv}</div>;
    }
}

export default ManageUserProjects;
