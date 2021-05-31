import React, {useState} from 'react'
import {  Link } from 'react-router-dom';

function UserPostContainer({recipeObj, updateLikes, updateCooks,
handleUpdateRecipe, filteredCookedRecipes, filterLikedRecipes, setSelectedRecipeId, onClickRecipe, currentUser }) {
        // const [countLikes, setCountLikes] = useState(recipe.likes.filter(like => like.id === like.id).length)

    const [likesCount, setLikesCount] = useState(recipeObj.likes.length)
    const [cooksCount, setCooksCount] = useState(recipeObj.cooks.length)
    // const [ingredients, setIngredients] = useState([])
    const [like, setLike] = useState(false)
    const [cooked, setCooked] = useState(false)

    function handleLikeClick() {
        setLike(!like)

        const updatedLikes = { 
            user_id: currentUser.id,
            recipe_id: recipeObj.id
        }

        setLikesCount(likesCount + 1)

        fetch(`http://127.0.0.1:3006/likes`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedLikes)
        })
        .then(response => response.json())
        .then((data) => {
            updateLikes(data)
            filterLikedRecipes(data)
        })
    }

    const [commentForm, setCommentForm] = useState(false)

    function handleCommentToggle() {
        setCommentForm(!commentForm)
    }

    function handleCookedClick() {
        setCooked(!cooked)

        console.log(recipeObj.id)

        const updatedCooks = { 
            user_id: currentUser.id,
            recipe_id: recipeObj.id,
        }

        // setCooksCount(cooksCount + 1)

        fetch(`http://127.0.0.1:3006/cooks`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedCooks)
        })
        .then(response => response.json())
        .then((data) => {
            // updateCooksArray(data)
            updateCooks(data)
            // setCooked(data)
            filteredCookedRecipes(data)
        })
    }

    // const [ratingValue, setRatingValue] = useState(0)
    // const [averageStars, setAverageStars] = useState(0)
    const [stars, setStars] = useState(5)
    const [comment, setComment] = useState("")
    // const [cookedRecipe, setCookedRecipe] = useState(false)

    function handleSubmitComment(event) {
        event.preventDefault()
        // setCooked(!cooked)

        const updateComments = {
            user_id: currentUser.id,
            recipe_id: recipeObj.id,
            comment,
            stars
        }
        
        fetch(`http://127.0.0.1:3006/cooks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateComments),
        })

        .then(response => response.json())
        .then(updateCooks)
    }

       return (
        <div>
            <li>
                <img src={recipeObj.image} alt={recipeObj.name} width="400" height="240" 
                frameBorder="0" className='post-image'/>
                <h1>{recipeObj.name}</h1>
                <p>{cooksCount}🍪</p>
                <p>{likesCount}💗</p>
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
                { cooked ? (
                    <div>
                        <button onClick={handleCookedClick}
                        className="cooked-button">
                        🍪
                        </button>
                    </div>
                ) : (
                    <button onClick={handleCookedClick}
                    className="cooked-button-active">
                        ⚪
                    </button>
                )
                }   
            </li>
            <div>
                {commentForm && (
                    <form onSubmit={handleSubmitComment} className="new-comment">
                    <label>
                        Cooked? Now share what you thought!
                        <input type="text" name="comment" 
                        onChange={(e) => setComment(e.target.value)} value={comment} />
                    </label>
                    <label>
                        Star Rating: 1 - 5
                        <input type="number" name="rating" 
                        onChange={(e) => setStars(e.target.value)} value={stars} />
                    </label>
                    <input type="submit" value="Post" />
                </form>
                )}
                <button onClick={handleCommentToggle}>
                    Post Comment
                </button>
            </div>
                <Link to={`/recipes/${recipeObj.id}`}>
                    <button key={recipeObj.id} onClick={() => onClickRecipe(recipeObj.id)}>
                        Show Post Details
                    </button>
                </Link>
        </div>
       )
}

export default UserPostContainer