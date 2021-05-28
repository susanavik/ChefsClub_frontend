import React, {useState} from 'react'
import { BrowserRouter, Route, Switch, Link, useHistory} from 'react-router-dom';
import UpdateRecipeForm from './UpdateRecipeForm';
import PostItem from './PostItem'

function MyPostContainer({recipeObj, handleUpdateRecipe, onUpdateCook, cooks, setCooks, 
    currentUser, updateCooks, updateLikes, onRemoveRecipe, 
    filteredCookedRecipes, filterLikedRecipes, onClickRecipe}) {

    console.log(recipeObj)
    
    const [likesCount, setLikesCount] = useState(recipeObj.likes.length)
    const [cooksCount, setCooksCount] = useState(recipeObj.cooks.length)
    const [details, setDetails] = useState(false)
    // const [comments, setComments] = useState([])
    const [ingredients, setIngredients] = useState([])
    // const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [like, setLike] = useState(false)
    const [cooked, setCooked] = useState(false)

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
            filterLikedRecipes(data)
        })
    }

    const [editForm, setEditForm] = useState(false)

    function HandleUpdateToggle() {
        setEditForm(!editForm)
    }

    const [commentForm, setCommentForm] = useState(false)

    function handleCommentToggle() {
        setCommentForm(!commentForm)
    }

    // const [cookedRecipeInfo, setCookedRecipeInfo] = useState([])
    // console.log(isCooked)

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

    const [ratingValue, setRatingValue] = useState(0)
    const [averageStars, setAverageStars] = useState(0)
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

    // function handleEditRecipe(updatedRecipe) {
    //     const updatedRecipes = recipes.map((recipe) => 
    //     recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    //     )
    //     setSelectedRecipe(updatedRecipe)
    //     set
    // }
    // function getAverageRating() {
    //     const sum = (accumulator, ratingValue) => accumulator + ratingValue
    //     const ratings = recipeObj.cooks.map(cook => cook.stars)
    //     const averageRating = ratings.reduce(sum) / ratings.length 
    //     setAverageStars(averageRating)
    //   }

    // const sum = (accumulator, ratingValue) => accumulator + ratingValue
    //     const ratings = recipeObj.cooks.map(cook => cook.stars)
    //     const averageRating = ratings.reduce(sum) / ratings.length 
    // console.log(averageRating)


    // function onChangeForm(name, value) {
    //     setSelectedRecipe({
    //       ...selectedRecipe,
    //       [name]: value,
    //     });
    //   }

    function handleDeleteClick() {
        fetch(`http://localhost:6001/recipes/${recipeObj.id}`, {
        method: "DELETE",
        });
        onRemoveRecipe(recipeObj.id);
    }

    const cookObj = cooks.map((cook) => cook)
    // const ingredient = recipeObj.recipe_ingredients.map((ingredientObj) => ingredientObj.ingredient)
    // console.log(ingredient)
    // const cookComments = cookObj.comments((comment) => comment)

    return (
        <div>
            <li >
                <img src={recipeObj.image} alt={recipeObj.name} width="400" height="240" frameBorder="0" 
                    className='post-image'/>
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
            <button onClick={handleDeleteClick} className="emoji-button delete">
                🗑
            </button>
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
            {editForm && (
                <UpdateRecipeForm currentUser={currentUser} recipe={recipeObj} handleUpdateRecipe={handleUpdateRecipe} />
                )}
                <button onClick={HandleUpdateToggle}>
                    Update Recipe
                </button>
            {details && (
                    <div>
                        <ul>
                            {/* <MyPostItem recipeObj={recipeObj} key={recipeObj.id} /> */}
                            {/* {recipeObj.recipe_ingredients.map((ingredientObj) => {
                                <MyPostItem key={recipeObj.id} id={recipeObj.id} ingredientObj={ingredientObj} 
                                ingredients={ingredientObj.ingredient} recipeObj={recipeObj} cookObj={cookObj} />
                            })} */}
                        </ul>
                        {/* <h5>{recipeObj.time}</h5>
                        <p>{cooksCount}🍪</p>
                        <p>{likesCount}💗</p>
                        <p> 🌟</p>
                        <li>{cookObj.comment}</li>
                        <p> {recipeObj.instructions}</p>
                        <ul>
                            {recipeObj.ingredients.map((ingredient) => (
                                <MyPostItem ingredient={ingredient} />
                            ))}
                        </ul> */}
                    </div>
                )}
                <Link to={`/home/${recipeObj.id}`}>
                    <button key={recipeObj.id} onClick={() => onClickRecipe(recipeObj.id)}>
                        Show Post Details
                    </button>
                </Link>
                
        </div>
    )
}

export default MyPostContainer;