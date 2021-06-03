import React, {useState, useReducer} from 'react'
import {useParams, Link} from "react-router-dom";
import UserPostContainer from './UserPostContainer';
import { Button, Segment, Image, Icon, Label, Grid, GridColumn } from 'semantic-ui-react'


function UserShowPage({ user, recipes, cooks, setCooks, like, setLike,
currentUser, updateLikes, updateCooks, handleUpdateRecipe, users,
setSelectedRecipeId, onClickRecipe, filteredCookedRecipes, filterLikedRecipes}) {

    let { id } = useParams();
    console.log(id)
    console.log(user.recipes)

    console.log(recipes)
    
    
    // console.log(user.recipes)
    // console.log(currentUser.recipes)

    const result = recipes.filter(recipe => {
        if (recipe.user.id === user.id)
        return recipe
    })
    
    console.log(result)
    
    // const usersId = recipes.map((recipe) => {
    //     if (recipe.user.id === id)
    //     return recipe
    //     else return null
    // })


    // const ingredientObj = recipe.recipe_ingredients.map((item) => {
    //     return <li>{item.measurement} {item.ingredient.name}</li> 
    //  })


    return (
    <div>
        <div>
            <Image size='small' circular centered src={user.image} alt={user.name}
                width="130" class="rounded mb-2 img-thumbnail" /> 
        </div>
        <div>
            <Label className="user-name">
                <Icon name='user outline' /> {user.name}
            </Label>
                <Label className="user-username">
                     ✏️ {user.username}
            </Label>
        </div>
            
        {/* <Grid centered>
            <Grid.Row column={3}>
                    {user.recipes.map((recipeObj) => (
                        <UserPostContainer 
                        recipeObj={recipeObj} key={recipeObj.id}  
                        theRecipe={result} key={result.id}
                        clickedUser={user} updateLikes={updateLikes} 
                        updateCooks={updateCooks} handleUpdateRecipe={handleUpdateRecipe}
                        filteredCookedRecipes={filteredCookedRecipes} filterLikedRecipes={filterLikedRecipes}
                        setSelectedRecipeId={setSelectedRecipeId} onClickRecipe={onClickRecipe} cooks={cooks}
                        />
                    ))}
            </Grid.Row>
        </Grid> */}

        <Grid centered>
            <Grid.Row column={3}>
                    {result.map((recipeObj) => (
                        <UserPostContainer 
                        recipeObj={recipeObj} key={recipeObj.id}  
                        // theRecipe={result} key={result.id}
                        clickedUser={user} updateLikes={updateLikes} 
                        updateCooks={updateCooks} handleUpdateRecipe={handleUpdateRecipe}
                        filteredCookedRecipes={filteredCookedRecipes} filterLikedRecipes={filterLikedRecipes}
                        setSelectedRecipeId={setSelectedRecipeId} onClickRecipe={onClickRecipe} cooks={cooks}
                        />
                    ))}
            </Grid.Row>
        </Grid>
    </div>
    
    )
}

export default UserShowPage