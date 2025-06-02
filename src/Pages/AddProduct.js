import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';
const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });
   const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://backend-8l1d.onrender.com');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);
  // Delete a product
  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`https://backend-8l1d.onrender.com/${id}`);
        setProducts(products.filter((product) => product._id !== id));
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-8l1d.onrender.com', formData);
      alert('Product added successfully!');
      setFormData({ name: '', description: '', price: '', image: '' });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <div className="list-contaniner">
      <h2>Products</h2>
      <table className="list-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Remove item</th>
            
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="list-slot">
                <img src={product.image} alt={product.name} loading="lazy"
                  width="100px"
                  height="100px" />
              </td>
              <td>
                <h3>{product.name}</h3>
              </td>
              <td>
                <p>{product.description}</p>
              </td>
              <td><p>${product.price}</p></td>
              <button onClick={() => deleteProduct(product._id)} style={{ color: 'white', backgroundColor: 'red', border: 'none', padding: '8px 12px', cursor: 'pointer', alignItems:'center' }}>
                Remove
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AddProduct;
