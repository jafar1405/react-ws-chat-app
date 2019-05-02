import React from 'react';

function MessageBox(props){

    const message = (e) => {
        if(e.keyCode === 13){
            e.preventDefault()
            props.getMessage(e.target.value)
            e.target.value = ""
        }
    }
    return(
        <div>
            <textarea onKeyDown={message}></textarea>
        </div>
    )
}

export default MessageBox;