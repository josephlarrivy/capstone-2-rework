import React, { useState } from "react";
import NavBar from "../NavBar";
import RecreationAPI from "../apis/RecreationApi";

const Book = ({ token, setToken }) => {
  
  return (
    <div id="book-container">
      <NavBar token={token} setToken={setToken} />
      <h1>Book</h1>
    </div>
  );
};

export default Book;
