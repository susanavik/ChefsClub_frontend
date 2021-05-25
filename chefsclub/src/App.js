import './App.css';
import React, {useState, useEffect} from 'react';
import Home from './Home';
import Login from './Login';
import FeedContainer from './FeedContainer';
import Header from './Header';
import PostDetails from './PostDetails';
import NewPostForm from './NewPostForm';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

  const [recipes, setRecipes] = useState([])
  const [cooks, setCooks] = useState([])
  const [currentRecipe, setCurrentRecipe] = useState({})
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [like, setLike] = useState(false)
  const [cooked, setCooked] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3006/recipes")
        .then(res => res.json())
        .then((recipes) => {
          setRecipes(recipes)
          console.log("recipe fetch")
        })
  }, [])

  useEffect(() => {
    fetch("http://localhost:3006/users")
        .then(res => res.json())
        .then(setUsers)
        .then(() => filteredUsers)
  }, [])

  function handleAddRecipe(newRecipe) {
    setRecipes([...recipes, newRecipe])
  }

  function handleCooked(newCooksObj) {
    setCooks([...cooks, newCooksObj])
  }

  function handleUpdateRecipe(updatedRecipe) {
    const updatedRecipes = recipes.map((recipe) => 
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
    setRecipes(updatedRecipes)
}

  function updateCurrentRecipe(currentRecipeId) {
      const filteredRecipe = recipes.filter((recipe) => recipe.id === currentRecipeId)[0]
      setCurrentRecipe(filteredRecipe)
      // console.log(currentRecipeId)
  }

  
  const filteredUsers = () => {
    const currUser = users.filter((user) => user.id === 61)
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
            <Home recipes={recipes} currentUser={currentUser}
            onUpdateRecipe={handleUpdateRecipe} onUpdateCook={handleCooked}
            cooks={cooks} setCooks={setCooks} like={like} setLike={setLike} 
            cooked={cooked} setCooked={setCooked}/>
            <Header />
          </Route>
          <Route path='/newpost'>
              <NewPostForm currentUser={currentUser} addRecipe={handleAddRecipe} onUpdateCook={handleCooked}/>
              <Header />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );

}

export default App;
