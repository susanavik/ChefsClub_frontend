import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch, Link, useHistory} from 'react-router-dom';

function PostDetails({currentRecipe, updateCurrentRecipe}) {

    let history = useHistory()

    console.log(currentRecipe)

    const [currentRecipeId, setCurrentRecipeId] = useState(parseInt(history.location.pathname.split("/")[2]))

    useEffect(() => {
        updateCurrentRecipe(currentRecipeId)
    }, []) 

    //    console.log(currentRecipeId)

    // id, name, time, image, instructions, user, recipe_ingredients
    return (
        <div className="recipe-details">
            <Link to="/myfeed/">
                <h3>Back to my Feed</h3>
            </Link>
            <img src={currentRecipe.image} alt={currentRecipe.name} width="400" height="240" frameBorder="0" 
            className='post-image'/>
            <Link to="/home"> 
                <span>✏️{currentRecipe.user}</span>
            </Link>
            <h1>{currentRecipe.name}</h1>
            <ul>{currentRecipe.instructions}</ul>
        </div>
    )
}

export default PostDetails;