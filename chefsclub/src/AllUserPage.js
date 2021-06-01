import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Segment, Image, Icon, Label, Grid, GridColumn, Card, Header, Form, List } from 'semantic-ui-react'
import UserPostContainer from './UserPostContainer';

function AllUserPage({users, onClickUserId}) {

    // console.log(users)
    return (
        // <Grid >
        //     <Grid.Row >
        //             <ul className="all-user-box">
                  
        //                 {users.map((user) => (
                            
        //                     <Card>
        //                         <Image src={user.image} />
        //                         <Link to={`/users/${user.id}`} >
        //                             <Card.Header as='h2' className="user-name" 
        //                             onClick={() => onClickUserId(user.id)}>
        //                                 {user.name}
        //                             </Card.Header>
        //                         </Link>  
                            
        //                     </Card>
        //                 ))}
        //             </ul>
        //     </Grid.Row>
        // </Grid>
        <List>
            {users.map((user) => (
                <List.Item>
                    <Image src={user.image} size='small' circular/>
                    <Link to={`/users/${user.id}`} >
                        <List.Header as='h2' className="user-name" 
                        onClick={() => onClickUserId(user.id)} >
                            {user.name}
                        </List.Header>
                    </Link>  
                            
                </List.Item>
            ))}
        </List>
    )
}
export default AllUserPage;
