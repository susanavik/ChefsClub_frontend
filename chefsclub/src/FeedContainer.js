import React from 'react';
import FeedPostItem from './FeedPostItem';

function FeedContainer({recipes, handleUpdateRecipe, cooks, setCooks, like, setLike, 
    cooked, setCooked, updateCooks, onClickRecipe}) {

    // console.log(recipes)
    
    // const recipePost = recipes.map(recipe => {
    //     <FeedItem key={recipe.id} recipe={recipe} />
    // })

    return (
        <main>
            <h1>Food Feed</h1>
            <ul>
                {recipes.map((recipe) => (
                    <FeedPostItem key={recipe.id} recipe={recipe} updateCooks={updateCooks}
                    cooks={cooks} setCooks={setCooks} like={like} setLike={setLike} 
                    cooked={cooked} setCooked={setCooked} onClickRecipe={onClickRecipe}/>
                ))}
            </ul>
        </main>
    )
}
export default FeedContainer;