import React, {useState, useEffect} from 'react';
import {Redirect, Route, Link} from 'react-router-dom';
import MyProfile from './Home'


function Login({recipes}) {

    const [username, setUsername] = useState("")
    const [submitting, setSubmitting] = useState(false)
    
    function HandleLogin(event) {
        // event.preventDefault()

        // if (username === "") {
        //     <Redirect to='/home' />
        // }

        setSubmitting(true)

        setTimeout(()=> {
            setSubmitting(false)
        }, 2000)
    }

    function handleChange(event) {
        setUsername({
            username: event.target.value
        })
    }
    console.log(username)

    return (
        <div className="logincontainer">
            <iframe src="https://giphy.com/embed/WxMBQU7IS82Q0" 
            width="400" height="240" framBorder="0" className='giphy' allowFullScreen></iframe>
            <h3>Please Log in</h3>
            <form onSubmit={HandleLogin}>
                <label>
                    <p>Username</p>
                </label>
                <input type="text" placeholder="my username" onChange={handleChange} />
                <Link to='/home'>
                    <button type="submit">Login</button>
                </Link>
            </form>
        </div>
    )
}

export default Login;