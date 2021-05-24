import React from 'react'

function MyPostContainer({
    recipe: {id, name, time, image, instructions, user}
}) {
    
    return (
        <div className="postcontainer">
           <h1> {name} </h1> 
           <h3>{time}</h3>
           <h5>{user.name}</h5>
        </div>
    )
}

export default MyPostContainer;