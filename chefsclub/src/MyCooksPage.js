import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { Button, Header, Image, Icon, Label, Grid, GridColumn, Card, Form, Rating, Comment, CardContent} from 'semantic-ui-react'

function MyCooksPage({currentUser, onClickRecipeId, updateCooks, cookedRecipe}) {

    // let cookIitem = currentUser.cooks.map((cook) => cook.recipe_id)
   
    const [cookedRecipes, setCookedRecipes] = useState([])
    const [myCooks, setMyCooks] = useState([])
    const [stars, setStars] = useState(5)
    const [comment, setComment] = useState("")
    const [commentForm, setCommentForm] = useState(false)

    const [comments, setComments] = useState(false)

    function handleSubmitComment(event) {
        event.preventDefault()
        // setCooked(!cooked)

        const updateComments = {
            user_id: currentUser.id,
            recipe_id: cookedRecipe.id,
            comment,
            stars
        }
        
        fetch(`http://127.0.0.1:3006/cooks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateComments),
        })

        .then(response => response.json())
        .then((data) => {
            updateCooks(data)
            // filteredCookedRecipes(data)
            console.log(data)
        })
    }

    function handleShowComment() {
        setComments(!comments)
    }

    function handleCommentToggle() {
        setCommentForm(!commentForm)
    }


    const commentObj = currentUser.cooks.map((cook) => {
        return <Comment.Content>
            <Comment.Author as='a' color='red'>
                <Label color='red'>{cook.user.name}</Label>
            </Comment.Author>
            <Comment.Text>I give this recipe {cook.stars || 0} 🌟! {cook.comment}</Comment.Text>
        </Comment.Content>
    })

    return (
    <main>
        <Header as='h2' icon textAlign='center'>
            <Icon name='bell' circular />
            {/* <Header.Content>Food Feast Feed</Header.Content> */}
        </Header>
        <nav className="profile-nav-bar" attached="top">
            <Button.Group className='header-btn'>
                <Link to='/home'>
                    <Button basic color='pink' inverted>My Recipes</Button>
                </Link>
                <Link to='/mylikes'>
                    <Button basic color='pink' inverted>My Likes</Button>
                </Link>
                <Link to='/mycooks'>
                    <Button basic color='pink' inverted>My Cooks</Button>
                </Link>
            </Button.Group>
        </nav>
        
        {/* <Grid >
            {currentUser.cooks.map((cook) => (
                <Grid.Column width={8}> 
                <Card centered>
                    <Image src={cook.recipe.image} alt={cook.recipe.name} width="400" height="240" frameBorder="0" 
                     className='post-image' size='medium' rounded/>
                     <Link to={`/recipes/${cook.recipe.id}`}>
                        <Card.Header as='h2' key={cook.recipe.id} onClick={() => onClickRecipeId(cook.recipe.id)}>
                            {cook.recipe.name}
                        </Card.Header> 
                     </Link>
                    <Card.Content>
                        <Card.Meta>   
                        {comments && (
                            <ul className="comment-ul">{cook.stars}🌟{cook.comment} </ul>
                        )}
                        </Card.Meta>
                    </Card.Content>
                    <Button onClick={handleShowComment} basic color='red' size="mini">
                        Show Comment
                    </Button>
                    

                </Card>
                </Grid.Column> 
            ))}
        </Grid>  */}
<Grid centered>
    <Grid.Row column={2} className="home-post-container">
<Grid.Column width={4} className="cooks-post-container" centered>
    {currentUser.cooks.map((cook) => (
        <Card className="cooks-card" centered>
            <Image src={cook.recipe.image} wrapped ui={false} 
            size='medium' rounded/>
             
            <Card.Content>
               
                <Card.Header as='h2' key={cook.recipe.id} >{cook.recipe.name}</Card.Header>
               
            </Card.Content>    
            <CardContent>
                    {comments && (
                    <Comment.Content>
                        {commentObj}
                    </Comment.Content>
                    )}
                    <Button className="show-toggle" onClick={handleShowComment} 
                    basic color='red' circular size="mini" attached='left'>
                            See Comments
                    </Button>
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
                            {/* <input type="number" name="rating" 
                            onChange={(e) => setStars(e.target.value)} value={stars} /> */}
                        </Form.Field>
                       <Button type="submit">Post</Button>
                        {/* <input type="submit" value="Post" /> */}
                </Form>
                )}
                <Button onClick={handleCommentToggle} basic color='red' size="mini" circular attached='right'>
                    Add Comment
                </Button>
                
            </CardContent>
        </Card>
        ))} 
        </Grid.Column>
        </Grid.Row>
        </Grid>

    </main>

    )
}

export default MyCooksPage;

