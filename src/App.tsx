import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [collection, setCollection] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const products = [
    {
      id: 1,
      name: "Pokemon Card",
      category: "Cards",
      price: 120,
      image: "https://picsum.photos/200?random=1",
    },
    {
      id: 2,
      name: "Vintage Coin",
      category: "Coins",
      price: 75,
      image: "https://picsum.photos/200?random=2",
    },
    {
      id: 3,
      name: "Rare Stamp",
      category: "Stamps",
      price: 50,
      image: "https://picsum.photos/200?random=3",
    },
  ];
  
  const posts = [
  {
    id: 1,
    user: "Ramya",
    image: "https://picsum.photos/300?random=10",
    caption: "Check out my rare Pokemon card!",
    likes: 12,
    comments: 4,
  },
  {
    id: 2,
    user: "Alex",
    image: "https://picsum.photos/300?random=11",
    caption: "My vintage coin collection!",
    likes: 8,
    comments: 2,
  },
];

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "low") {
        return a.price - b.price;
      }

      if (sortOrder === "high") {
        return b.price - a.price;
      }

      return 0;
    });

  const addToCollection = (productName: string) => {
    if (collection.includes(productName)) {
      alert("Item already exists in Collection!");
      return;
    }

    setCollection([...collection, productName]);
  };

  const addToWishlist = (productName: string) => {
    if (wishlist.includes(productName)) {
      alert("Item already exists in Wishlist!");
      return;
    }

    setWishlist([...wishlist, productName]);
  };

  const removeFromCollection = (index: number) => {
    setCollection(collection.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      {/* Navbar */}
      <div
        style={{
          background: "#2563eb",
          color: "white",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <h2>Collector's Hub</h2>
      </div>

      <h1 style={{ textAlign: "center" }}>
        Collector's Hub Marketplace
      </h1>

      {/* Collection */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>My Collection</h2>

        {collection.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <ul>
            {collection.map((item, index) => (
              <li key={index}>
                {item}

                <button
                  onClick={() =>
                    removeFromCollection(index)
                  }
                  style={{
                    marginLeft: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Wishlist */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2>Wishlist</h2>

        {wishlist.length === 0 ? (
          <p>No wishlist items.</p>
        ) : (
          <ul>
            {wishlist.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Search + Filter + Sort */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search collectibles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
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

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: "10px",
            marginLeft: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="default">Sort By</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>
      </div>

      {/* Products */}
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />

          <h3>{product.name}</h3>

          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <p>
            <strong>Price:</strong> ${product.price}
          </p>

          <button
            onClick={() =>
              addToCollection(product.name)
            }
            style={{
              padding: "10px",
              marginRight: "10px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add to Collection
          </button>

          <button
            onClick={() =>
              addToWishlist(product.name)
            }
            style={{
              padding: "10px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add to Wishlist
          </button>
        </div>
      ))}
      {/* Community Feed */}
<div
  style={{
    marginTop: "40px",
    borderTop: "2px solid #ddd",
    paddingTop: "20px",
  }}
>
  <h2>Community Feed</h2>

  {posts.map((post) => (
    <div
      key={post.id}
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h3>{post.user}</h3>

      <img
        src={post.image}
        alt={post.caption}
        style={{
          width: "250px",
          borderRadius: "10px",
        }}
      />

      <p>{post.caption}</p>

      <p>❤️ Likes: {post.likes}</p>

      <p>💬 Comments: {post.comments}</p>

      <button
        style={{
          padding: "8px 12px",
          marginRight: "10px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Like
      </button>

      <button
        style={{
          padding: "8px 12px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Save
      </button>
    </div>
  ))}
</div>
    </div>
  );
}

export default App;