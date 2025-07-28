'use client'
import { FC } from "react";
import ProductList from "./_components/ProductList";
import Products from "./_components/Products";

const Home :FC = () => (

  <div>
    <h1>Welcome to the Home Page</h1>
    <p>This is the main content of the home page.</p>
    <ProductList />
    <Products />
    
    {/* Modal root for product creation/editing */}
    <div id="modal-root" />
  </div>
)

export default Home;