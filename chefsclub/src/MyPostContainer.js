import React, {useState} from 'react'
import { BrowserRouter, Route, Switch, Link, useHistory} from 'react-router-dom';

function MyPostContainer({recipeObj, onUpdateRecipe, onUpdateCook, cooks, setCooks, 
    like, setLike, cooked, setCooked, currentUser, handleCookRecipe, updateLikes}) {

    console.log(currentUser)
    
    const [likesCount, setLikesCount] = useState(recipeObj.likes.length)
    const [cooksCount, setCooksCount] = useState(recipeObj.cooks.length)
    const [details, setDetails] = useState(false)
    // const [comments, setComments] = useState([])
    const [ingredients, setIngredients] = useState([])

    function handleLikeClick() {
        // const [countLikes, setCountLikes] = useState(recipe.likes.filter(like => like.id === like.id).length)

        setLike(!like)

        console.log(currentUser)
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
        })
    }

    function HandleToggle() {

        setDetails(!details)

        //   return (
        //     // <details>
        //     //   <summary>Summary</summary>
        //     //   <p>Hidden content hidden content hidden content</p>
        //     // </details>
        //   );
    }

    // const [cookedRecipeInfo, setCookedRecipeInfo] = useState([])
    const isCooked = recipeObj.cooks.map((cook) => cook.id === currentUser.id)
 
    console.log(isCooked)

    function handleCookedClick() {

        handleCookRecipe(recipeObj.id)
        // const cookedRecipeId = 
        setCooked(!cooked)

        setCooked({
            ...recipeObj,
            cooks: recipeObj.cooks.concat({id: currentUser.id})
        })

        const updatedCooks = {
            cooksCount: recipeObj.cooksCount + 1
        }

        fetch(`http://127.0.0.1:3006/recipes/${recipeObj.id}`, {
            method: 'PATCH',
            haeders: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedCooks)
        })
        .then(response => response.json())
        .then(handleCookRecipe)
    }

    const [cookedData, setCookedData] = useState({
        comment: "",
        rating: 0,
    })

    const [ratingValue, setRatingValue] = useState(0)
    const [averageStars, setAverageStars] = useState(0)
    const [stars, setStars] = useState(0)
    
    function handleComment(event) {
        setCookedData({...cookedData, 
        [event.target.commment]: event.target.value})
    }

    function handleSubmitComment(event) {
        event.preventDefault()

        const newCooksObj = {
            ...cookedData,
        }
        
        fetch(`http://127.0.0.1:3006/recipes/${recipeObj.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCooksObj),
        })

        .then(response => response.json())
        .then(onUpdateCook)
    }

    
    // function getAverageRating() {
    //     const sum = (accumulator, ratingValue) => accumulator + ratingValue
    //     const ratings = recipeObj.cooks.map(cook => cook.stars)
    //     const averageRating = ratings.reduce(sum) / ratings.length 
    //     setAverageStars(averageRating)
    //   }

    const sum = (accumulator, ratingValue) => accumulator + ratingValue
        const ratings = recipeObj.cooks.map(cook => cook.stars)
        const averageRating = ratings.reduce(sum) / ratings.length 
    // console.log(averageRating)

    return (
        <div>
            <li >
                <img src={recipeObj.image} alt={recipeObj.name} width="400" height="240" frameBorder="0" 
                    className='post-image'/>
                <h1>{recipeObj.name}</h1>
            </li>
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
                                onChange={handleComment} value={cookedData.comment} />
                            </label>
                            <label>
                                Star Rating: 1 - 5
                                <input type="number" name="rating" 
                                onChange={(event, newValue) => {
                                    setRatingValue(newValue)
                                }} 
                                value={cookedData.rating} />
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
                        <h5>{recipeObj.time}</h5>
                        <p>{cooksCount}🍪</p>
                        <p>{likesCount}💗</p>
                        <p>{averageRating} 🌟</p>
                        <p>{recipeObj.instructions}</p>
                    </div>
                )}
                <button onClick={HandleToggle}>
                    Show Post Details
                </button>
        </div>
    )
}

export default MyPostContainer;