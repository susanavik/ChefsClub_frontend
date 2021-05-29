import React from 'react'
import { Link } from 'react-router-dom';

function AllUserPage({users, onClickUserId}) {

    console.log(users)
    return (
        <main>
            <h1>All Users</h1>
            <ul>
                {users.map((user) => (
                    <div>
                        <Link to={`/users/${user.id}`} >
                            <li onClick={() => onClickUserId(user.id)}>{user.name}</li>
                        </Link>  
                        {/* <button>See More!</button>  */}
                    </div>
                ))}
            </ul>
        </main>
    )
}
export default AllUserPage;
