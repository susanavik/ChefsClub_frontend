import React, { useState } from 'react'
import MyCooksCard from './MyCooksCard'

function MyCooksPage(props) {

    const [cookedRecipes, setCookedRecipes] = useState([])

    // function updateCooksArray(cookObject) {
    //     let cookedRecipes = recipes.map((recipe) => {
    //       if (recipe.id === cookObject.recipe_id) {
    //         let newCooks = [...recipe.cooks, cookObject]
    //         recipe.cooks = newCooks
    //         return recipe
    //       } else {
    //         return recipe
    //       }
    //     })
    //     setRecipes(cookedRecipes)
    //     console.log(cookedRecipes)
    //   }

    // const newRecipes = recipes.filter((recipe) => recipe.id !== id)
    // console.log(newRecipes)

    const user_id = props.currentUser.id;

    // filter cooks
    let myCooks = props.recipes.filter(item => {
        let cooks = item.cooks;
        let filtered = cooks.filter(row => row.user_id == user_id);        
        
        return filtered.length > 0;
    });

//    function updateCooksArray() {
//         const cookedRecipesArr = cooks.filter((cook) => cook.user_id === 74)
//         setCookedRecipes(cookedRecipesArr)
//         console.log(cookedRecipesArr)
//    }

    return (
        <div>
            {
            myCooks.map(item => (
                <div>
                    {item.name}
                </div>
            ))
        }
        </div> 
    )
}

export default MyCooksPage;