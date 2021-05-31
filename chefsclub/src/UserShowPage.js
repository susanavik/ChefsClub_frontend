import React, {useState, useReducer} from 'react'
import {useParams, Link} from "react-router-dom";
import UserPostContainer from './UserPostContainer';


function UserShowPage({ user, recipes, cooks, setCooks, like, setLike,
    //  cooked, setCooked,
currentUser, updateLikes, updateCooks, handleUpdateRecipe, filteredCookedRecipes, filterLikedRecipes,
setSelectedRecipeId, onClickRecipe}) {

    let { id } = useParams();
    console.log(id)
    console.log(user.recipes)

    // const ingredientObj = recipe.recipe_ingredients.map((item) => {
    //     return <li>{item.measurement} {item.ingredient.name}</li> 
    //  })

    return (
        <div>
            <h1>Meet {user.name}</h1>
            <img src={user.image} alt={user.name}
                width="130" class="rounded mb-2 img-thumbnail" /> 
            <h3>✏️{user.username}</h3>
            <ul>
                    {user.recipes.map((recipeObj) => (
                        <UserPostContainer recipeObj={recipeObj} key={recipeObj.id}  
                        currentUser={user} updateLikes={updateLikes} 
                        updateCooks={updateCooks} handleUpdateRecipe={handleUpdateRecipe}
                        filteredCookedRecipes={filteredCookedRecipes} filterLikedRecipes={filterLikedRecipes}
                        setSelectedRecipeId={setSelectedRecipeId} onClickRecipe={onClickRecipe}
                        />
                    ))}
                </ul>

        </div>
    )
}

export default UserShowPage