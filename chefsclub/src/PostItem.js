import React, { useState } from 'react'
import {useParams, Link} from "react-router-dom";

function PostItem({recipe, recipes, currentUser}) {
    // let match = useRouteMatch("/home/:id")
    let { id } = useParams();
    
    // const [selectedRecipe, setSelectedRecipe] = useState(null)

    console.log(recipe.recipe_ingredients)

    const ingredientObj = recipe.recipe_ingredients.map((item) => {
       return <li>{item.measurement} {item.ingredient.name}</li> 
    })
    // const ingredientName = recipe.recipe_ingredients.map((item) => {
    //     return <li>{item.ingredient.name}</li>
    // })

    console.log(ingredientObj)
    console.log(recipe.cooks)
    
    // id, name, time, image, instructions, user, recipe_ingredients
    return (
        <div>
            <header>
                <h1>Recipe Show Page</h1>
                <Link to="/myfeed/">
                    <h3>Back to my Feed</h3>
                </Link>
            </header>
            <div className="recipe-details">
                <h2>{recipe.name}</h2>
                <img src={recipe.image} alt={recipe.name} width="400" height="240" frameBorder="0" 
                className='post-image'/>
                <h3>
                <Link to="/home"> 
                    <span>✏️{recipe.user.name}</span>
                </Link>
                </h3>
                
                <ul>
                    <h3>Instructions</h3>
                    {recipe.instructions}
                </ul>
                <ul>
                    <h3>Ingredients</h3>
                    <li>{ingredientObj}</li>
                </ul>


            </div>
        </div>
    )

    // let history = useHistory()
    // let {id} = useParams()

    // console.log(id)
    // console.log(currentRecipe)

    // const [currentRecipeId, setCurrentRecipeId] = useState(parseInt(history.location.pathname.split("/")[2]))

    // useEffect(() => {
    //     updateCurrentRecipe(currentRecipeId)
    // }, []) 

    // //    console.log(currentRecipeId)
}
export default PostItem;