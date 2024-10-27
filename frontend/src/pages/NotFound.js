import React from 'react';
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p><strong>Oops!</strong></p> 
      <p>That page cannot be found.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;