import React from "react";
import "./Navbar.css";
import img from "../images/1.PNG";
const Navbar = ({ setSearch, Search }) => {
  return (
    <nav className="navbar">
      <div className="main">
        <div className="px-1">
          <a href="/" className="navbar-brand">
            <img src={img} width="120px" height="50px" alt="todo" />
          </a>
        </div>
        <div className="search">
          <input
            className="form-control "
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={Search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
