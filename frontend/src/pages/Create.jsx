import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi"; 
import baseURL from "../config";


function Create() {
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post(`${baseURL}/api/products`, form);
    navigate("/");
  };

  return (
    <div className="create-page">
      <nav className="navbar">
        <h1>🛍️ My Product Store</h1>
        <div className="nav-right">
          <Link to="/" className="button">Home Page</Link>
        </div>
      </nav>
    <div className="container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="form">
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} required />
        <input name="image" placeholder="Image URL" onChange={handleChange} required />
        <button type="submit" className="button">Create</button>
      </form>
    </div>
    </div>
  );
}

export default Create;
