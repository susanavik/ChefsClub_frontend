import React, {useState} from 'react'

function UpdateRecipeForm({currentUser, recipe, handleUpdateRecipe}) {

    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [time, setTime] = useState("")
    const [instructions, setInstructions] = useState("")
    const [ingredients, setIngredients] = useState({})

    // function handleInputChange(event) {
    //     onChangeForm(event.target.name, event.target.value)
    // }

    const newRecipe = {
        name,
        image,
        time: parseInt(time),
        instructions,
        ingredients,
        user_id: currentUser.id,
        likes: 0,
        cooks: {comment: "", stars: 5}
    }

    function handleRecipeUpdate(event) {

        event.preventDefault()

        fetch(`http://127.0.0.1:3006/recipes/${recipe.id}`, {
            method: 'PATCH',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(newRecipe)
        })
        .then(response => response.json())
        .then((data) => {
            handleUpdateRecipe(data)
        })
    }

    return (
        <form onSubmit={handleRecipeUpdate} className="newrecipe">
                <label>
                    Recipe Name
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                </label>
                <label>
                    Amazing Food Pics 📸
                    <input type="file" name="name" onChange={(e) => setImage(e.target.value)} value={image}/>
                </label>
                <label>
                    Instructions
                    <textarea type="text" instructions="instructions" onChange={(e) => setInstructions(e.target.value)} value={instructions}/>
                </label>
                <input type="submit" value="Post" />
        </form>
    )
}

export default UpdateRecipeForm;