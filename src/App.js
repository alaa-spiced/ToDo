import React from 'react';
import { BrowserRouter , Route} from 'react-router-dom';
import Logo from './Logo';
import axios from './axios';
import Profile from './Profile';
import Uploader from './Uploader';
import ProfilePic from './ProfilePic';
import OtherUserProfile from './OtherUserProfile';
import Friends from './Friends';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showBio: false,
            uploaderIsVisible : false
        };
        this.showUploader = this.showUploader.bind(this);
        this.setImage = this.setImage.bind(this);
        this.toggleShowBio = this.toggleShowBio.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    showUploader() {
        this.setState({
            uploaderIsVisible : !this.state.uploaderIsVisible
        });
    }

    setImage(url){
        this.setState({
            profilePic : url,
            uploaderIsVisible : false
        });
    }

    toggleShowBio() {
        this.setState({
            showBio: !this.state.showBio
        });
    }

    setBio(bioText){
        axios.post('/user-bio',{bioText}).then((results)=>{
            console.log(results);
            this.setState({
                showBio : false
            });
        });
    }

    componentDidMount(){
        axios.get('/user').then((results)=>{
            this.setState({
                userId : results.data.id,
                firstName : results.data.first_name,
                lastName : results.data.last_name,
                profilePic : results.data.image_url || './images/default.jpg',
                bio : results.data.bio
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
                <Logo first={this.state.firstName} last={this.state.lastName}/>
                <ProfilePic image={this.state.profilePic} first={this.state.firstName} last={this.state.lastName} clickHandler={this.showUploader} />;
                {this.state.uploaderIsVisible && <Uploader setImage={this.setImage} />}

                <BrowserRouter>
                    <div>
                        <Route path="/profile" render={() => (
                            <Profile
                                firstName={ this.state.firstName }
                                lastName={ this.state.lastName }
                                userId={ this.state.userId }
                                profilePic={ this.state.profilePic }
                                showBio={ this.state.showBio }
                                uploaderIsVisible = {this.state.uploaderIsVisible}
                                userBio={this.state.bio}
                                toggleShowBio={ this.toggleShowBio }
                                showUploader ={this.showUploader}
                                setImage = {this.setImage}
                                setBio = {this.setBio}
                            />
                        )} />
                        <Route path="/user/:id" component={OtherUserProfile} />
                        <Route path="/friends" component={Friends} />
                    </div>
                </BrowserRouter>
            </div>
        );

    }
}

export default App;
