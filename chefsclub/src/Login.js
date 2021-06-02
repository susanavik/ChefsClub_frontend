import React, {useState, useEffect} from 'react';
import {Redirect, Route, Link} from 'react-router-dom';
// import MyProfile from './Home'
import { Button, Segment, Image, Input, Label, Grid, GridColumn, Card, Form } from 'semantic-ui-react'



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

    {/* <div class="modal fade" id="modalLoginAvatar" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
  aria-hidden="true">
  <div class="modal-dialog cascading-modal modal-avatar modal-sm" role="document">
    <!--Content-->
    <div class="modal-content">

      <!--Header-->
      <div class="modal-header">
        <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20%281%29.jpg" alt="avatar" class="rounded-circle img-responsive">
      </div>
      <!--Body-->
      <div class="modal-body text-center mb-1">

        <h5 class="mt-1 mb-2">Maria Doe</h5>

        <div class="md-form ml-0 mr-0">
          <input type="password" type="text" id="form29" class="form-control form-control-sm validate ml-0">
          <label data-error="wrong" data-success="right" for="form29" class="ml-0">Enter password</label>
        </div>

        <div class="text-center mt-4">
          <button class="btn btn-cyan mt-1">Login <i class="fas fa-sign-in ml-1"></i></button>
        </div>
      </div>

    </div>
        
    </div>
    </div>

        <div class="text-center">
        <a href="" class="btn btn-default btn-rounded" data-toggle="modal" data-target="#modalLoginAvatar">Launch
            Modal Login with Avatar</a>
        </div> */}

    return (
        <div className="logincontainer">
            <iframe src="https://giphy.com/embed/WxMBQU7IS82Q0" 
            width="400" height="240" framBorder="0" className='giphy' allowFullScreen></iframe>
            <h3 className='login-title'>LOGIN HERE</h3>
            <Form onSubmit={HandleLogin}>
              <Form.Group widths='equal' inline>
                <Form.Input fluid label='USERNAME' placeholder='your username' className='login-input'/>
                <Form.Input fluid label='PASSWORD' placeholder='your password' className='login-input'/>
              </Form.Group>
              <Link to='/home'>
                <Form.Button color='red' className='login-button'>Let's get cookin</Form.Button>
              </Link>
            </Form>  
              
        </div>
      
    )
}

export default Login;