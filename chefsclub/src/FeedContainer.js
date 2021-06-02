import React from 'react';
import FeedPostItem from './FeedPostItem';
import {  Grid, GridColumn, Card, CardContent, Form, Header, Icon } from 'semantic-ui-react'

function FeedContainer({recipes, handleUpdateRecipe, cooks, setCooks, like, setLike, 
    cooked, setCooked, updateCooks, onClickRecipe, currentUser, user}) {

    // console.log(recipes)
    
    // const recipePost = recipes.map(recipe => {
    //     <FeedItem key={recipe.id} recipe={recipe} />
    // })

    return (
        // <main>
        //     <h1 className="title">Food Feed</h1>
        //     <ul className="recipe-feed-container">
        //         {recipes.map((recipe) => (
        //             <FeedPostItem key={recipe.id} recipe={recipe} updateCooks={updateCooks}
        //             cooks={cooks} setCooks={setCooks} like={like} setLike={setLike} 
        //             cooked={cooked} setCooked={setCooked} onClickRecipe={onClickRecipe} 
        //             currentUser={currentUser} user={user}/>
        //         ))}
        //     </ul>
        // </main>
    <main>

        <Header as='h2' icon textAlign='center'>
            <Icon name='food' circular />
            {/* <Header.Content>Food Feast Feed</Header.Content> */}
        </Header>
        <Grid centered>
            <Grid.Row column={2} className="home-post-container">
                    {recipes.map((recipe) => (
                            <FeedPostItem key={recipe.id} recipe={recipe} updateCooks={updateCooks}
                            cooks={cooks} setCooks={setCooks} like={like} setLike={setLike} 
                            cooked={cooked} setCooked={setCooked} onClickRecipe={onClickRecipe} 
                            currentUser={currentUser} user={user}/>
                        ))}
            
            </Grid.Row>
        </Grid>
    </main>
    )
}
export default FeedContainer;