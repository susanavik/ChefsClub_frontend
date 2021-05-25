import React from 'react';
import PostItem from './PostItem';

function FeedContainer({recipes, onUpdateRecipe, cooks, setCooks, like, setLike, 
    cooked, setCooked}) {

    // console.log(recipes)
    
    // const recipePost = recipes.map(recipe => {
    //     <FeedItem key={recipe.id} recipe={recipe} />
    // })

    return (
        <main>
            <h1>Food Feed</h1>
            <ul>
                {recipes.map((recipe) => (
                    <PostItem key={recipe.id} recipe={recipe} onUpdateRecipe={onUpdateRecipe}
                    cooks={cooks} setCooks={setCooks} like={like} setLike={setLike} 
                    cooked={cooked} setCooked={setCooked}/>
                ))}
            </ul>
        </main>
    )
}
export default FeedContainer;