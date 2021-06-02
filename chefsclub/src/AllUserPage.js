import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Segment, Image, Icon, Label, Grid, GridColumn, Card, Header, Form, List } from 'semantic-ui-react'
import UserPostContainer from './UserPostContainer';

function AllUserPage({users, onClickUserId}) {

    // console.log(users)
    return (
    <div>
        <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        {/* <Header.Content>Food Feast Feed</Header.Content> */}
        </Header>
    <Grid centered>
        <Grid.Row column={2} className='user-row'>
                    {users.map((user) => (
                        <Grid.Column width={6} className='user-column'>
                            <div className='user-div'>
                            <Image src={user.image} size='small' className="user-image-profile"/>
                            <Link to={`/users/${user.id}`} className='c'>
                                <List.Header as='h2' className="user-name" 
                                onClick={() => onClickUserId(user.id)} color='red'>
                                    {user.name}
                                </List.Header>
                                <List.Header as='h4' className="user-username"> ✏️{user.username}</List.Header>   
                            </Link>
                            </div>
                                
                        </Grid.Column>
                    ))}
        </Grid.Row>
    </Grid>
    </div> 
    )
    
}
export default AllUserPage;
