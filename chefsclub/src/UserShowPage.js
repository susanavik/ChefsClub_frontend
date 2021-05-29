import React, {useState} from 'react'
import {useParams, Link} from "react-router-dom";

function UserShowPage({users, user}) {

    let { id } = useParams();
    console.log(id)
    console.log(user)

    // const ingredientObj = recipe.recipe_ingredients.map((item) => {
    //     return <li>{item.measurement} {item.ingredient.name}</li> 
    //  })

    return (
        <div>
            <h1>Meet {user.name}</h1>
            <img src={user.image} alt={user.name}
                width="130" class="rounded mb-2 img-thumbnail" /> 
        </div>
    )
}

export default UserShowPage