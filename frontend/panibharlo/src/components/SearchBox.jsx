import React from "react";

export default function SearchBox() {
  return (
    <li className="search-box-outer">
      <div className="dropdown">
        <button className="search-box-btn" type="button">
          <i className="far fa-search"></i>
        </button>
        <div className="dropdown-menu search-panel">
          <div className="form-container">
            <form method="post" action="/blog">
              <div className="form-group">
                <input type="search" name="search-field" placeholder="Search...." required />
                <button type="submit" className="search-btn">
                  <span className="fas fa-search"></span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </li>
  );
}
