import React from 'react';
import DisplayConversation from './DisplayConversations';
import MessageBox from './MessageBox';

class MessagingPanel extends React.Component{

    state = {
        messages:[]
    }

   

    connection = new WebSocket(window.location.origin.replace(/^http/, 'ws'))
    

    componentDidMount(){
        console.log(this.connection)
        this.connection.onmessage = (message) =>{
            console.log(message)
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
        this.connection.onopen = () => {
            this.connection.send(JSON.stringify(data))
        }
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