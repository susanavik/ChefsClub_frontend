import React, { useState, useEffect } from 'react'
import MyCooksCard from './MyCooksCard'

function MyCooksPage({currentUser}) {

    // let cookIitem = currentUser.cooks.map((cook) => cook.recipe_id)

   
    const [cookedRecipes, setCookedRecipes] = useState([])
    const [myCooks, setMyCooks] = useState([])

    return (
        <div>
            {currentUser.cooks.map((cook) => (
                <div>
                    <img src={cook.recipe.image} alt={cook.recipe.name} width="400" height="240" frameBorder="0" 
                     className='post-image'/>
                   <h3>{cook.recipe.name}</h3> 
                    <p>{cook.comment}</p>   
                </div>
            ))
            // <img src={cook.image} alt={cook.name} width="400" height="240" frameBorder="0" 
            //         className='post-image'/>
            //     <h1>{recipeObj.name}</h1>
            //     <p>{cooksCount}🍪</p>
            //     <p>{likesCount}💗</p>
            //     { like ? (
            //     <button onClick={handleLikeClick}
            //     className="like-button">
            //         💗
            //     </button>
            //     ) : (
            //     <button onClick={handleLikeClick}
            //     className="like-button-active">
            //         🤍
            //     </button>
            //     )
            //     }
            //     { cooked ? (
            //         <div>
            //             <button onClick={handleCookedClick}
            //             className="cooked-button">
            //             🍪
            //             </button>
            //         </div>
            //     ) : (
            //         <button onClick={handleCookedClick}
            //         className="cooked-button-active">
            //             ⚪
            //         </button>
            //     )
            //     }   
            // </li>
            // <button onClick={handleDeleteClick} className="emoji-button delete">
            //     🗑
            // </button>
            // <div>
            //     {commentForm && (
            //         <form onSubmit={handleSubmitComment} className="new-comment">
            //         <label>
            //             Cooked? Now share what you thought!
            //             <input type="text" name="comment" 
            //             onChange={(e) => setComment(e.target.value)} value={comment} />
            //         </label>
            //         <label>
            //             Star Rating: 1 - 5
            //             <input type="number" name="rating" 
            //             onChange={(e) => setStars(e.target.value)} value={stars} />
            //         </label>
            //         <input type="submit" value="Post" />
            //     </form>
            //     )}
            //     <button onClick={handleCommentToggle}>
            //         Post Comment
            //     </button>
            // </div>
        }
        </div> 
    )
}

export default MyCooksPage;