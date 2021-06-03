import React, {useState} from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Button, Header, Image, Icon, Label, Grid, GridColumn, Card, Form, CardGroup, Feed} from 'semantic-ui-react'


function MyLikesPage(props) {
    console.log("My Like", props.currentUser.likes);
    
    // console.log(props.onClickRecipeId)
    // console.log(props)

    const user_likes = props.currentUser.likes.map((like) => like.recipe)

    console.log(user_likes)

    const user_id = props.currentUser.id;

    // filter likes
    // let my_likes = props.recipes.filter(item => {
    //     let likes = item.likes;
    //     let filtered = likes.filter(row => row.user_id == user_id);        
        
    //     return filtered.length > 0;
    // });

    // console.log(my_likes)

    const [showComment, setShowComment] = useState(false)
    const [comments, setComments] = useState(false)
    const [like, setLike] = useState(true)
    const [likesCount, setLikesCount] = useState(user_likes.length)

    function handleShowComment() {
        setComments(!comments)
    }

    function handleLikeClick() {
        setLike(!like)
    }

    const [likes, setLikes] = useState(0)

    return (
    <div>
        <Header as='h2' icon textAlign='center'>
            <Icon name='heart outline' circular />
            {/* <Header.Content>Food Feast Feed</Header.Content> */}
        </Header>
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
        
       

       <Grid centered>
        <Grid.Row column={2} className="home-post-container">
        <Grid.Column width={4} className="cooks-post-container" centered>
           {props.currentUser.likes.map((like) => (
                <Card>
                    {/* <Card.Header>{like.recipe.name}</Card.Header>  */}
                    <Image src={like.recipe.image} alt={like.recipe.name} width="400" height="240" frameBorder="0" 
                     className='post-image' size='medium' rounded/>
                     <Card.Content>
                        <Card.Header as='h2' key={like.recipe.id} >{like.recipe.name}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                    { like ? (
                        <Button onClick={handleLikeClick} content='Liked' basic color='red'
                        className="like-button"
                         size="mini" circular>
                        liked!💗
                        </Button>
                        ) : (
                        <Button onClick={handleLikeClick} basic color='red'
                        className="like-button-active" size="mini" circular> 
                          🤍
                        </Button>
                        )
                    }   
                    </Card.Content>    
                </Card>
                
           ))}
           </Grid.Column> 
            </Grid.Row>  
        </Grid>  
    </div>
    )
}

export default MyLikesPage;
