import React, {Component} from "react";
import axios from './axios';

class EditProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo : this.props.userInfo,
            projectId : this.props.projectId,
            projectTitle : this.props.projectTitle,
            projectDescription : this.props.projectDescription,
            errorMessage : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.saveProjectChanges = this.saveProjectChanges.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.changeDateStyle = this.changeDateStyle.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value}, ()=>{
        });
    }

    changeDateStyle(date) {
        var d = new Date(date);
        var n = d.toLocaleString();
        return n;
    }

    async saveProjectChanges(e) {
        e.preventDefault();
        console.log("Save project info changes " , this.state);
        const { title, projectTitle, description, projectDescription, projectId } = this.state;
        if (!title  && !description) {
            this.setState({
                errorMessage : 'No Changes To Update'
            });
            setTimeout(
                function() {
                    this.setState({
                        errorMessage : ''
                    });
                }.bind(this),
                2000
            );
        }else {
            const results = await axios.post('/update-project', {projectId, title, projectTitle, description, projectDescription});
            console.log('project info changes are updated ', results.data.updatedProject);
            this.setState({
                errorMessage : 'Project Info is updated successfully'
            });
            setTimeout(
                function() {
                    this.setState({
                        errorMessage : ''
                    });
                }.bind(this),
                2000
            );
        }
    }

    async deleteProject(){
        await axios.post('/delete-project', {projectId : this.state.projectId});
        this.setState({
            errorMessage : 'Project is deleted successfully'
        });
        setTimeout(
            function() {
                this.props.showUserProjects();
            }.bind(this),
            2000
        );
    }

    async componentDidMount(){
        const projectTasks = await axios.post('/get-project-tasks', {projectId : this.props.projectId});
        console.log("Project tasks heeeeeeeeeeeeere ", projectTasks.data.projectTasks);
        this.setState({
            tasks : projectTasks.data.projectTasks
        });
    }

    render() {
        const { userInfo , projectId, projectTitle, projectDescription, tasks} = this.state;
        if (tasks) {
            var projectTasksDiv = (
                <div className="user-projects-div">
                    {tasks.map(task => (
                        <div className="project" key={task.id}>
                            <div className="project-info">
                                <div className="project-title">
                                    <h2>{task.title}</h2>
                                </div>
                                <div className="project-description">{task.done}</div>
                                <div className="project-created-at">
                                    <p>
            Created At: <br />
                                    </p>
                                    {this.changeDateStyle(task.created_at)}
                                </div>
                                <div className="button">
                                    <button type="button" className="edit-profile-button" onClick={this.saveProjectChanges}>
            Edit Task
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );

        }

        return (
            <div className="registration-div">
                <div>Edit Project Info </div>
                <form className="registration-form" onSubmit={this.saveProjectChanges}>

                    <div className="input-div">
                        <input
                            type="text"
                            name="title"
                            placeholder = {projectTitle}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-div">
                        <input
                            type="text"
                            name="description"
                            placeholder = {projectDescription}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-div">
                        <input type="submit" value="Save Changes" />
                    </div>
                    <div className="input-div">
                        <input type="button" value="Delete Project" onClick={this.deleteProject}/>
                    </div>
                    {this.state.errorMessage}
                </form>
                <div>Project Tasks </div>
                {projectTasksDiv}

            </div>
        );
    }
}

export default EditProject;
