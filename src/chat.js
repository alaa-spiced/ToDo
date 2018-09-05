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
            <div className="main-chat-div">
                <h1>Chat</h1>
                <div className="chatMessages">
                    {chatMsgs.map(message => (
                        <div key={message.date} className="message">

                            <div className='userName'>
                                <img src={message.profilePic || '/images/default.png'}/>
                                {message.firstName} {message.lastName} wrote: <br></br><p>{message.content}</p></div>

                        </div>
                    ))}

                </div>
            </div>
        );

        return (
            <div className="chatDiv">
                <div id="main-chat-area">
                    {chatDiv}
                </div><br></br>
                <form className="submit-area" onSubmit={ this.handleSubmitTextarea } >
                    <textarea id="chatTextArea" name="chatMessage" onChange={ this.handleChangeTextarea }></textarea>
                    <button id="submit-message" type="submit">Send Message</button>
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
