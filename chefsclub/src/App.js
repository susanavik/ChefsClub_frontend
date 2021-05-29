import './App.css';
import React, {useState, useEffect} from 'react';
import Home from './Home';
import Login from './Login';
import FeedContainer from './FeedContainer';
import Header from './Header';
import NewPostForm from './NewPostForm';
import MyCooksPage from './MyCooksPage';
import MyLikesPage from './MyLikesPage';
import PostItem from './PostItem';
import UserShowPage from './UserShowPage'
import AllUserPage from './AllUserPage'

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

  const [recipes, setRecipes] = useState([])
  const [cooks, setCooks] = useState([])
  const [currentRecipe, setCurrentRecipe] = useState({})
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [cookedRecipe, setCookedRecipe] = useState({})
  const [selectedRecipeId, setSelectedRecipeId] = useState(null)
  const [recipeIngredients ,setRecipeIngredients] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3006/recipes")
        .then(res => res.json())
        .then(setRecipes)
  }, [])

  useEffect(() => {
    fetch("http://localhost:3006/users/74")
        .then(res => res.json())
        .then((data) => {
          setCurrentUser(data)})
        // .then((data) => {
        //   console.log(currentUser)
        //   filteredUsers(data)})
  }, [])

  useEffect(() => {
    fetch("http://localhost:3006/cooks")
        .then(res => res.json())
        .then((data) => {
          setCooks(data)})
        // .then((data) => {
        //   console.log(currentUser)
        //   filteredUsers(data)})
  }, [])

  useEffect(() => {
    fetch("http://localhost:3006/users")
        .then(res => res.json())
        .then((data) => {
          setUsers(data)})
  }, [])

  function handleAddRecipe(newRecipe) {
    setRecipes([...recipes, newRecipe])
  }

  function addRecipeIngredients(newRecipeIngredient) {
    // setRecipeIngredients([...recipeIngredients, newRecipeIngredient])
    console.log(newRecipeIngredient)
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

  function updateCooks(cookObject) {
    setCookedRecipe(cookObject)
    console.log(cookObject)
    // setCooked(!cooked)
  }

  function onRemoveRecipe(id) {
    const newRecipes = recipes.filter((recipe) => recipe.id !== id)
    console.log(newRecipes)
    setRecipes(newRecipes)
  }

  const [likedRecipes, setLikedRecipes] = useState([])

  function updateLikes(likeObject) {
      setLikedRecipes(likeObject)
      console.log(likeObject)
  }

  const [cookedRecipes, setCookedRecipes] = useState([])
  
  function filteredCookedRecipes(cooked) {
    console.log(cooked)
    let cookedRecipes = recipes.map((recipe) => {
      if (recipe.id === cooked.recipe_id) {
        let newCooks = [...recipe.cooks, cooked]
        recipe.cooks = newCooks
        return recipe
      } else {
        return recipe
      }
      })
      console.log(cookedRecipes)
      setCookedRecipes(cookedRecipes)
    }

    function filterLikedRecipes(likedObj) {
      let newRecipes = recipes.map((recipe) => {
        if (recipe.id === likedObj.recipe_id) {
          let newLikes = [...recipe.likes, likedObj]
          recipe.likes = newLikes
          return recipe
        } else {
          return recipe
        }
      })
    }

  const filteredUsers = () => {
    const currUser = users.filter((user) => user.id === 74)
    // console.log({currUser, users, currentUser})
    setCurrentUser(currUser)
  }

  const selectedRecipe = recipes.find((recipe) => recipe.id === selectedRecipeId);
  const selectedUser = users.find((user) => user.id === selectedUserId)

  return (
    <div className="App">
      <h1>Welcome to Chef's Club👩‍🍳</h1>
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' >
            <Login />
          </Route>
          <Route exact path='/myfeed'>
            <FeedContainer recipes={recipes} onUpdateRecipe={handleUpdateRecipe} currentUser={currentUser}
            cooks={cooks} setCooks={setCooks} updateCooks={updateCooks} 
            onClickRecipe={setSelectedRecipeId} onClickUserId={setSelectedUserId}
            user={selectedUser}/>
            <Header />
          </Route>
          <Route exact path='/myfeed/:id'>
              <PostItem recipes={recipes}
                recipe={selectedRecipe} 
                currentUser={currentUser} user={selectedUser}
              />
          </Route>
          <Route exact path='/home'>
            <Home recipes={recipes} setRecipes={setRecipes} currentUser={currentUser}
            handleUpdateRecipe={handleUpdateRecipe} updateLikes={updateLikes} onUpdateCook={handleCooked}
            cooks={cooks} setCooks={setCooks} users={users} updateCooks={updateCooks} onRemoveRecipe={onRemoveRecipe}
            filteredCookedRecipes={filteredCookedRecipes} filterLikedRecipes={filterLikedRecipes} 
            onClickUserId={setSelectedUserId} onClickRecipe={setSelectedRecipeId} 
            />
            <Header />
          </Route>
          <Route exact path='/users/'>
            <AllUserPage recipes={recipes} users={users} onClickUserId={setSelectedUserId}/>
            <Header />
          </Route>
          <Route exact path='/users/:id'>
            <UserShowPage recipes={recipes} setRecipes={setRecipes} currentUser={currentUser}
            handleUpdateRecipe={handleUpdateRecipe} updateLikes={updateLikes} onUpdateCook={handleCooked}
            cooks={cooks} setCooks={setCooks} updateCooks={updateCooks} onRemoveRecipe={onRemoveRecipe}
            filteredCookedRecipes={filteredCookedRecipes} filterLikedRecipes={filterLikedRecipes} 
            onClickUserId={setSelectedUserId} onClickRecipe={setSelectedRecipeId} users={users}
            user={selectedUser}
            />
            <Header />
          </Route>
          <Route exact path='/newpost'>
              <NewPostForm currentUser={currentUser} addRecipe={handleAddRecipe} 
              onUpdateCook={handleCooked} addRecipeIngredients={addRecipeIngredients}/>
              <Header />
          </Route>
          <Route exact path='/mylikes'>
              <MyLikesPage recipes={likedRecipes} currentUser={currentUser}
              onClickId={setSelectedUserId}/>
          </Route>
          <Route exact path='/mycooks'>
              <MyCooksPage 
              recipes={cookedRecipes} currentUser={currentUser} 
              onClickUserId={setSelectedUserId}/>
          </Route>
            <Route exact path='/recipes/:id'>
                <PostItem recipes={recipes}
                recipe={selectedRecipe} 
                onClickUserId={setSelectedUserId} users={users}/>
              </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );

}

export default App;
