import React, {useState, useEffect} from 'react';
import MyPostContainer from './MyPostContainer';
import MyProfileDetails from './MyProfileDetails';

function Home({recipes}) {
    
    // console.log(username)
    // const recipeitem = recipes.map(recipe => {
    //     <MyPostContainer key={recipe.id} recipe={recipe} user={recipe.user}/>
    // })

    const [users, setUsers] = useState([])
    const [userRecipes, setUserRecipes] = useState([])

    useEffect(() => {
        fetch("http://localhost:3006/users")
            .then(res => res.json())
            .then(setUsers)
    }, [])

    const recipeItem = (userId) => {
        const filteredRecipes = recipes.filter((recipe) => recipe.user !== userId)
        setUserRecipes(filteredRecipes)
    }

    return (
        <main>
            <h1></h1>
            <ul> 
                {recipeItem}
                {/* {recipes.map((recipe) => (
                    <MyPostContainer key={recipe.id} recipe={recipe} users={users} />
                ))} */}
            </ul>
        </main>
    )
}

export default Home;