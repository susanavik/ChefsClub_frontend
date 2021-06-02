import React, {useState, useEffect} from 'react';
import MyPostContainer from './MyPostContainer';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { Button, Segment, Image, Icon, Label, Grid, GridColumn, Card } from 'semantic-ui-react'
// import MyCooksPage from './MyCooksPage';
// import MyLikesPage from './MyLikesPage';


function Home({recipes, setRecipes, currentUser, cooks, 
    setCooks, like, setLike, cooked, setCooked, users, updateCooks, 
    updateLikes, handleUpdateRecipe, onRemoveRecipe, 
    filteredCookedRecipes, filterLikedRecipes, setSelectedRecipeId, onClickRecipe}) {

    const filteredRecipes = recipes.filter((recipe) => recipe.user.id === 106)
    
    function handleCookRecipe(id) {
        const updatedRecipes = recipes.map((recipe) => {
          return recipe.id === id ? { ...recipe, isCooked: true } : recipe;
        })
        setRecipes(updatedRecipes);
    }

    return (
        <div class="home-page">
            <div className="profile-pic">
                <Image src="https://pbs.twimg.com/profile_images/1213998484669337601/VxCF6Xjq.jpg" alt="..." 
                size='small' circular centered/> 
            </div>
            <div>
                <Label className="user-name">
                    <Icon name='user outline' /> Susana Vik
                </Label>
                <Label className="user-name">
                     ✏️ Welcome2SuCasa
                </Label>
            </div>
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
            <div>
                <Grid centered>
                    <Grid.Row column={2} className="home-post-container">
                        {filteredRecipes.map((recipeObj) => (
                            <MyPostContainer recipeObj={recipeObj} key={recipeObj.id} 
                            cooks={cooks} setCooks={setCooks} like={like} setLike={setLike} cooked={cooked} 
                            setCooked={setCooked} currentUser={currentUser} updateLikes={updateLikes} 
                            updateCooks={updateCooks} handleUpdateRecipe={handleUpdateRecipe} onRemoveRecipe={onRemoveRecipe}
                            filteredCookedRecipes={filteredCookedRecipes} filterLikedRecipes={filterLikedRecipes}
                            setSelectedRecipeId={setSelectedRecipeId} onClickRecipe={onClickRecipe}
                            />
                        ))}
                    </Grid.Row>
                </Grid>
            </div>
        </div>
            
  
    )
}

export default Home;