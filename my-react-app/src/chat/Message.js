import React, {Component} from 'react';

class Message extends Component{
  render() {
      return (
        <li>
          <div className="message">
              <strong>{this.props.user} :</strong> 
              <span>{this.props.text}</span>        
          </div>
        </li>
      );
  }
}

export default Message;