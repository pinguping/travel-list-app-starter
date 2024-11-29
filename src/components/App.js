import React, { useState } from "react";

function Item({ item, onTogglePacked, onDeleteItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed} // controlled element
        onChange={() => onTogglePacked(item.id)} // toggle packed status
      />
      <span style={{ textDecoration: item.packed ? "line-through" : "none" }}>
        {item.description} ({item.quantity})
      </span>
      <button
        onClick={() => onDeleteItem(item.id)} // Use the correct prop name here
        style={{ marginLeft: "10px", color: "red" }}
      >
        X
      </button>
    </li>
  );
}

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ handleAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = {
      id: Date.now(), // unique ID
      description: description.trim(),
      quantity: quantity,
      packed: false,
    };

    handleAddItem(newItem);

    // reset form fields
    setDescription("");
    setQuantity("1");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <label htmlFor="quantity"></label>
      <select
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <label htmlFor="item-description"></label>
      <input
        type="text"
        id="item-description"
        name="description"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

function PackingList({ items, onTogglePacked, onDeleteItem, onClearAll }) {
  // Sort items: unpacked first, then packed
  const sortedItems = [...items].sort((a, b) => b.packed - a.packed);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onTogglePacked={onTogglePacked} // pass toggle function
            onDeleteItem={onDeleteItem} // pass delete function
          />
        ))}
      </ul>
      {items.length > 0 && (
        <button onClick={onClearAll} style={{ marginTop: "10px", color: "red" }}>
          Clear All
        </button>
      )}
    </div>
  );
}

function Stats({ items }) {
  const packedItems = items.filter((item) => item.packed).length;
  const totalItems = items.length;
  const percentage = totalItems ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>You got everything!</em>
      ) : (
        <em>
          You have {totalItems} items in the list. You already packed {packedItems} ({percentage}%).
        </em>
      )}
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handleTogglePacked(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleClearAll() {
    setItems([]); // Clear all items
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        onTogglePacked={handleTogglePacked} // pass toggle function
        onDeleteItem={handleDeleteItem} // pass delete function
        onClearAll={handleClearAll} // pass clear-all function
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
