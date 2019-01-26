import React, {Component} from 'react';
import './UserCard.css';

class UserCard extends Component {
    render(){
        return (
            <div className="UserCard">
                <strong>{this.props.username}</strong> 
            </div>
        );
    }
}

export default UserCard;