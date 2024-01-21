import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddItem = ({ onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('food');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddItem(itemName, itemType);
    setItemName('');
    setItemType('food');
    history.push('/');
  };

  return (
    <div>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Item Name:
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </label>
        <br />
        <label>
          Item Type:
          <select value={itemType} onChange={(e) => setItemType(e.target.value)}>
            <option value="food">Food</option>
            <option value="drink">Drink</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItem;