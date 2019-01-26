import React, {Component} from 'react';
import './LoginForm.css';

class LoginForm extends Component{
    
    constructor(props) {
        super(props);
        
        this.state = {userName: ''};
        
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e) {
        e.persist();
        
        this.setState({userName: e.target.value});
        
        e.preventDefault();
    }
    handleClick(e) {
        e.preventDefault();
        this.props.handleSubmit(this.state.userName.trim());
        this.setState({userName: ""});
    }
    
    render() {
        const userName = this.state.userName;
        return (
        <div className="LoginForm" style={{display: this.props.loggedIn ? 'none' : 'block' }}>
            <form id="login-form" action="">
                <input id="login--name" type="text" autoComplete="off" value={userName} onChange={this.handleChange} placeholder="Ваше имя" />
                <button onClick={this.handleClick}>Войти</button>
            </form>
        </div>
        );
    }
}

export default LoginForm;