import React from 'react';
import DisplayConversation from './DisplayConversations';
import MessageBox from './MessageBox';

class MessagingPanel extends React.Component{

    state = {
        messages:[]
    }

    port = process.env.PORT || 8080;

    connection = new WebSocket(`ws://localhost:${this.port}`)

    componentDidMount(){
        this.connection.onmessage = (message) =>{
            const data = JSON.parse(message.data)
            this.setState({
                messages:[...this.state.messages, data]
            })
        }
    }

    getMessage = (message) => {
        console.log(this.props)
        const data = {
            username:this.props.username,
            message:message
        }
        this.connection.send(JSON.stringify(data))
    }
    render(){
        return(
            <>
                <DisplayConversation messages={this.state.messages}/>
                <MessageBox getMessage={this.getMessage}/>
            </>
        )
    }
}

export default MessagingPanel;