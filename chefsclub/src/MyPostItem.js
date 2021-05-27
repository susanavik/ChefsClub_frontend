import React from 'react'

function MyPostItem({ingredientObj, recipeObj, ingredients, cookObj}) {

    return (
        <li>
            <p>{recipeObj.time}</p>
        </li>
    )
}
export default MyPostItem;