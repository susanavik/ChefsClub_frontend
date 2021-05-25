import React, {useState} from 'react'
import { BrowserRouter, Route, Switch, Link, useHistory} from 'react-router-dom';

function MyPostContainer({recipeObj, onUpdateRecipe, onUpdateCook, cooks, setCooks, 
    like, setLike, cooked, setCooked}) {

    
    const [likesCount, setLikesCount] = useState(recipeObj.likes.length)
    const [cooksCount, setCooksCount] = useState(recipeObj.cooks.length)
    const [details, setDetails] = useState(false)
    // const [comments, setComments] = useState([])
    const [ingredients, setIngredients] = useState([])

    function handleLikeClick() {
        // const [countLikes, setCountLikes] = useState(recipe.likes.filter(like => like.id === like.id).length)

        const updatedLikes = {
            likesCount: likesCount + 1
            
        }
        setLike(!like)
        setLikesCount( likesCount +1)

        fetch(`http://127.0.0.1:3006/recipes/${recipeObj.id}`, {
            method: 'PATCH',
            haeders: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedLikes)
        })
        .then(response => response.json())
        .then(onUpdateRecipe)
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

    function handleCookedClick() {
        setCooked(!cooked)

        const updatedCooks = {
            cooksCount: cooksCount + 1
        }

        setCooksCount(cooksCount+1)

        fetch(`http://127.0.0.1:3006/recipes/${recipeObj.id}`, {
            method: 'PATCH',
            haeders: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedCooks)
        })
        .then(response => response.json())
        .then(onUpdateRecipe)
    }


    const [cookedData, setCookedData] = useState({
        comment: "",
        rating: 0,
    })


    function handleCommentandRating(event) {
        setCookedData({...cookedData,
        [event.target.value]: event.target.value})
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

    const [ratingValue, setRatingValue] = useState(0)
    const [averageStars, setAverageStars] = useState(0)

    const getAverageRating = () => {
        const sum = (accumulator, ratingValue) => accumulator + ratingValue
        const ratings = recipeObj.cooks.map(cook => cook.stars)
        const averageRating = ratings.reduce(sum) / ratings.length 
        setAverageStars(averageRating)
      }

    console.log(getAverageRating)
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
                                onChange={handleCommentandRating} value={cookedData.comment} />
                            </label>
                            <label>
                                Star Rating: 1 - 5
                                <input type="number" name="rating" 
                                onChange={handleCommentandRating} value={cookedData.rating} />
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
                        <p>{getAverageRating} 🌟</p>
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