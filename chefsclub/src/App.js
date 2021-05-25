import './App.css';
import React, {useState, useEffect} from 'react';
import Home from './Home';
import Login from './Login';
import FeedContainer from './FeedContainer';
import Header from './Header';
import PostDetails from './PostDetails';
import NewPostForm from './NewPostForm';
import MyCooksPage from './MyCooksPage';
import MyLikesPage from './MyLikesPage';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

  const [recipes, setRecipes] = useState([])
  const [cooks, setCooks] = useState([])
  const [currentRecipe, setCurrentRecipe] = useState({})
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [like, setLike] = useState(false)
  const [cooked, setCooked] = useState([])

  useEffect(() => {
    fetch("http://localhost:3006/recipes")
        .then(res => res.json())
        .then((recipes) => {
          setRecipes(recipes)
          console.log("recipe fetch")
        })
  }, [])

  useEffect(() => {
    fetch("http://localhost:3006/users/64")
        .then(res => res.json())
        .then((data) => {
          setCurrentUser(data)})
        // .then((data) => {
        //   console.log(currentUser)
        //   filteredUsers(data)})
  }, [])

  function handleAddRecipe(newRecipe) {
    setRecipes([...recipes, newRecipe])
  }

  function handleCooked(newCooksObj) {
    setCooks([...cooks, newCooksObj])
  }

  

  function handleUpdateRecipe(updatedRecipe) {
    console.log(updatedRecipe)
    const updatedRecipes = recipes.map((recipe) => 
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
    setRecipes(updatedRecipes)
}

  function updateCurrentRecipe(currentRecipeId) {
      // const filteredRecipe = recipes.filter((recipe) => recipe.id === currentRecipeId)[0]
      // setCurrentRecipe(filteredRecipe)
      console.log(currentRecipeId)
      
  }

  // function updateCooks(currentR)

  function updateLikes(likeObject) {
      let newRecipes = recipes.map((recipe) => {
        if (recipe.id === likeObject.recipe_id) {
          let newLikes = [...recipe.likes, likeObject]
          recipe.likes = newLikes
          return recipe
        } else {
          return recipe
        }
      })
      setRecipes(newRecipes)
      console.log(newRecipes)
  }

  function updateCooks(cookObject) {
    let newRecipes = recipes.map((recipe) => {
      if (recipe.id === cookObject.recipe_id) {
        let newCooks = [...recipe.cooks, cookObject]
        recipe.cooks = newCooks
        return recipe
      } else {
        return recipe
      }
    })
    setRecipes(newRecipes)
    // setCooks(newRecipes)
    console.log(newRecipes)
  }

  // function filteredCooked() {
  //   let cookedRecipes
  // }

  const filteredUsers = () => {
    const currUser = users.filter((user) => user.id === 64)
    // console.log({currUser, users, currentUser})
    setCurrentUser(currUser)
  }

  return (
    <div className="App">
      <h1>Welcome to Chef's Club👩‍🍳</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' >
            <Login />
          </Route>
          <Route exact path='/myfeed'>
            <FeedContainer recipes={recipes} onUpdateRecipe={handleUpdateRecipe}
            cooks={cooks} setCooks={setCooks} like={like} setLike={setLike} 
            cooked={cooked} setCooked={setCooked} />
            <Header />
          </Route>
          <Route exact path='/myfeed/:id'>
              <PostDetails currentRecipe={currentRecipe} updateCurrentRecipe={updateCurrentRecipe}
              />
          </Route>
          <Route exact path='/home'>
            <Home recipes={recipes} setRecipes={setRecipes} currentUser={currentUser}
            onUpdateRecipe={handleUpdateRecipe} updateLikes={updateLikes} onUpdateCook={handleCooked}
            cooks={cooks} setCooks={setCooks} like={like} setLike={setLike} 
            cooked={cooked} setCooked={setCooked} users={users} updateCooks={updateCooks} />
            <Header />
          </Route>
          <Route path='/newpost'>
              <NewPostForm currentUser={currentUser} addRecipe={handleAddRecipe} onUpdateCook={handleCooked}/>
              <Header />
          </Route>
          <Route exact path='/mylikes'>
              <MyLikesPage like={like} setLike={setLike} recipes={recipes} />
          </Route>
          <Route exact path='/mycooks'>
              <MyCooksPage cooked={cooked} cooks={cooks} setCooked={setCooked} recipes={recipes} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );

}

export default App;
