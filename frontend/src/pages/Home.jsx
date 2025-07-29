import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; 
import baseURL from "../config";

function Home() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/products`);
      setProducts(res.data.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("❌ Error deleting product:", error);
    }
  };

  return (
    <div>
      {/* ✅ Navbar */}
      <nav className="navbar">
        <h1>🛍️ My Product Store</h1>
        <div className="nav-right">
          <Link to="/create" className="button">+ Add Product</Link>

          {/* ✅ Product count with icon */}
          <div className="product-count">
            <FiShoppingCart size={24} />
            <span className="badge">{products.length}</span>
          </div>
        </div>
      </nav>


      {/* ✅ Hero section */}
      <section className="hero">
        <h2>Welcome to <span style={{color:"white"}}>Product Store</span></h2>
        <h3>Manage Your Products Effortlessly</h3>
        <p>Organize, update, and showcase your products with this CRUD web app.</p>
      </section>

      {/* ✅ Products Section */}
      <div className="products-section">
        {products.length === 0 ? (
          <p>No products yet...</p>
        ) : (
          <ul className="product-grid">
            {products.map((p) => (
              <li key={p.id} className="card">
                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
                <img src={p.image} alt={p.name} width="100" />
                <div>
                  <Link to={`/edit/${p.id}`} className="button small">Edit</Link>
                  <button onClick={() => deleteProduct(p.id)} className="button small danger">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
