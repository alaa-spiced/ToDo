import React from 'react';
import { connect } from 'react-redux';
import { newMessageSocket } from'./socket';

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
        this.handleSubmitTextarea = this.handleSubmitTextarea.bind(this);
    }
    handleChangeTextarea(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {}
        );
    }
    handleSubmitTextarea(e) {
        e.preventDefault();
        newMessageSocket(this.state.chatMessage);
        document.getElementById('chatTextArea').value = '';
    }

    render() {
        const { chatMessages } = this.props;
        if (!chatMessages) {
            return null;
        }
        let chatMsgs = chatMessages.slice(-10,);
        const chatDiv = (
            <div>
                <h1>Chat</h1>
                <div className="chatMessages">
                    {chatMsgs.map(message => (
                        <div key={message.date} className="message">
                            <img className="profile-pic-chat" src={message.profilePic || '/images/default.png'}/> {message.date}
                            <div className='userName'>{message.firstName} {message.lastName}</div>
                            <div className='message-content'>{message.content}</div>
                        </div>
                    ))}

                </div>
            </div>
        );

        return (
            <div>
                <div id="chat">
                    {chatDiv}
                </div><br></br>
                <form onSubmit={ this.handleSubmitTextarea } >
                    <textarea id="chatTextArea" name="chatMessage" onChange={ this.handleChangeTextarea }></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        );
    }
}
export default connect(state => {
    return {
        chatMessages: state.chatMessages,
    };
})(Chat);
