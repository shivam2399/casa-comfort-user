import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import { addItem } from '../store/cartSlice';
import { useDispatch } from 'react-redux';

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        const productsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        
        setProducts(productsArray);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addItem({ 
      id: product.id, 
      name: product.name, 
      price: product.price,
      image: product.image, 
      quantity: 1,
    }));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="product-list">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-item">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
          </Link>
          <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
