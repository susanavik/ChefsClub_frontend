import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { Button, Segment, Image, Icon, Label, Grid, GridColumn, Card, Form, CardGroup, Feed, CardContent} from 'semantic-ui-react'

function MyCooksPage({currentUser, onClickRecipeId}) {

    // let cookIitem = currentUser.cooks.map((cook) => cook.recipe_id)
   
    const [cookedRecipes, setCookedRecipes] = useState([])
    const [myCooks, setMyCooks] = useState([])

    const [showComment, setShowComment] = useState(false)

    function handleShowComment() {
        setShowComment(!showComment)
    }

    return (
    <main>
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
        <Grid>
           <Grid.Row >
            {currentUser.cooks.map((cook) => (
                <Grid.Column width={8}> 
                <Card>
                    <Image src={cook.recipe.image} alt={cook.recipe.name} width="400" height="240" frameBorder="0" 
                     className='post-image' size='medium' rounded/>
                     <Link to={`/recipes/${cook.recipe.id}`}>
                        <Card.Header as='h2' key={cook.recipe.id} onClick={() => onClickRecipeId(cook.recipe.id)}>
                            {cook.recipe.name}
                        </Card.Header> 
                     </Link>
                    <Card.Content>
                        <Card.Meta>   
                        {showComment && (
                            <ul className="comment-ul">{cook.stars}🌟{cook.comment} </ul>
                        )}
                        <Button className="show-toggle" onClick={handleShowComment} 
                        basic color='red' circular size="mini">
                                See Comments
                        </Button>
                        </Card.Meta>
                    </Card.Content>
                    {/* <Button onClick={handleShowComment} basic color='red' size="mini">
                        Show Comment
                    </Button> */}
                </Card>
                </Grid.Column> 

            ))}
            </Grid.Row >
        </Grid> 

    </main>
    )
}

export default MyCooksPage;