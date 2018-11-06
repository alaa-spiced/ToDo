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
            errorMessage : '',
            showAddTaskDiv: false,
            showEditTaskDiv : false,
            taskDoneIsChecked : false,
            editTaskError : ''
        };
        this.showElement = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.saveProjectChanges = this.saveProjectChanges.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.changeDateStyle = this.changeDateStyle.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.toggleAddTask = this.toggleAddTask.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.toggleEditTask = this.toggleEditTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.handleEditTaskChecked = this.handleEditTaskChecked.bind(this);

    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value}, ()=>{});
    }

    handleChecked(){
        this.setState({
            taskDoneIsChecked : !this.state.taskDoneIsChecked
        },()=>{});
    }

    handleEditTaskChecked(){
        var cb = document.getElementById('edit-task-checkbox');
        if (cb.checked) {
            this.setState({
                task_done : true
            },()=>{});
        }else {
            this.setState({
                task_done : false
            },()=>{});
        }
    }

    changeDateStyle(date) {
        var d = new Date(date);
        var n = d.toLocaleString();
        return n;
    }

    async saveProjectChanges(e) {
        e.preventDefault();
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
            await axios.post('/update-project', {projectId, title, projectTitle, description, projectDescription});
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

    toggleAddTask(){
        this.setState({
            showAddTaskDiv : !this.state.showAddTaskDiv
        });
    }

    async saveTask(e){
        e.preventDefault();
        if (!this.state.task_title) {
            this.setState({
                errorMessage : 'Please add a task title'
            });
            setTimeout(
                function() {
                    this.setState({
                        errorMessage : ''
                    });
                }.bind(this),
                1500
            );
        }else {
            const addedTask = await axios.post('/add-task', {projectId : this.state.projectId, taskTitle : this.state.task_title, done : this.state.taskDoneIsChecked});

            var allTasks = this.state.tasks;
            allTasks.unshift(addedTask.data.addedTask);
            this.setState({
                tasks : allTasks,
                errorMessage : 'Task is added successfully'
            });

            setTimeout(
                function() {
                    this.setState({
                        errorMessage : ''
                    });
                    this.toggleAddTask();
                }.bind(this),
                1500
            );
        }
    }

    async editTask(){
        const editedTask = await axios.post('/update-task', {taskId : this.state.taskId, taskTitle : this.state.task_title || this.state.editTaskTitle, taskDone : this.state.task_done || this.state.taskDoneIsChecked});

        setTimeout(
            function() {
                var allTasks = this.state.tasks.filter((task)=>{
                    if (task.id != editedTask.data.updatedTask.id) {
                        return task;
                    }});
                allTasks.unshift(editedTask.data.updatedTask);
                this.setState({
                    tasks : allTasks,
                    showEditTaskDiv : !this.state.showEditTaskDiv
                });
            }.bind(this),
            1500
        );
    }

    toggleEditTask(taskId){
        this.setState({
            showEditTaskDiv : !this.state.showEditTaskDiv
        });
        var bottom = document.getElementsByClassName("user-projects-div")[0];

        setTimeout(
            function() {
                if (this.state.showEditTaskDiv) {
                    bottom.scrollTo(0,bottom.scrollHeight+this.showElement.current.scrollHeight);
                    this.setState({
                        taskId : taskId
                    });
                    this.state.tasks.filter((task)=>{
                        if (task.id == this.state.taskId) {
                            this.setState({
                                editTaskTitle : task.title
                            });
                            var cb = document.getElementById('edit-task-checkbox');
                            if (task.done) {
                                cb.checked = true;
                            }else {
                                cb.checked = false;
                            }
                        }
                    });
                }
            }.bind(this),
            100
        );
    }

    async deleteTask(taskId){
        var allTasks = this.state.tasks;
        await axios.post('/delete-task', {taskId});
        allTasks = allTasks.filter((task)=>{
            if (task.id != taskId) {
                return task;
            }
        });
        this.setState({
            tasks : allTasks
        });
    }

    async componentDidMount(){
        const projectTasks = await axios.post('/get-project-tasks', {projectId : this.props.projectId});
        this.setState({
            tasks : projectTasks.data.projectTasks
        });
    }

    render() {
        const {projectTitle, projectDescription, tasks} = this.state;
        if (tasks) {
            var projectTasksDiv = (
                <div className="user-projects-div">
                    {tasks.map(task => (
                        <div className="project" key={task.id}>
                            <div className="project-info">
                                <div className="project-title">
                                    <h2>{task.title}</h2>
                                </div>
                                <div className="project-description">{task.done && <div>Done</div> || <div>Not Done Yet</div>}</div>

                                <div className="project-title">
                                    <h2>{task.deadLine}</h2>
                                </div>

                                <div className="project-created-at">
                                    <p>
            Created At: <br />
                                    </p>
                                    {this.changeDateStyle(task.created_at)}
                                </div>

                                <div className="button">
                                    <button type="button" className="edit-profile-button" onClick={()=>this.toggleEditTask(task.id)}>
            Edit Task
                                    </button>
                                </div>
                                <div className="button">
                                    <button type="button" className="edit-profile-button" onClick={()=>this.deleteTask(task.id)}>
            Delete Task
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}




                    {this.state.showEditTaskDiv && <div className="task-div" ref={this.showElement}>
                        <form className="task-form" >
                            <div className="input-div">
                                <input
                                    className="all-inputs"
                                    type="text"
                                    name="task_title"
                                    placeholder = {this.state.editTaskTitle}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-div">
                                Done <input  id="edit-task-checkbox" type="checkbox"  name="task_done" onChange={this.handleEditTaskChecked} />
                            </div>
                            <div className="button">
                                <button type="button" className="edit-profile-button" onClick={()=>this.editTask()}>
                  Save Task
                                </button>
                            </div>

                        </form>
                    </div>}




                </div>
            );

        }

        return (
            <div className="project-div">
                <div>Edit Project Info </div>
                <form className="project-form " onSubmit={this.saveProjectChanges}>

                    <div className="input-div">
                        <input
                            className="all-inputs"
                            type="text"
                            name="title"
                            placeholder = {projectTitle}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-div">
                        <input
                            className="all-inputs"
                            type="text"
                            name="description"
                            placeholder = {projectDescription}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-div">
                        <input className="all-inputs" type="submit" value="Save Changes" />
                    </div>
                    <div className="input-div">
                        <input className="all-inputs" type="button" value="Delete Project" onClick={this.deleteProject}/>
                    </div>
                    <div className="input-div">
                        <input className="all-inputs" type="button" value="Add Task" onClick={this.toggleAddTask}/>
                    </div>
                    {this.state.errorMessage}
                </form>
                {this.state.showAddTaskDiv && <div className="task-div">
                    <form className="task-form" onSubmit={this.adTask}>
                        <div className="input-div">
                            <input
                                className="all-inputs"
                                type="text"
                                name="task_title"
                                placeholder = "Title"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-div">
                            Done <input  type="checkbox" name="task_done" onChange={this.handleChecked} />
                        </div>
                        <div className="button">
                            <button type="button" className="edit-profile-button" onClick={this.saveTask}>
              Save Task
                            </button>
                        </div>

                    </form>
                </div>}
                <div className="project-tasks-text">Project Tasks </div>
                {projectTasksDiv}
                {this.state.errorMessage}
            </div>
        );
    }
}

export default EditProject;
