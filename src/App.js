import './CSS/App.css';
import './CSS/Header.scss';
import Table from './views/Table';
import { BsSearch } from "react-icons/bs";

function App() {
  return (
    <div className="App">
      <header className="title">
        Clipboard!

        {/* Search Bar */}
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
