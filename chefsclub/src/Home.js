import React, {useState, useEffect} from 'react';
import MyPostContainer from './MyPostContainer';
import MyProfileDetails from './MyProfileDetails';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import MyCooksPage from './MyCooksPage';
import MyLikesPage from './MyLikesPage';

function Home({recipes, currentUser, cooks, setCooks, like, setLike, cooked, setCooked}) {
    
    console.log(currentUser)

    // console.log(username)
    // const recipeitem = recipes.map(recipe => {
    //     <MyPostContainer key={recipe.id} recipe={recipe} user={recipe.user}/>
    // })

    // const [users, setUsers] = useState([])


    // useEffect(() => {
    //     fetch("http://localhost:3006/users")
    //         .then(res => res.json())
    //         .then(setUsers)
    // }, [])

    const filteredRecipes = recipes.filter((recipe) => recipe.user.id === 61)

    // const [userRecipe, setUserRecipe] = useState({
    //     recipes.filter((recipe) => recipe.user.id !== userId)
    // })

    return (
        <div>
            <div>
                <img src="https://pbs.twimg.com/profile_images/1213998484669337601/VxCF6Xjq.jpg" alt="..." width="130" class="rounded mb-2 img-thumbnail" /> 
                <h4 className="mt-0 mb-0">Susana Vik</h4>
                <p className="small mb-4"> <i className="fas fa-map-marker-alt mr-2"></i>✏️Welcome2SuCasa</p>
                <Link to='/mylikes'>
                    <h3>My Likes</h3>
                </Link>
                <Link to='/mycooks'>
                    <h3>My Cooks</h3>
                </Link>
                <ul>
                    {filteredRecipes.map((recipeObj) => (
                        <MyPostContainer recipeObj={recipeObj} key={recipeObj.id} 
                        cooks={cooks} setCooks={setCooks} like={like} setLike={setLike} cooked={cooked} setCooked={setCooked}/>
                    ))}
                </ul>
            </div>
            <nav>
                <BrowserRouter >
                <Switch>
                    <Route exact path='/mylikes'>
                    <MyLikesPage />
                    </Route>
                    <Route exact path='/mycooks'>
                    <MyCooksPage />
                    </Route>
                </Switch>
            </BrowserRouter>
            </nav>
        </div>
            
        
        
  
    )
}

export default Home;