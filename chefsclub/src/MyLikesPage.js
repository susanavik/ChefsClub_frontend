import React from 'react'

function MyLikesPage(props) {
    console.log("My Like", props.recipes);

    const user_id = props.currentUser.id;
    // filter likes
    let my_likes = props.recipes.filter(item => {
        let likes = item.likes;
        let filtered = likes.filter(row => row.user_id == user_id);        
        
        return filtered.length > 0;
    });

    return (
        <div>
        <h1>My likes</h1>
        {
            my_likes.map(item => (
                <div>
                    {item.name}
                </div>
            ))
        }
        </div>

    )
}

export default MyLikesPage;