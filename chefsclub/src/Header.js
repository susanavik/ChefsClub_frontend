import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

function Header() {
    return (
        <header class="nav-bar">
            <Link to='/myfeed'>
                <h3>My Feed</h3>
            </Link>
            <Link to='/profile'>
                <h3>Profile Page</h3>
            </Link>
            <Link to='/newpost'>
                <h3>New Post</h3>
            </Link>
        </header>
    )
}

export default Header;
