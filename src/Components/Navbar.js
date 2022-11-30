import React from "react";
import "./Navbar.css";
import img from "../images/1.png";
const Navbar = ({ setSearch, Search }) => {
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <a href="/" className="navbar-brand">
          <img src={img} width="120px" height="50px" alt="todo" />
        </a>
        <form role="search">
          <input
            className="form-control "
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={Search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
