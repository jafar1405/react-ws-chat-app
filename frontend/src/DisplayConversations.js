import React from 'react';

function DisplayConversation(props){
    return(
        <div>
            {
                props.messages.map((message, index ) => (
                    <div key={index}> {message.username} : {message.message} </div>
                ))
            }
        </div>
    )
}

export default DisplayConversation;