import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Button, Segment } from 'semantic-ui-react'

function Header() {
    return (
        <header className="nav-bar" attached='top'>
            <Button.Group className="header-btn">
                <Link to='/myfeed' className="one-header-btn">
                        <Button basic color='red' inverted >My Feed</Button>
                </Link>
                <Link to='/home' className="one-header-btn">
                    <Button  basic color='red' inverted>Profile Page</Button>
                </Link>
                <Link to='/newpost' className="one-header-btn">
                    <Button  basic color='red' inverted>New Post</Button>
                </Link>
                <Link to='/users' className="one-header-btn">
                    <Button  basic color='red' inverted>All Users</Button>
                </Link>
            </Button.Group>
        </header>
    )
}

export default Header;
