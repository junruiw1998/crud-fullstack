import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        marginBottom: "80px",
        fontSize: "24px",
        display: "flex",
        gap: "50px",
        backgroundColor: "pink",
      }}
    >
      <Link to="/">List</Link>
      <Link to="/todo">Todo</Link>
    </nav>
  );
}

export default Navbar;
