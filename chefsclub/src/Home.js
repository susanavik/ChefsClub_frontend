import React, {useState, useEffect} from 'react';
import MyPostContainer from './MyPostContainer';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import MyCooksPage from './MyCooksPage';
import MyLikesPage from './MyLikesPage';

function Home({recipes, setRecipes, currentUser, cooks, 
    setCooks, like, setLike, cooked, setCooked, users, updateCooks, 
    updateLikes, updateCooksArray, handleUpdateRecipe, onRemoveRecipe}) {

    const filteredRecipes = recipes.filter((recipe) => recipe.user.id === 74)
    
    // function handleCookRecipe(id) {
    //     const updatedRecipes = recipes.map((recipe) => {
    //       return recipe.id === id ? { ...recipe, isCooked: true } : recipe;
    //     })
    //     setRecipes(updatedRecipes);
    // }

    return (
        <div>
            <div>
                <img src="https://pbs.twimg.com/profile_images/1213998484669337601/VxCF6Xjq.jpg" alt="..." 
                width="130" class="rounded mb-2 img-thumbnail" /> 
                <h4 className="mt-0 mb-0">Susana Vik</h4>
                <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>✏️Welcome2SuCasa</p>
                <Link to='/mylikes'>
                    <h3>My Likes</h3>
                </Link>
                <Link to='/mycooks'>
                    <h3>My Cooks</h3>
                </Link>
                <ul>
                    {filteredRecipes.map((recipeObj) => (
                        <MyPostContainer recipeObj={recipeObj} key={recipeObj.id} 
                        cooks={cooks} setCooks={setCooks} like={like} setLike={setLike} cooked={cooked} 
                        setCooked={setCooked} currentUser={currentUser} updateLikes={updateLikes} 
                        updateCooks={updateCooks} handleUpdateRecipe={handleUpdateRecipe} onRemoveRecipe={onRemoveRecipe}
                        // updateCooksArray={updateCooksArray}
                        />
                    ))}
                </ul>
            </div>
            <nav>
            <Link to='/mylikes'>
                <h3>My Likes</h3>
            </Link>
            <Link to='//mycooks'>
                <h3>My Cooks</h3>
            </Link>
            </nav>
        </div>
            
  
    )
}

export default Home;