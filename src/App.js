import './CSS/App.css';
import './CSS/Header.scss';
import React from "react";

import Table from './views/Table';
import HeaderAnimation from './views/HeaderAnimation';
import { BsSearch } from "react-icons/bs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: Copy the items from the webpage - include images
      allItems: [
        {
          id: 1,
          selected: false,
          text: 'This is your copied text 1',
          favorite: false,
        },
        {
          id: 2,
          selected: false,
          text: 'This is your copied text 2',
          favorite: false,
        },
        {
          id: 3,
          selected: false,
          text: 'This is your copied text 3',
          favorite: false,
        },
        {
          id: 4,
          selected: false,
          text: 'This is your copied text 4.This is your copied text 4.This is your copied text 4This is your copied text 4.This is your copied text 4.This is your copied text 4',
          favorite: false,
        },
        {
          id: 5,
          selected: false,
          text: 'This is your copied text 5',
          favorite: false,
        },
      ],

      // start filteredItems same as allItems
      filteredItems: [
        {
          id: 1,
          selected: false,
          text: 'This is your copied text 1',
          favorite: false,
        },
        {
          id: 2,
          selected: false,
          text: 'This is your copied text 2',
          favorite: false,
        },
        {
          id: 3,
          selected: false,
          text: 'This is your copied text 3',
          favorite: false,
        },
        {
          id: 4,
          selected: false,
          text: 'This is your copied text 4.This is your copied text 4.This is your copied text 4This is your copied text 4.This is your copied text 4.This is your copied text 4',
          favorite: false,
        },
        {
          id: 5,
          selected: false,
          text: 'This is your copied text 5',
          favorite: false,
        },
      ],
    };
  }

  componentDidMount() {
    
  }

  filterSearch() {
    const searchText = document.getElementById("search-input-box").value;

    // select only the items which contain the searched text
    const filteredItems = this.state.allItems.filter(item => item.text.toLowerCase().includes(searchText));

    this.updateItems(filteredItems);
  }

  updateItems(items) {
    this.setState({
      filteredItems: items,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="title">
          Clipboard!
          <HeaderAnimation></HeaderAnimation>

          {/* Search Bar */}
          <div className='search-bar'>
            <BsSearch />
            <input type="text" id="search-input-box" placeholder='Search...' onChange={() => this.filterSearch()} tabIndex="1"></input>
          </div>
        </header>

        <Table copiedItems={this.state.filteredItems} updateItems={(params) => {this.updateItems(params)}}></Table>
      </div>
    );
  }
}

export default App;
