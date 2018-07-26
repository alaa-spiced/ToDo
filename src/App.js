import React from 'react';
import Logo from './Logo';
import ProfilePic from './ProfilePic';
import axios from './axios';
import Uploader from './Uploader';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
    }

    showUploader() {
        this.setState({
            uploaderIsVisible : true
        });
    }

    setImage(url){
        this.setState({
            profilePic : url,
            uploaderIsVisible : false
        });
    }

    componentDidMount(){
        axios.get('/user').then((results)=>{
            console.log(results);
            this.setState({
                userId : results.data.id,
                firstName : results.data.first_name,
                lastName : results.data.last_name,
                profilePic : results.data.image_url || './images/default.png'
            });
        });
    }

    render() {
        if(!this.state.userId){
            return (
                <img src="./images/progressbar.gif"/>
            );
        }
        return (
            <div id="app">
                <Logo />
                <ProfilePic image={this.state.profilePic} first={this.state.firstName} last={this.state.lastName} clickHandler={this.showUploader} />
                {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}
            </div>
        );
    }
}

export default App;
