import React from "react";
import '../CSS/Table.scss';

import { VscCopy } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";

const copiedItems = [
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
    text: 'This is your copied text 4',
    favorite: false,
  },
];

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableContent: copiedItems,
      allChecked: false,
    };
  }

  // Select/ UnSelect All Table rows
  onMasterCheck(e) {
    let tempList = this.state.tableContent;
    tempList.map((item) => (item.selected = e.target.checked));

    this.setState({
      allChecked: e.target.checked,
      tableContent: tempList,
    });
  }

  // Update each row state and Master Checkbox State
  onItemCheck(e, currentItem) {
    let tempList = this.state.tableContent;
    tempList.map((item) => {
      if (item.id === currentItem.id) {
        item.selected = e.target.checked;
      }
      return item;
    });

    const totalItems = this.state.tableContent.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    this.setState({
      allChecked: totalItems === totalCheckedItems,
      tableContent: tempList,
    });
  }

  // Return if any row is selected - used to show hidden icons on header
  isAnyRowSelected() {
    const selectedItems = this.state.tableContent.filter((e) => e.selected);
    return selectedItems.length > 0;
  }

  // Display Help Text message when mouse hovers over a row
  onHover(event) {
    const confirmationText = document.querySelector('.confirmationText');
    confirmationText.style.display = "None";
    const helpText = document.querySelector('.helpText');
    helpText.style.display = "block";
    helpText.style.position = 'absolute';
    helpText.style.top = `${event.clientY + 30}px`;
    helpText.style.left = `${event.clientX + 30}px`;
    helpText.style.backgroundColor = 'gray';
    helpText.style.color = 'white';
    helpText.style.padding = '5px';
    helpText.style.borderRadius = '5px';
  }

  // Remove the help text message on hover out
  onHoverOut(event) {
    const helpText = document.querySelector('.helpText');
    helpText.style.display = "None";
  }

  // Copy text to clipboard
  copyText(event, text) {
    // TODO: Code to copy to clipboard
    // Updates in help text messages
    const helpText = document.querySelector('.helpText');
    helpText.style.display = "None";
    const confirmationText = document.querySelector('.confirmationText');
    confirmationText.style.display = "block";
    confirmationText.style.position = 'absolute';
    confirmationText.style.top = `${event.clientY + 30}px`;
    confirmationText.style.left = `${event.clientX + 30}px`;
    confirmationText.style.backgroundColor = 'gray';
    confirmationText.style.color = 'white';
    confirmationText.style.padding = '5px';
    confirmationText.style.borderRadius = '5px';
    setTimeout(() => {
      confirmationText.style.display = "None";
    }, 1000);
  }

  // Mark an item as favorite
  markFavorite(itemId) {
    let tempList = this.state.tableContent;
    const foundItem = tempList.find((item) => (item.id === itemId));
    foundItem.favorite = !foundItem.favorite;

    this.setState({
      tableContent: tempList,
    });
  }

  // Delete an item from the copiedText list
  deleteItem(itemId) {
    let tempList = this.state.tableContent;
    const foundItemIndex = tempList.findIndex((item) => (item.id === itemId));
    tempList.splice(foundItemIndex, 1);

    this.setState({
      tableContent: tempList,
    });
  }

  // TODO: Copy all selected Items
  copySelected() {

  }

  // TODO: Delete all selected Items
  deleteSelected() {
    const remainingItems = this.state.tableContent.filter((e) => !e.selected);

    this.setState({
      tableContent: remainingItems,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.allChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheck(e)}
                    />
                  </th>
                  <th scope="col" className="copied-text-column">Total Items: {this.state.tableContent.length}</th>
                  <th scope="col" className="icon" onClick={() => this.copySelected()}>{this.isAnyRowSelected() ? <VscCopy/> : ''}</th>
                  <th scope="col" className="red-icon" onClick={() => this.deleteSelected()}>{this.isAnyRowSelected() ? <RiDeleteBin6Line/> : ''}</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tableContent.map((item) => (
                  <tr key={item.id} className={item.selected ? "selected" : ""}>
                    <th scope="row">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        className="form-check-input"
                        id="rowcheck{item.id}"
                        onChange={(e) => this.onItemCheck(e, item)}
                      />
                    </th>
                    <td
                      className="copied-text-column"
                      onMouseOver={(event) => this.onHover(event)}
                      onMouseOut={(event) => this.onHoverOut(event)}
                      onClick={(event) => this.copyText(event, item.text)}
                    >
                      {item.text}
                    </td>
                    <th
                      scope="row"
                      className={`disabled ${item.favorite ? 'yellow-icon' : 'icon'}`}
                      onClick={() => this.markFavorite(item.id)}
                    >
                      {item.favorite ? <TiStarFullOutline/> : <TiStarOutline/>}
                    </th>
                    <td
                      className={`disabled icon`}
                      onClick={() => this.deleteItem(item.id)}
                    >
                      <RiDeleteBin6Line/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="helpText"> Click to Copy </div>
        <div className="confirmationText"> Text copied! </div>
      </div>
    );
  }
}

export default Table;