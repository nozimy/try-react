import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

//import { Router, browserHistory } from 'react-router';
//import routes from './routes';  
//import { Provider } from 'react-redux';
import App from './chat/App';

//import configureStore from './store/configureStore';
//const store = configureStore()
//http://www.thegreatcodeadventure.com/real-time-react-with-socket-io-building-a-pair-programming-app/

// Here are some ideas to improve the application:

// done - Broadcast a message to connected users when someone connects or disconnects
// done - Add support for nicknames
// done - Don’t send the same message to the user that sent it himself. Instead, append the message directly as soon as he presses enter.
//        Add “{user} is typing” functionality
// done - Show who’s online
//        Add private messaging
//Share your improvements!
//http://danialk.github.io/blog/2013/06/16/reactjs-and-socket-dot-io-chat-application/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
 
registerServiceWorker();