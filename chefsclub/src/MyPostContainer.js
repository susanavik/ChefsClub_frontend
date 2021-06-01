import React, {useState} from 'react'
import {  Link } from 'react-router-dom';
import UpdateRecipeForm from './UpdateRecipeForm';
import { Button, Comment, Image, Icon, Label, Grid, GridColumn, Card, CardContent, Form } from 'semantic-ui-react'
// import PostItem from './PostItem'

function MyPostContainer({recipeObj, handleUpdateRecipe, onUpdateCook, cooks, setCooks, 
    currentUser, updateCooks, updateLikes, onRemoveRecipe, 
    filteredCookedRecipes, filterLikedRecipes, onClickRecipe}) {

    // console.log(recipeObj)s
    
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

        // console.log(currentUser)
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

    const commentObj = cooks.map((cook) => {
        
        return <Comment.Content>
            <Comment.Author as='a' color='red'>
                <Label color='red'>{cook.user.name}</Label>
            </Comment.Author>
            <Comment.Text>I give this recipe {cook.stars || 0} 🌟! {cook.comment}</Comment.Text>
        </Comment.Content>
    })

    // console.log(recipe.cooks)
    // console.log(commentObj)

    const [comments, setComments] = useState(false)

    function handleShowComment() {
        setComments(!comments)
    }

    return (
    <div>
        <Card>
            <Image src={recipeObj.image} wrapped ui={false} 
            fluid label={{ as: 'a', corner: 'left', icon: 'heart' }}
            size='medium' rounded/>
            <Card.Content>
               <Link to={`/recipes/${recipeObj.id}`}>
                    <Card.Header as='h2' key={recipeObj.id} onClick={() => onClickRecipe(recipeObj.id)}>{recipeObj.name}</Card.Header>
               </Link> 
             </Card.Content>
            <Card.Content extra>
            <Card.Description>
                { cooked ? (
                    <Button onClick={handleCookedClick}
                    className="cooked-button" content='Cooked' basic color='red'
                    label={{ as: 'a', basic: true, content: '2🍪' }} size="mini" circular>
                    cooked!
                     </Button>
                    ) : (
                        <Button onClick={handleCookedClick}  basic color='red'
                        className="cooked-button-active" size="mini" circular>
                        cooked? 
                        </Button>
                    )
                    }
                { like ? (
                        <Button onClick={handleLikeClick} basic color='red'
                        className="like-button" label={{ as: 'a', basic: true, content: '27💗'}}
                         size="mini" circular>
                        likes
                        </Button>
                        ) : (
                        <Button onClick={handleLikeClick} basic color='red'
                        className="like-button-active" size="mini" circular> 
                          🤍
                        </Button>
                        )
                        }   
                </Card.Description>
                <Button onClick={handleDeleteClick} basic color='red' 
                className="emoji-button delete" size="mini" circular>
                    🗑
                </Button>
            </Card.Content>
            
            <CardContent>
            <Card.Meta>   
                    {comments && (
                        <Comment.Content>
                        {commentObj}
                        
                    </Comment.Content>
                    )}
                    <Button className="show-toggle" onClick={handleShowComment} 
                    basic color='red' circular size="mini">
                            See Comments
                    </Button>
            </Card.Meta>
            <div>
                {commentForm && (
                    <Form onSubmit={handleSubmitComment} className="new-comment">
                        <Form.Field>
                            <label>
                            Cooked? Now share what you thought!
                            </label>
                            <input type="text" name="comment" 
                            onChange={(e) => setComment(e.target.value)} value={comment} />
                        </Form.Field>
                        <Form.Field>
                            <label>
                            Star Rating: 1 - 5
                            </label>
                            <input type="number" name="rating" 
                            onChange={(e) => setStars(e.target.value)} value={stars} />
                        </Form.Field>
                       <Button type="submit">Post</Button>
                        {/* <input type="submit" value="Post" /> */}
                </Form>
                )}
                <Button onClick={handleCommentToggle} basic color='red' size="mini" circular>
                    Post Comment
                </Button>
            </div>
            {editForm && (
                <UpdateRecipeForm currentUser={currentUser} recipe={recipeObj} handleUpdateRecipe={handleUpdateRecipe} />
                )}
                <Button onClick={HandleUpdateToggle} basic color='red' size='mini' circular>
                    Update Recipe
                </Button>
                
            </CardContent>
        </Card>
        
        

    </div>

        /* <div>
            <li>
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
                <Link to={`/recipes/${recipeObj.id}`}>
                    <button key={recipeObj.id} onClick={() => onClickRecipe(recipeObj.id)}>
                        Show Post Details
                    </button>
                </Link>
                
        </div> */
    )
}

export default MyPostContainer;