import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import "./History.css";
import Message from './Message';
import ActionBar from './ActionBar';

class History extends Component{
    constructor(props){
        super(props);
        
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.onDivMount = this.onDivMount.bind(this);
    }
    
    // scrollToBottom = () => {
    //   const node = ReactDOM.findDOMNode(this.messagesEnd);
    //   node.scrollIntoView({ behavior: "smooth" });
    // }
    
    componentDidMount() {
      this.scrollToBottom();
    }
    
    componentDidUpdate() {
      this.scrollToBottom();
    }
    
    scrollToBottom (){
        let out = this.refs.messagesHistoryWrapper;
        
        // allow 1px inaccuracy by adding 1
        let isScrolledToBottom = out.scrollHeight - out.clientHeight <= out.scrollTop + 1;
        console.log(out.scrollHeight - out.clientHeight,  out.scrollTop + 1);
        console.log(isScrolledToBottom);
      
        // scroll to bottom if isScrolledToBottom
        if(isScrolledToBottom)
          out.scrollTop = out.scrollHeight - out.clientHeight;
    }
    
    onDivMount = (node) => this.messagesHistoryWrapper = node
    
    render(){
        const messagesData = this.props.messages;
        return (
            <div id="Messages-History"
                ref= "messagesHistoryWrapper"
            >
                <ActionBar />
                <ul id="messages">
                {
                    messagesData.map((data, i) => {
                        return (
                            <Message 
                            key={i}
                            user={data.name}
                            text={data.text}
                            />
                        )
                    })
                }
                </ul>
                
                {
                // <div style={{ float:"left", clear: "both" }}
                //     ref={(el) => { this.messagesEnd = el; }}>
                // </div>
                }
            </div>
            );
    }
}

export default History;