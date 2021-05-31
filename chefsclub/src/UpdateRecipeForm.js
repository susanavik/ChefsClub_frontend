import React, {useState} from 'react'
import { Button, Segment, Image, Icon, Label, Grid, GridColumn, Card, CardContent, Form, FormField } from 'semantic-ui-react'

function UpdateRecipeForm({currentUser, recipe, handleUpdateRecipe}) {

    const [name, setName] = useState(recipe.name)
    const [image, setImage] = useState()
    const [time, setTime] = useState(recipe.time)
    const [instructions, setInstructions] = useState(recipe.instructions)
    const [ingredients, setIngredients] = useState([])

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
        <Form onSubmit={handleRecipeUpdate} className="newrecipe">
            <Form.Field>
                <label>
                    Recipe Name
                    <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                </label>
            </Form.Field>
            <Form.Field>
                <label>
                    Time
                    <input type="text" name="name" onChange={(e) => setTime(e.target.value)} value={time} />
                </label>
            </Form.Field>
            <FormField>
                <label>
                    Amazing Food Pics 📸
                    <input type="file" name="name" onChange={(e) => setImage(e.target.value)} value={image}/>
                </label>
            </FormField>
            <Form.Field>
                <label>
                    Instructions
                    <textarea type="text" instructions="instructions" onChange={(e) => setInstructions(e.target.value)} value={instructions}/>
                </label>
            </Form.Field>
            <Button type="submit">Post</Button> 
        </Form>
    )
}

export default UpdateRecipeForm;