import React, {useState, useDebugValue} from 'react'
import Modal from 'react-modal'
// import {Form, Button, FormGroup, FormSelect} from 'react-bootstrap';
// import { MultiSelect } from '@material-ui/core';
import { Multiselect } from 'multiselect-react-dropdown';
import FormCheck from 'react-bootstrap/FormCheck'
import { Button, Dropdown, Image, Icon, Label, Grid, GridColumn, Card, CardContent, Form, FormField } from 'semantic-ui-react'

function NewPostForm({addRecipe, addRecipeIngredients, currentUser, onUpdateCook, 
    ingredients, handleAddIngredient}) {

    // console.log(ingredients)
    

    // console.log(ingredientObj)

    const [name, setName] = useState("")
    const [image, setImage] = useState("https://media.istockphoto.com/photos/assortment-of-fine-chocolate-candies-white-dark-and-milk-chocolate-picture-id1148258027?k=6&m=1148258027&s=612x612&w=0&h=NEiHmrApK8fRuf9ffg_XiJUXozlyi3QgLDgPJlGLuGE=")
    const [time, setTime] = useState("")
    const [instructions, setInstructions] = useState("")
    const [measurement, setMeasurement] = useState("")
    const [ingredient, setIngredient] = useState("")
    // const [newIngredient, setNewIngredient] = useState({})
    const [newRecipeId, setNewRecipeId] = useState() 

    const [recipeIngredients, setRecipeIngredients] = useState([])

    function addNewIngredient() {
        // setRecipeIngredients[...recipeIngredients]
    }

    // const ingredientObj = ingredients.map(ingredient, {key: ingredient.id, text: ingredient.name})


    const [newIngredient, setNewIngredient] = useState('')
    const [likes, setLikes] = useState(0)

    // const changeHandler = e => {
    //     setRecipeIngredient({...recipeIngredient, [e.target.name]: e.target.value})
    //  }

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
            newRecipeId,
            recipeIngredients
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

        // const RecipeIngredient = {
        //     newRecipeId,
        //     measurement,
        //     ingredient
        // }
        
        //     fetch(`http://localhost:3006/recipe_ingredients/`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(RecipeIngredient)
        // })

        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        // })

    }

    // const [newIngredientForm, setNewIngredientForm] = useState(false)

    // function handleIngredientToggle() {
    //     setNewIngredientForm(!newIngredientForm)
    // }
    
    // function handleIngredientSubmit(event) {
    //     event.preventDefault()

    //     const newIngredient = {
    //         ingredient
    //     }
        
    //         fetch('http://127.0.0.1:3006/ingredients/', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(newIngredient)
    //     })

    //     .then(response => response.json())
    //     .then(data => {
    //         handleAddIngredient(data)
    //         console.log(data)
    //     })
    // }

    return (
        <main>
            <Form onSubmit={handleSubmit} className="newrecipe">
                <h2>Let's see your incredible food creation!</h2>
                <Form.Field className="mb-3" controlId="RecipeName">
                    <label>Recipe Name</label>
                    <input type="text" placeholder="My Recipe's Name" 
                    value={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field controlId="formFile" className="mb-3">
                    <label>Amazing Food Picture 📸</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
                </Form.Field>
                <Form.Field className="mb-3" controlId="Tell us how you made your amazing recipe...">
                    <label>Instructions</label>
                    <Form.Field as="textarea" rows={3} placeholder="a bunch of stirring and mixing and loving, ya know!"
                    value={instructions} onChange={(e) => setInstructions(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Time ⏲️</label>
                    <input type="text" 
                    value={time} onChange={(e) => setTime(e.target.value)}/>
                </Form.Field>
                <Form.TextArea label='Magic Ingredients🎟️' placeholder='Add your ingredients...' 
                value={recipeIngredients} onChange={(e) => setRecipeIngredients(e.target.value)}/>
                <Button className="save-button" variant="primary" type="submit" color='pink'>
                    Save Recipe
                </Button>
                {/* <ul>
                    <li>{measurement} {ingredient} </li>
                </ul> */}
            </Form>
            {/* <h5>Don't see you deloved Ingredient? Add it here! </h5> */}
            {/* {newIngredientForm && (
            <Form onSubmit={handleIngredientSubmit} className="new-ingredients">
                    <Form.Field>
                        <label>New Ingredient</label>
                        <input type="text" placeholder="ingredient name"
                        value={ingredient} onChange={(e) => setIngredient(e.target.value)}/>
                    </Form.Field> */}
                        
                        {/* <Dropdown
                            placeholder='Select an ingredient'
                            fluid
                            selection
                            options={ingredients} displayValue='name'
                        /> */}
                            {/* <Multiselect type="text" selectedvalues={ingredient} 
                            onSelect={onSelect} onRemove={onRemove} options={ingredients} 
                            displayValue="name"
                            /> */}
                            {/* <label>Measurement</label>
                            <input type="text" 
                            value={measurement} onChange={(e) => setMeasurement(e.target.value)}/> */}
                    
                    {/* <Button className="save-button" type="submit">
                        Save Ingredient
                    </Button>
            </Form>
            )}
            <Button className="toggle" onClick={handleIngredientToggle}>
                    Add a New Ingredient
            </Button>     */}
            
        </main>
    )
            }
        
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
    
    // import React from 'react';
    // import { makeStyles } from '@material-ui/core/styles';
    // import InputLabel from '@material-ui/core/InputLabel';
    // import MenuItem from '@material-ui/core/MenuItem';
    // import FormControl from '@material-ui/core/FormControl';
    // import Select from '@material-ui/core/Select';
    // import Button from '@material-ui/core/Button';
    
    // const useStyles = makeStyles((theme) => ({
    //   button: {
    //     display: 'block',
    //     marginTop: theme.spacing(2),
    //   },
    //   formControl: {
    //     margin: theme.spacing(1),
    //     minWidth: 120,
    //   },
    // }));
    
    // export default function ControlledOpenSelect() {
    //   const classes = useStyles();
    //   const [age, setAge] = React.useState('');
    //   const [open, setOpen] = React.useState(false);
    
    //   const handleChange = (event) => {
    //     setAge(event.target.value);
    //   };
    
    //   const handleClose = () => {
    //     setOpen(false);
    //   };
    
    //   const handleOpen = () => {
    //     setOpen(true);
    //   };
    
    //   return (
    //     <div>
    //       <Button className={classes.button} onClick={handleOpen}>
    //         Open the select
    //       </Button>
    //       <FormControl className={classes.formControl}>
    //         <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
    //         <Select
    //           labelId="demo-controlled-open-select-label"
    //           id="demo-controlled-open-select"
    //           open={open}
    //           onClose={handleClose}
    //           onOpen={handleOpen}
    //           value={age}
    //           onChange={handleChange}
    //         >
    //           <MenuItem value="">
    //             <em>None</em>
    //           </MenuItem>
    //           <MenuItem value={10}>Ten</MenuItem>
    //           <MenuItem value={20}>Twenty</MenuItem>
    //           <MenuItem value={30}>Thirty</MenuItem>
    //         </Select>
    //       </FormControl>
    //     </div>
    //   );
    // }
    
    


export default NewPostForm;