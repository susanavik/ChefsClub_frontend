import React, { useState } from 'react'
import {useParams, Link} from "react-router-dom";
import { Button, Segment, Image, Icon, Label, Grid, GridColumn, Card, Form, CardGroup, Feed} from 'semantic-ui-react'

function PostItem({recipe, recipes, users, user, onClickUserId}) {
    // let match = useRouteMatch("/home/:id")
    let { id } = useParams();
    
    // console.log(users)
    // console.log(recipe)

    const ingredientObj = recipe.recipe_ingredients.map((item) => {
       return <li>{item.measurement} {item.ingredient.name}</li> 
    })
    // const ingredientName = recipe.recipe_ingredients.map((item) => {
    //     return <li>{item.ingredient.name}</li>
    // })
    
    // id, name, time, image, instructions, user, recipe_ingredients
    return (
        <Grid>
            <Button>
                <Link to="/myfeed/" center>
                    <h3>Back to my Feed</h3>
                </Link>
            </Button>
    <Grid.Row >
      <Grid.Column width={8}>
        <Card className="recipe-card-image" width="">
                <Card.Header className="recipe-details">
                    <h2>{recipe.name}</h2> 
                </Card.Header>
                
                <Image src={recipe.image} alt={recipe.name} width="400" height="240" frameBorder="0" 
                    className='post-image' size='medium' rounded/>
            </Card>
      </Grid.Column>
      <Grid.Column width={8}>
      <Card className="recipe-card-details">
            <Card.Header>
                <h2>Recipe Ingredients</h2>
            </Card.Header>
            <Card.Content>
                <Feed>
                    <Feed.Content>
                        <Feed.Summary>
                        <li>{ingredientObj}</li>
                        </Feed.Summary>
                    </Feed.Content>
                </Feed>
            </Card.Content>
        </Card>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row column={1}>
      <Grid.Column >
      <Card className="recipe-card-details">
            <Card.Header>
                <h2>Recipe Instructions</h2>
            </Card.Header>
                
            <Card.Content>
                <Feed>
                    <Feed.Content>
                        <Feed.Summary>
                        
                        {recipe.instructions}
                        </Feed.Summary>
                    </Feed.Content>
                </Feed>
            </Card.Content>
        </Card>
      </Grid.Column>
      
    </Grid.Row>
  </Grid>

        



       
    )
    // let history = useHistory()
    // let {id} = useParams()

    // console.log(id)
    // console.log(currentRecipe)

    // const [currentRecipeId, setCurrentRecipeId] = useState(parseInt(history.location.pathname.split("/")[2]))

    // useEffect(() => {
    //     updateCurrentRecipe(currentRecipeId)
    // }, []) 

    // //    console.log(currentRecipeId)
}
export default PostItem;