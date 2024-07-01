import React from "react";
import { Link, useLocation } from "react-router-dom";

const HeaderComponent = () => {
  const location = useLocation();
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            <a
              href="https://github.com/shreshths"
              className="navbar-brand ms-4"
            >
              EBMS eBook Managemant
            </a>
            <div align="right">
              <Link
                to="/books"
                className={`btn btn-dark ${
                  location.pathname === "/books" || location.pathname === "/"
                    ? "active"
                    : ""
                }`}
              >
                Home
              </Link>

              <Link
                to="/add-book"
                className={`btn btn-dark ${
                  location.pathname === "/add-book" ? "active" : ""
                }`}
              >
                Add
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
