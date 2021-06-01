import React, {useState, useReducer} from 'react'
import {useParams, Link} from "react-router-dom";
import UserPostContainer from './UserPostContainer';
import { Button, Segment, Image, Icon, Label, Grid, GridColumn } from 'semantic-ui-react'


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
    <Grid.Column width={8}>
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
            
        <div>
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
    </Grid.Column>
    
    )
}

export default UserShowPage