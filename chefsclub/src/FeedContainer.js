import React from 'react';
import PostItem from './PostItem';

function FeedContainer({recipes, handleUpdateRecipe, cooks, setCooks, like, setLike, 
    cooked, setCooked, updateCooks}) {

    // console.log(recipes)
    
    // const recipePost = recipes.map(recipe => {
    //     <FeedItem key={recipe.id} recipe={recipe} />
    // })

    return (
        <main>
            <h1>Food Feed</h1>
            <ul>
                {recipes.map((recipe) => (
                    <PostItem key={recipe.id} recipe={recipe} updateCooks={updateCooks}
                    cooks={cooks} setCooks={setCooks} like={like} setLike={setLike} 
                    cooked={cooked} setCooked={setCooked}/>
                ))}
            </ul>
        </main>
    )
}
export default FeedContainer;