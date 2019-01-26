import React, { Component } from 'react';
import './App.css';

import ChatInput from './ChatInput';
import History from "./History";
import DialogList from "./DialogList";
import LoginForm from "./LoginForm";

import io from 'socket.io-client'; 

const socket = io('https://try-react-nozimy.c9users.io:8081');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      history: [],
      roster: [],
      loggedIn: false,
      user: {name: ''}
    };
    
    this.onMessageInputChanged = this.onMessageInputChanged.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.login = this.login.bind(this);
    
    this._messageRecieve = this._messageRecieve.bind(this);
    this._userRosterRecieve = this._userRosterRecieve.bind(this);
    
    this.addDialogHistory = this.addDialogHistory.bind(this);
    this.scrollToBottom  = this.scrollToBottom .bind(this);
  }
  
  componentWillUnmount(){
      this.setState({loggedIn: false, user: {name:''}});
  }
  componentDidMount() {
    socket.on('message', this._messageRecieve);
    socket.on('roster', this._userRosterRecieve);
  }
  
  _messageRecieve(data){
    this.addDialogHistory(data);
  }
  _userRosterRecieve(onlineUsers){
    console.log(onlineUsers);
    this.setState({roster: onlineUsers});
  }
  
  onMessageInputChanged(value){
    this.setState(prevState => ({
            message: value
        }));
  }
  sendMessage(){
    let {message} = this.state;
    if (message.trim()){
      let messageData = {
        name: this.state.user.name,
        text: message
      }
      this.addDialogHistory(messageData);
      socket.emit('message', messageData.text);
    }
    this.setState(prevState => ({
              message: ''
          }));
  }
  
  addDialogHistory(messageData){
    let {history} = this.state;
    history.push(messageData);
    this.setState({history});
    
    this.scrollToBottom();
  }
  
  login(userName) {
    let name = String(userName || '');
    if (!name)
        return;
    let user = {name: name};
    socket.emit('identify', name);
    this.setState({
      loggedIn: true,
      user: user
    });
  }
  
  //scroll when added new message  
  //https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up
  scrollToBottom (elem){
    // let out = elem;
        
    // // allow 1px inaccuracy by adding 1
    // let isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
    // console.log(out.scrollHeight - out.clientHeight,  out.scrollTop + 1);
    // console.log(isScrolledToBottom);
  
    // // scroll to bottom if isScrolledToBottom
    // if(isScrolledToBottom)
    //   out.scrollTop = out.scrollHeight - out.clientHeight;
  }
  
  render() {
    return (
      <div className="App">
        <div className="clearfix">
        <DialogList 
          onlineUsers={this.state.roster}
        />
        <div className="rightBlock">
          <History
            messages={this.state.history}
          />
          <ChatInput 
            message={this.state.message}
            onMessageInputChanged={this.onMessageInputChanged}
            handleSubmit={this.sendMessage}
          />
        </div>
      </div>
        
        <LoginForm 
          handleSubmit={this.login}
          loggedIn={this.state.loggedIn}
        />
      </div>
    );
  }
}

export default App;
