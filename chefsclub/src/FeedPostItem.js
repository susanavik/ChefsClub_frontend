import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch, Link, useHistory} from 'react-router-dom';


function FeedPostItem({recipe, onUpdateRecipe, handleUpdateRecipe, cooks, setCooks, updateCooks, onClickRecipe}) {

    // console.log(recipe)
    const [details, setDetails] = useState(false)
    // const [open, toggleOpen] = useState(false)
    const [likesCount, setLikesCount] = useState(recipe.likes.length)
    const [cooksCount, setCooksCount] = useState(recipe.cooks.length)
    const [like, setLike] = useState(false)
    const [cooked, setCooked] = useState(false)
    let history = useHistory()

    // console.log(history.location.pathname)
   
    function HandleToggle() {
        setDetails(!details)
    }

    // onClick={() => setLike(true)}
    // onClick={() => setLike(false)} 

    function handleLikeClick() {
        // const [countLikes, setCountLikes] = useState(recipe.likes.filter(like => like.id === like.id).length)

        const updatedLikes = {
            likesCount: likesCount + 1
            
        }

        setLike(!like)
        setLikesCount( likesCount +1)
        

        fetch(`http://127.0.0.1:3006/recipes/${recipe.id}`, {
            method: 'PATCH',
            haeders: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedLikes)
        })
        .then(response => response.json())
        .then(handleUpdateRecipe)
    }

    function handleCookedClick() {
        setCooked(!cooked)

        const updatedCooks = {
            cooksCount: cooksCount + 1
        }

        setCooksCount(cooksCount+1)

        fetch(`http://127.0.0.1:3006/recipes/${recipe.id}`, {
            method: 'PATCH',
            haeders: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(updatedCooks)
        })
        .then(response => response.json())
        .then(updateCooks)
    }


    const [cookedData, setCookedData] = useState({
        comment: "",
        rating: 5,
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
        
        fetch(`http://127.0.0.1:3006/recipes/${recipe.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCooksObj),
        })

        .then(response => response.json())
        .then(handleUpdateRecipe)
    }
    
    function showPostDetails(id) {
        history.push(`/myfeed/${recipe.id}`)
    }

    const commentObj = recipe.cooks.map((cook) => {
        return <li>{cook.comment}</li>
    })

    console.log(recipe.cooks)
    console.log(commentObj)

    const [comments, setComments] = useState(false)

    function handleShowComment() {
        setComments(!comments)
    }

    return (
        <li className="post-li">
            <div className="image">
                {/* <Link to={`myfeed/${recipe.id}`}> 
                    {recipe.name}
                </Link> */}
                <h1 onClick={() => showPostDetails(recipe.id)}>{recipe.name}</h1>
                <img src={recipe.image} alt={recipe.name} width="400" height="240" frameBorder="0" 
                className='post-image'/>
                <Link to="/home"> 
                    <span>✏️{recipe.user.name}</span>
                </Link>
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
                    <div>
                        <h5>{recipe.time}</h5>
                        <p>{cooksCount}🍪</p>
                        <p>{likesCount}💗</p>
                    </div>
                    <div>
                    <div>
                    {comments && (
                        <ul>{commentObj}</ul>
                    )}
                    <button onClick={handleShowComment}>
                            See Comments
                    </button>
            </div>
                        
                    </div>
                <Link to={`/home/${recipe.id}`}>
                    <button onClick={() => onClickRecipe(recipe.id)}>
                        Show Post Details
                    </button>
                </Link>
            </div>
        </li>
    )
}
        export default FeedPostItem;