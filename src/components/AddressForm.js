import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './AddressForm.css';

const AddressForm = () => {
  const [address, setAddress] = useState('');
  const [addresses, setAddresses] = useState([]);
  const userEmail = useSelector((state) => state.auth.email);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await fetch('https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/addresses.json');
      const data = await response.json();
      const userAddresses = Object.keys(data)
        .map(key => ({ id: key, ...data[key] }))
        .filter(addr => addr.email === userEmail);
      setAddresses(userAddresses);
    };

    fetchAddresses();
  }, [userEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/addresses.json', {
      method: 'POST',
      body: JSON.stringify({ email: userEmail, address }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      setAddresses([...addresses, { email: userEmail, address }]);
      setAddress('');
    } else {
      console.error('Failed to save address');
    }
  };

  const handleSelectAddress = (selectedAddress) => {
    localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
    navigate('/cart');
  };

  return (
    <div className="address-form">
      <h2>Add Address</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
        />
        <button type="submit">Add Address</button>
      </form>
      <h3>Select Address</h3>
      {addresses.map(addr => (
        <div key={addr.id} className="address-item">
          <p>{addr.address}</p>
          <button onClick={() => handleSelectAddress(addr.address)}>Select</button>
        </div>
      ))}
    </div>
  );
};

export default AddressForm;
