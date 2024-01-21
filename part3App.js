import React, { useState } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import FoodMenu from './FoodMenu';
import DrinkMenu from './DrinkMenu';
import AddItem from './AddItem';
import NotFound from './NotFound';

const App = () => {
  const [foodItems, setFoodItems] = useState([
    { id: 1, name: 'Burger' },
    { id: 2, name: 'Pizza' },
    // Add more food items
  ]);

  const [drinkItems, setDrinkItems] = useState([
    { id: 1, name: 'Coffee' },
    { id: 2, name: 'Tea' },
    // Add more drink items
  ]);

  const handleAddItem = (item, type) => {
    if (type === 'food') {
      setFoodItems([...foodItems, { id: foodItems.length + 1, name: item }]);
    } else if (type === 'drink') {
      setDrinkItems([...drinkItems, { id: drinkItems.length + 1, name: item }]);
    }
  };

  const totalFoodItems = foodItems.length;
  const totalDrinkItems = drinkItems.length;

  return (
    <Router>
      <nav>
        <NavLink to="/" exact>
          Home
        </NavLink>
        <NavLink to="/snacks">Snacks ({totalFoodItems})</NavLink>
        <NavLink to="/drinks">Drinks ({totalDrinkItems})</NavLink>
      </nav>
      <Switch>
        <Route path="/" exact>
          <Home totalFoodItems={totalFoodItems} totalDrinkItems={totalDrinkItems} />
        </Route>
        <Route path="/snacks">
          <FoodMenu items={foodItems} type="snacks" />
        </Route>
        <Route path="/drinks">
          <DrinkMenu items={drinkItems} />
        </Route>
        <Route path="/add" exact>
          <AddItem onAddItem={handleAddItem} />
        </Route>
        <Route path="/add/food">
          <AddItem onAddItem={(item) => handleAddItem(item, 'food')} />
        </Route>
        <Route path="/add/drink">
          <AddItem onAddItem={(item) => handleAddItem(item, 'drink')} />
        </Route>
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
};

const Home = ({ totalFoodItems, totalDrinkItems }) => (
  <div>
    <h2>Welcome to Snack or Booze!</h2>
    <p>Total Snacks: {totalFoodItems}</p>
    <p>Total Drinks: {totalDrinkItems}</p>
  </div>
);

export default App;