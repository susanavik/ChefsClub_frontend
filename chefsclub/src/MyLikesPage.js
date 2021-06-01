import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Button, Segment, Image, Icon, Label, Grid, GridColumn, Card, Form, CardGroup, Feed} from 'semantic-ui-react'


function MyLikesPage(props) {
    console.log("My Like", props.recipes);
    // console.log(props.onClickRecipeId)

    const user_id = props.currentUser.id;
    // filter likes
    let my_likes = props.recipes.filter(item => {
        let likes = item.likes;
        let filtered = likes.filter(row => row.user_id == user_id);        
        
        return filtered.length > 0;
    });

    return (
    <div>
        <nav className="profile-nav-bar" attached="top">
            <Button.Group className='header-btn'>
                <Link to='/home'>
                    <Button basic color='pink' inverted>My Recipes</Button>
                </Link>
                <Link to='/mylikes'>
                    <Button basic color='pink' inverted>My Likes</Button>
                </Link>
                <Link to='/mycooks'>
                    <Button basic color='pink' inverted>My Cooks</Button>
                </Link>
            </Button.Group>
        </nav>
            
        <h1>My likes</h1>
        {my_likes.map(item => (
            <Card>
            <Card.Header>{item.name}</Card.Header>
            <Image src={item.image} wrapped ui={false} 
            label={{ as: 'a', corner: 'left', icon: 'heart' }} size='medium' rounded/>
                <Card.Content>
                    <Link to={`/recipes/${item.id}`}>
                        <Card.Header as='h2' key={item.id} onClick={() => props.onClickRecipeId(item.id)}>
                            {item.name}
                        </Card.Header>
                    </Link> 
                </Card.Content>
            </Card>
            ))}
        </div>
    )
}

export default MyLikesPage;