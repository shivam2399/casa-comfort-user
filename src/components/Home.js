import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Slider from "./Slider";
import ProductList from "./ProductList";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <Slider />
      <ProductList searchQuery={searchQuery} />
      <Footer />
    </>
  );
};

export default Home;
