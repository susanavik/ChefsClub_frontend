import React, { useState } from 'react'
import {useParams, Link} from "react-router-dom";
import { Button, Reveal, Image, Icon, Header, Grid, GridColumn, Card, Form, CardGroup, Feed} from 'semantic-ui-react'

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
    <div>
        <Button className="back-to-feed-btn" attached='top'>
                <Link to="/myfeed/" >
                    <h3>Back to my Feed</h3>
                </Link>
        </Button>
        <Header as='h2'>{recipe.name}</Header>
    <Grid centered className='recipe-detail-grid' columns={2}>     
    <Grid.Column centered className="recipe-detail-row" >
        <Card className="recipe-card-details" centered> 
        <Reveal animated='move'>
                <Reveal.Content visible className="reveal-post-image">
                    <Image src={recipe.image} width='500' height='240' frameBorder='0'
                    className='post-image' size='large' rounded/>
                </Reveal.Content>
                <Reveal.Content hidden>
                    <Feed.Summary>
                        <h2>Recipe Ingredients</h2>
                        <li className='ingredient-li'>{ingredientObj}</li>
                    </Feed.Summary>
                </Reveal.Content>
            </Reveal>
        </Card>
     </Grid.Column>

    <Grid.Row centered columns={4}>
    <Grid.Column width={14}>
        <Card className="recipe-card-instructions" centered >
            <Card.Header>
                <h2>Recipe Instructions</h2>
            </Card.Header>
                
            <Card.Content className="recipe-instructions">
                {/* <Feed>
                    <Feed.Content>
                        <Feed.Summary> */}
                        {recipe.instructions}
                        {/* </Feed.Summary>
                    </Feed.Content>
                </Feed> */}
            </Card.Content>
        </Card> 
    </Grid.Column>
    </Grid.Row>
  </Grid>
</div>

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