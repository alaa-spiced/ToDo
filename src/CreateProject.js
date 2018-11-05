import React, {Component} from "react";
import axios from './axios';

class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createProjectMessage : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value}, ()=>{
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { title,  description } = this.state;
        if (!title || !description) {
            this.setState({
                createProjectMessage : 'Please Fill In The Whole Fields'
            });
        }else {
            await axios.post('/create-project', this.state);
            this.setState({
                createProjectMessage : 'Project is created successfully'
            });
            setTimeout(
                function() {
                    this.setState({
                        createProjectMessage : ''
                    });
                    this.props.showUserProjects();
                }.bind(this),
                3000
            );
        }
    }

    render() {

        return (
            <div className="registration-div">
                <form className="registration-form" onSubmit={this.handleSubmit}>
                    <div className="input-div">
                        <input
                            type="text"
                            name="title"
                            placeholder="Project Title"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="input-div">

                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="input-div">
                        <input type="submit" value="Create Project" />
                    </div>
                </form>
                {this.state.createProjectMessage}

            </div>
        );
    }
}

export default CreateProject;
