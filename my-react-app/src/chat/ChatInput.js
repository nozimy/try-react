import React, {Component} from 'react';
import "./ChatInput.css";

class ChatInput extends Component{
    
    constructor(props) {
        super(props);
        
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        e.persist();
        this.props.onMessageInputChanged(e.target.value);
        e.preventDefault();
    }
    handleClick(e) {
        e.preventDefault();
        
        this.props.handleSubmit();
    }
    
    render() {
        const message = this.props.message;
        return (<div className="ChatInput">
        <form id="chat-input-form" action="">
            <input id="chat-input--text" type="text" autoComplete="off" value={message} onChange={this.handleChange} />
            <button onClick={this.handleClick}>Отправить</button>
        </form>
        </div>);
    }
}

export default ChatInput;