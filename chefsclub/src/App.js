import './App.css';
import React, {useState, useEffect} from 'react';
import Home from './Home';
import Login from './Login';
import FeedContainer from './FeedContainer';
import Header from './Header';
import ProfilePage from './ProfilePage';
import PostDetails from './PostDetails';
import NewPostForm from './NewPostForm'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {

  const [recipes, setRecipes] = useState([])
  const [cooks, setCooks] = useState([])

  useEffect(() => {
    fetch("http://localhost:3006/recipes")
        .then(res => res.json())
        .then(setRecipes)
  }, [])

  // useEffect(() => {
  //   fetch("http://localhost:3006/recipes")
  //       .then(res => res.json())
  //       .then(setUsers)
  // }, [])

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

  return (
    <div className="App">
      <h1>Welcome to Chef's Club👩‍🍳</h1>
      <BrowserRouter>
        <Switch>
          <Route path='/login' >
            <Login />
          </Route>
          <Route path='/myfeed'>
            <FeedContainer recipes={recipes} onUpdateRecipe={handleUpdateRecipe}/>
            <Header />
          </Route>
          <Route path='/myfeed/:id'>
              <PostDetails />
          </Route>
          <Route path='/profile'>
            <ProfilePage />
            <Header />
          </Route>
          <Route path='/home'>
              <Home recipes={recipes}/>
              <Header />
          </Route>
          <Route path='/newpost'>
              <NewPostForm addRecipe={handleAddRecipe} onUpdateCook={handleCooked}/>
              <Header />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );

}

export default App;
