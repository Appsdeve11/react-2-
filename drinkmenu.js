import React from 'react';
import { Link } from 'react-router-dom';

const DrinkMenu = ({ items }) => (
  <div>
    <h2>Drink Menu</h2>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link to={`/drinks/${item.id}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default DrinkMenu;