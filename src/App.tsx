import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [collection, setCollection] = useState<string[]>([]);

  const products = [
    {
      id: 1,
      name: "Pokemon Card",
      category: "Cards",
      price: 120,
    },
    {
      id: 2,
      name: "Vintage Coin",
      category: "Coins",
      price: 75,
    },
    {
      id: 3,
      name: "Rare Stamp",
      category: "Stamps",
      price: 50,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1000px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Collector's Hub Marketplace
      </h1>

      <h2>My Collection</h2>

      {collection.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <ul>
          {collection.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search collectibles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            padding: "10px",
            marginLeft: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="All">All Categories</option>
          <option value="Cards">Cards</option>
          <option value="Coins">Coins</option>
          <option value="Stamps">Stamps</option>
        </select>
      </div>

      {filteredProducts.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3>{product.name}</h3>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Price:</strong> ${product.price}
          </p>

          <button
            onClick={() =>
              setCollection([...collection, product.name])
            }
            style={{
              padding: "10px 15px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add to Collection
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;