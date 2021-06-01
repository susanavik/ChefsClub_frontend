import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch, Link, useHistory} from 'react-router-dom';
import { Button, Comment, Image, Icon, Label, Grid, GridColumn, Card, CardContent, Form, Header } from 'semantic-ui-react'

function FeedPostItem({recipe, onUpdateRecipe, handleUpdateRecipe, 
    cooks, setCooks, updateCooks, onClickRecipe, currentUser, user}) {

    console.log(user)

    // console.log(recipe)
    const [details, setDetails] = useState(false)
    // const [open, toggleOpen] = useState(false)
    const [likesCount, setLikesCount] = useState(recipe.likes.length)
    const [cooksCount, setCooksCount] = useState(recipe.cooks.length)
    const [like, setLike] = useState(false)
    const [cooked, setCooked] = useState(false)
    const [stars, setStars] = useState(5)
    const [comment, setComment] = useState("")
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
        // setCooked(!cooked)

        const updateComments = {
            user_id: currentUser.id,
            recipe_id: recipe.id,
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
    
    function showPostDetails(id) {
        history.push(`/myfeed/${recipe.id}`)
    }

    const commentObj = recipe.cooks.map((cook) => {
        // return <li>I give this recipe {cook.stars || 0} 🌟! {cook.comment} </li>
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

    const [commentForm, setCommentForm] = useState(false)

    function handleCommentToggle() {
        setCommentForm(!commentForm)
    }

    return (
       <Grid.Column width={8}>

        <Card className="post-li">
            <Header attached='right'>
                <Link to={`/users/${recipe.user.id}`}> 
                    {/* <Image src={recipe.user.image} size='medium' bordered /> */}
                    <h3>✏️{recipe.user.name}</h3>
                </Link>
            </Header>
            <Image src={recipe.image} alt={recipe.name} frameBorder="0" 
                className='post-image' size='medium' rounded/>
            
            <Card.Content>
                <Link to={`/recipes/${recipe.id}`}>
                    <Header as='h2' color='pink' onClick={() => onClickRecipe(recipe.id)}>
                        {recipe.name}
                    </Header>
                </Link>
                
            <Button.Group circlar size='mini'>
                    { like ? (
                        <Button onClick={handleLikeClick} basic color='red'
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
                
                </Button.Group>
            </Card.Content>
            
            <Card.Content>
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

                <Card.Meta>
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
                       <Button type="submit" circular size='mini' color='red'>
                           Post
                        </Button>
                        
                    </Form>
                    )}
                </Card.Meta>
                <Card.Meta>
                    <Button onClick={handleCommentToggle} basic color='red' size="mini" circular>
                        Comment
                    </Button>
                </Card.Meta> 
                
        </Card.Content>

                
            </Card>
       </Grid.Column>         
        
    )
}
        export default FeedPostItem;

        // <div>
                        //     <button onClick={handleCookedClick}
                        //     className="cooked-button">
                        //     🍪
                        //     </button>
                        //     <form onSubmit={handleSubmitComment} className="new-comment">
                        //         <label>
                        //             Cooked? Now share what you thought!
                        //             <input type="text" name="comment" 
                        //             onChange={(e) => setComment(e.target.value)} value={comment} />
                        //         </label>
                        //         <label>
                        //             Star Rating: 1 - 5s
                        //             <input type="number" name="rating" 
                        //             onChange={(e) => setStars(e.target.value)} value={stars} />
                        //         </label>
                        //         <input type="submit" value="Post" />
                        //     </form>
                        // ) : (
                            //     <button onClick={handleCookedClick}
                            //     className="cooked-button-active">
                            //         ⚪
                            //     </button>
                            // )
                        // </div>
                        