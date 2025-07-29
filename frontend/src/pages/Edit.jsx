import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import baseURL from "../config";

function Edit() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseURL}/api/products/${id}`)
      .then(res => {
        console.log("✅ Edit API response:", res.data);
        setForm(res.data.data); // ✅ FIXED HERE
      })
      .catch(err => {
        console.error("❌ Failed to fetch product", err);
      });
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/api/products/${id}`, form);
      navigate("/");
    } catch (err) {
      console.error("❌ Failed to update product", err);
    }
  };

  return (
    <div>
    <nav className="navbar">
        <h1>🛍️ My Product Store</h1>
        <div className="nav-right">
          <Link to="/" className="button">Home Page</Link>
        </div>
      </nav>
    <div className="container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name of the product"
          required
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price of the product"
          required
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="URL of the product image"
          required
        />
        <button type="submit" className="button">Update</button>
      </form>
    </div>
    </div>
  );
}

export default Edit;
