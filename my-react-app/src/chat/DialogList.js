import React, {Component} from 'react';
import './DialogList.css'
import UserCard from './UserCard';

class DialogList extends Component {
    
    render(){
        const onlineUsers = this.props.onlineUsers;
        return (
            <div className="DialogList">
                
                    {
                        onlineUsers.map((user, i) => {
                        return (
                        <UserCard
                            key={i}
                            username={user.name}
                            />
                        )
                        })
                    }
                
            </div>
            
        );
    }
}

export default DialogList;