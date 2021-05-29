import React, {useState, useDebugValue} from 'react'
import Modal from 'react-modal'
import {Form, Button, FormGroup, FormControl} from 'react-bootstrap';
import FormCheck from 'react-bootstrap/FormCheck'


function NewPostForm({addRecipe, addRecipeIngredients, currentUser, onUpdateCook}) {

    // console.log(currentUser)

    const [name, setName] = useState("")
    const [image, setImage] = useState("https://media.istockphoto.com/photos/assortment-of-fine-chocolate-candies-white-dark-and-milk-chocolate-picture-id1148258027?k=6&m=1148258027&s=612x612&w=0&h=NEiHmrApK8fRuf9ffg_XiJUXozlyi3QgLDgPJlGLuGE=")
    const [time, setTime] = useState("")
    const [instructions, setInstructions] = useState("")
    const [measurement, setMeasurement] = useState("")
    const [ingredientName, setIngredientName] = useState("")
    const [newRecipeId, setNewRecipeId] = useState()
    const [recipeIngredients, setRecipeIngredients] = useState()

    const [newIngredient, setNewIngredient] = useState('')
    const [likes, setLikes] = useState(0)

    const changeHandler = e => {
        setRecipeIngredients({...recipeIngredients, [e.target.name]: e.target.value})
     }

    // const [show, setShow] = useState()

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    function handleSubmit(event) {
        event.preventDefault()

        const newRecipe = {
            name,
            image,
            time: parseInt(time),
            instructions,
            user_id: currentUser.id,
            likes: 0,
            cooks: {comment: "", stars: 5},
            newRecipeId
        }
        
            fetch('http://127.0.0.1:3006/recipes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecipe)
        })

        .then(response => response.json())
        .then(recipe => {
            // addRecipe(recipe)
            console.log(recipe)
        })
    }

    function handleSubmitIngredient(event) {
        event.preventDefault()

        const RecipeIngredient = {
            newRecipeId,
            measurement,
            ingredientName
        }
        
            fetch('http://localhost:3006/recipe_ingredients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(RecipeIngredient)
        })

        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
    }

    const [newIngredientForm, setNewIngredientForm] = useState(false)

    function handleIngredientToggle() {
        setNewIngredientForm(!newIngredientForm)
    }
    
    return (
        <main>
            <Form onSubmit={handleSubmit} className="newrecipe">
                <h2>Let's see your incredible food creation!</h2>
                <FormGroup className="mb-3" controlId="RecipeName">
                    <Form.Label>Recipe Name</Form.Label>
                    <Form.Control type="text" placeholder="My Recipe's Name" 
                    value={name} onChange={(e) => setName(e.target.value)}/>
                </FormGroup>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Amazing Food Picture 📸</Form.Label>
                    <Form.Control type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="Tell us how you made your amazing recipe...">
                    <Form.Label>Instructions</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="a bunch of stirring and mixing and loving, ya know!"
                    value={instructions} onChange={(e) => setInstructions(e.target.value)}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Time</Form.Label>
                    <Form.Control type="text" 
                    value={time} onChange={(e) => setTime(e.target.value)}/>
                </Form.Group>
                <Button className="save-button" variant="primary" type="submit">
                    Save Recipe
                </Button>
            </Form>
            <h3>Recipe Ingredients</h3>
            {newIngredientForm && (
            <Form onSubmit={handleSubmitIngredient} className="new-ingredients">
                    <Form.Group>
                        <Form.Label>Recipe Ingredients</Form.Label>
                        <Form.Control type="text" placeholder="measurement&units"
                        value={measurement} onChange={(e) => setMeasurement(e.target.value)}/>
                        <Form.Control type="text" placeholder="ingredient name"
                        value={ingredientName} onChange={(e) => setIngredientName(e.target.value)}/>
                    </Form.Group>
                    <Button className="save-button" type="submit">
                        Save Ingredient
                    </Button>
            </Form>
            )}
            <button className="toggle" onClick={handleIngredientToggle}>
                    Add a New Ingredient
            </button>    
            
        </main>
        
    //     <form onSubmit={handleSubmit} className="newrecipe">
    //         <label>
    //             Recipe Name
    //             <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
    //         </label>
    //         <label>
    //             Amazing Food Pics 📸
    //             <input type="text" name="name" onChange={(e) => setImage(e.target.value)} value={image}/>
    //         </label>
    //         <label>
    //             Instructions
    //             <input type="text" instructions="instructions" onChange={(e) => setInstructions(e.target.value)} value={instructions}/>
    //         </label>
    //         <input type="submit" value="Post" />
    //     </form>
    
       
    )
}

export default NewPostForm;