import React from 'react';
import { Link } from 'react-router-dom';

const FoodMenu = ({ items, type }) => (
  <div>
    <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Menu</h2>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link to={`/snacks/${item.id}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default FoodMenu;