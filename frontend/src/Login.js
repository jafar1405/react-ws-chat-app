import React from 'react';

function Login(props){

    const login = (e) => {
        e.preventDefault()
        props.handleLogin(e.target.username.value)
    }
    return(
        <div id="login">
            <form onSubmit={login}>
                <label>User Name</label><br/>
                <input type="text" id="username"/><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;