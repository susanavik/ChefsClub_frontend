import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Segment, Image, Icon, Label, Grid, GridColumn, Card, CardContent, Form } from 'semantic-ui-react'

function AllUserPage({users, onClickUserId}) {

    // console.log(users)
    return (
        <Grid >
            <Grid.Row >
                <Grid.Column>
                    <ul className="all-user-box">
                        {users.map((user) => (
                            <Card>
                                <Image src={user.image} />
                                <Link to={`/users/${user.id}`} >
                                    <Card.Content className="user-card"
                                    onClick={() => onClickUserId(user.id)}>
                                        {user.name}
                                    </Card.Content>
                                </Link>  
                            </Card>
                        ))}
                    </ul>
                </Grid.Column>
            </Grid.Row>
            
        </Grid>
    )
}
export default AllUserPage;
