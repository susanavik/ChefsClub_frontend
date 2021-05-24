import React, {useState} from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';

function PostDetails({id, name, time, image, instructions, user, recipe_ingredients}) {
    

    return (
        <div className="image">
            <Link to="/home"> 
                <span>✏️</span>
            </Link>
            <Link to="/myfeed/">
                <h3>Back to my Feed</h3>
            </Link>
            <img src={image} alt={name} width="400" height="240" frameBorder="0" 
            className='post-image'/>
        </div>
    )
}

export default PostDetails;