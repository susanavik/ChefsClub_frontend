import React, {useState} from 'react'

function NewPostForm({addRecipe, currentUser, onUpdateCook}) {

    console.log(currentUser)

    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    const [time, setTime] = useState("")
    const [instructions, setInstructions] = useState("")
    const [ingredients, setIngredients] = useState({})


    function handleSubmit(event) {
        event.preventDefault()

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
        
            fetch('http://127.0.0.1:3006/recipes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecipe)
        })

        .then(response => response.json())
        .then(recipe => {
            addRecipe(recipe)
        })
    }

    function handleUpload() {}
    
    return (
        <form onSubmit={handleSubmit} className="newrecipe">
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

export default NewPostForm;