import React, {useState} from 'react'
import {  Link } from 'react-router-dom';
import { Button, Segment, Image, Rating, Label, Grid, GridColumn, Card, Form, CardContent } from 'semantic-ui-react'

function UserPostContainer({recipeObj, updateLikes, updateCooks,
handleUpdateRecipe, filteredCookedRecipes, filterLikedRecipes, setSelectedRecipeId, onClickRecipe, currentUser }) {
        // const [countLikes, setCountLikes] = useState(recipe.likes.filter(like => like.id === like.id).length)

        console.log(currentUser.recipeObj)
        // console.log(currentUser.cooks)


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
        
    <Grid.Column width={6}>
        <Card>
        <Image src={recipeObj.image} wrapped ui={false} 
        fluid label={{ as: 'a', corner: 'left', icon: 'heart' }}
        />
        <Card.Content>
            <Card.Header>{recipeObj.name}</Card.Header>
            < Card.Description>
                <Link to={`/recipes/${recipeObj.id}`}>
                    <Button size='mini' basic color='red' key={recipeObj.id} onClick={() => onClickRecipe(recipeObj.id)}>
                        Show Post Details
                    </Button>
                </Link>
            </Card.Description>
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
                    <Button onClick={handleLikeClick} content='Liked' basic color='red'
                    className="like-button" label={{ as: 'a', basic: true, content: '27💗' }}
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
           
        </Card.Content>
        <CardContent>
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
                        <Rating icon='star' defaultRating={3} maxRating={5} 
                        onChange={(e) => setStars(e.target.value)} value={stars}/>
                        {/* <label>
                        Star Rating: 1 - 5
                        </label> */}
                        {/* <input type="number" name="rating" 
                        onChange={(e) => setStars(e.target.value)} value={stars} /> */}
                    </Form.Field>
                   <Button type="submit">Post</Button>
                    {/* <input type="submit" value="Post" /> */}
            </Form>
            )}
            <Button onClick={handleCommentToggle} basic color='red' size="mini">
                Post Comment
            </Button>
        </div>
            
        </CardContent>
    </Card>
    </Grid.Column>
    )
}

export default UserPostContainer