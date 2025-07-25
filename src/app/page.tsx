'use client'
import { FC } from "react";
import ProductList from "./_components/ProductList";

const Home :FC = () => (

  <div>
    <h1>Welcome to the Home Page</h1>
    <p>This is the main content of the home page.</p>
    <ProductList />
    <div id="modal-root" />
  </div>
)

export default Home;