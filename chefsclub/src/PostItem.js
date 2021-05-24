import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import PostDetails from './PostDetails';

function PostItem({recipe, onUpdateRecipe, onUpdateCook}) {

    console.log(recipe)

    const [details, setDetails] = useState(false)
    // const [open, toggleOpen] = useState(false)
    const [like, setLike] = useState(false)
    const [cooked, setCooked] = useState(false)
   
    function HandleToggle() {

        setDetails(!details)

          return (
            <details>
              <summary>Summary</summary>
              <p>Hidden content hidden content hidden content</p>
            </details>
          );
    }

    // onClick={() => setLike(true)}
    // onClick={() => setLike(false)} 

    function handleLikeClick() {

        const updatedRecipe = {
            likes: recipe.likes + 1
        }

        setLike(!like)

        fetch(`http://127.0.0.1:3006/recipes/${recipe.id}`, {
            method: 'PATCH',
            haeders: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedRecipe)
        })
        .then(response => response.json())
        .then(onUpdateRecipe)
    }

    function handleCookedClick() {
        setCooked(!cooked)

        const updatedRecipe = {
            cooks: recipe.cooks + 1
        }

        fetch(`http://127.0.0.1:3006/recipes/${recipe.id}`, {
            method: 'PATCH',
            haeders: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedRecipe)
        })
        .then(response => response.json())
        .then(onUpdateRecipe)
    }

    const [cookedAtributes, setCookedAtributes] = useState({
        comment: "",
        rating: 0,
    })

    function handleCommentandRating(event) {
        setCookedAtributes({...cookedAtributes,
        [event.target.comment]: event.target.value})
    }


    function handleSubmitComment(event) {
        event.preventDefault()

        const newCooksObj = {
            ...cookedAtributes,
        }
        
        fetch(`http://127.0.0.1:3006/recipes/${recipe.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCooksObj),
        })

        .then(response => response.json())
        .then(onUpdateCook)
    }


    return (
        <li className="post-li">
            <div className="image">
                <Link to="/home"> 
                    <span>✏️{recipe.user.name}</span>
                </Link>
                <Link to={`myfeed/${recipe.id}`}> 
                    <h3>{recipe.name}</h3>
                </Link>
                <img src={recipe.image} alt={recipe.name} width="400" height="240" frameBorder="0" 
                className='post-image'/>
                <div>
                    { like ? (
                        <button onClick={handleLikeClick}
                        className="like-button">
                            💗
                        </button>
                    ) : (
                        <button onClick={handleLikeClick}
                        className="like-button-active">
                            🤍
                        </button>
                    )
                    }
                </div>
                <div>
                    { cooked ? (
                        <div>
                            <button onClick={handleCookedClick}
                            className="cooked-button">
                            🍪
                            </button>
                            <form onSubmit={handleSubmitComment} className="new-comment">
                                <label>
                                    Cooked? Now share what you thought!
                                    <input type="text" name="comment" 
                                    onChange={handleCommentandRating} value={cookedAtributes.comment} />
                                </label>
                                <label>
                                    Star Rating: 1 - 5
                                    <input type="number" name="rating" 
                                    onChange={handleCommentandRating} value={cookedAtributes.rating} />
                                </label>
                                <input type="submit" value="Post" />
                            </form>
                        </div>
                        
                    ) : (
                        <button onClick={handleCookedClick}
                        className="cooked-button-active">
                            ⚪
                        </button>
                    )
                    }
                </div>
                {details && (
                    <div>
                        <h5>{recipe.time}</h5>
                        <p>Cooks</p>
                        <p>Likes</p>
                    </div>
                )}
                <button onClick={HandleToggle}>
                    Show Post Details
                </button>
            </div>
        </li>
    )
}
        export default PostItem;