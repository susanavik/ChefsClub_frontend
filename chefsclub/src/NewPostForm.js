import React, {useState, useEffect} from 'react'

function NewPostForm({addRecipe}) {

    // console.log(addRecipe)
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        time: "",
        instructions: "",
        ingredients: ""
    })

    function handleChange(event) {
        setFormData({...formData,
        [event.target.name]: event.target.value})
    }


    function handleSubmit(event) {
        event.preventDefault()

        const newRecipe = {
            ...formData,
            likes: 0,
            cooks: 0
        }
        
        fetch('http://127.0.0.1:3006/recipes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecipe),
        })

        .then(response => response.json())
        .then(addRecipe)
    }

    function handleUpload() {}
    
    return (
        <form onSubmit={handleSubmit} className="newrecipe">
            <label>
                Recipe Name
                <input type="text" name="name" onChange={handleChange} value={formData.name} />
            </label>
            <label>
                Amazing Food Pics 📸
                <input type="file" name="name" onChange={handleChange} value={formData.image}/>
            </label>
            <label>
                Instructions
                <textarea type="text" instructions="instructions" onChange={handleChange} value={formData.instructions}/>
            </label>
            <input type="submit" value="Post" />
        </form>
    )
}

export default NewPostForm;