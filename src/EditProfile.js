import React, {Component} from "react";


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo : this.props.userInfo,
            showProfileIsUpdatedMessage : this.props.showProfileIsUpdatedMessage
        };
        this.handleInfoChange = this.handleInfoChange.bind(this);

    }

    handleInfoChange(e){
        this.setState({ [e.target.name] : e.target.value }, ()=>{
            console.log(this.state);
        });
    }

    render() {
        const { userInfo, showProfileIsUpdatedMessage} = this.state;
        return (
            <div className="registration-div">
                <form className="registration-form" onSubmit={(event)=>this.props.updateProfile(event, this.state)}>
                    <div className="input-div">
                        <input
                            className="all-inputs"
                            type="text"
                            name="firstname"
                            placeholder={userInfo.first_name}
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            className="all-inputs"
                            type="text"
                            name="lastname"
                            placeholder={userInfo.last_name}
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            className="all-inputs"
                            type="text"
                            name="gender"
                            title=" Enter Your Gender "
                            placeholder={userInfo.gender || 'Gender'}
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            className="all-inputs"
                            type="text"
                            name="phonenumber"
                            title=" Enter Your Phone Number "
                            placeholder={userInfo.phone_number || 'Phone Number'}
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            className="all-inputs"
                            type="email"
                            name="email"
                            placeholder={userInfo.email}
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">

                        <input
                            className="all-inputs"
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleInfoChange}
                        />
                    </div>
                    <div className="input-div">
                        <input className="all-inputs" type="submit" value="Save" />
                    </div>
                    {showProfileIsUpdatedMessage && <div className="profile-updated">
                        {showProfileIsUpdatedMessage}
                    </div>}
                </form>
            </div>
        );
    }
}

export default EditProfile;
