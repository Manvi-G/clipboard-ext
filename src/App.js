import './CSS/App.css';
import './CSS/Header.scss';
import React from "react";

import Table from './views/Table';
import { BsSearch } from "react-icons/bs";

function App() {
  // TODO: Listen to copy events on the webpage

  return (
    <div className="App">
      <header className="title">
        Clipboard!

        {/* Search Bar */}
        {/* TODO: Implement the search functionality */}
        <div className='search-bar'>
          <BsSearch />  
          <input type="search" placeholder='Search...'></input>
        </div>
      </header>

      <Table></Table>
    </div>
  );
}

export default App;
