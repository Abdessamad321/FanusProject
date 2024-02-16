import React from 'react';
import './navbar.css';

export default function SearchBar() { 
  return (
    <div className='navbar'>
      <div className="logo">
        <h2>LOGO</h2>
      </div>
      <div className="searchbar">
        <input placeholder='search'></input>
      </div>
      <div className="icons"></div>
    </div>
  );
}
