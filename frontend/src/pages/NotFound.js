import React from 'react';
import { Link } from "react-router-dom";

// functional component for displaying 404 error message for undefined routes
const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1> {/* display the status code for not found */}
      <p><strong>Oops!</strong></p> 
      <p>That page cannot be found.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NotFound;