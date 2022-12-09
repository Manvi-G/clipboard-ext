import React from "react";
import '../CSS/Table.scss';

import { VscCopy } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";

// Copy the items from the webpage - include images
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

  updateHelpTexts(event, documentQuery, textContent, padding = 30) {
    documentQuery.textContent = textContent;
    documentQuery.style.display = "block";
    documentQuery.style.position = 'absolute';
    documentQuery.style.top = `${event.clientY + padding}px`;
    documentQuery.style.left = `${event.clientX + padding}px`;
    documentQuery.style.backgroundColor = 'gray';
    documentQuery.style.color = 'white';
    documentQuery.style.padding = '5px';
    documentQuery.style.borderRadius = '5px';
  }

  // Display Help Text message when mouse hovers over a row
  onHover(event, textContent, padding = 30) {
    const helpText = document.querySelector('.helpText');
    this.updateHelpTexts(event, helpText, textContent, padding);
  }

  // Remove the help text message on hover out
  onHoverOut() {
    const helpText = document.querySelector('.helpText');
    helpText.style.display = "None";
  }

  copyToClipboard(copiedText) {
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput)
    tempInput.value = copiedText;
    tempInput.select();
    document.execCommand('copy', false);
    tempInput.remove();
  }

  // Copy text to clipboard
  copyText(event, copiedText) {
    // Code to copy to clipboard
    this.copyToClipboard(copiedText);
    
    // Updates in help text messages
    const confirmationText = document.querySelector('.helpText');
    this.updateHelpTexts(event, confirmationText, 'Text Copied');
    setTimeout(() => {
      confirmationText.style.display = "None";
    }, 1000);
  }

  // Copy all selected Items with space in between
  copySelected(event) {
    const selectedItems = this.state.tableContent.filter((e) => e.selected);
    let copiedText = '';

    selectedItems.forEach(item => {
      copiedText += item.text;
      copiedText += ' ';
    })

    this.copyToClipboard(copiedText);

    const confirmationText = document.querySelector('.helpText');
    this.updateHelpTexts(event, confirmationText, 'Text Copied', 10);
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
  // TODO: Show message on bottom: 1 Deleted Undo

  // TODO: Delete all selected Items
  deleteSelected() {
    const remainingItems = this.state.tableContent.filter((e) => !e.selected);

    this.setState({
      tableContent: remainingItems,
    });
  }

  // Merge selected rows into 1
  mergeSelected() {
    // const items = this.state.tableContent.filter((e) => e.selected);
  }

  //TODO: Add animations for the favorite and delete maybe?

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    {/* TODO: Display a dropdown with multiple selection options */}
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.allChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheck(e)}
                    />
                  </th>
                  <th scope="col" className="copied-text-column">Total Items: {this.state.tableContent.length}</th>
                  {/* TODO: Change icon */}
                  <th scope="col" className="icon" onClick={() => this.mergeSelected()}>{this.isAnyRowSelected() ? <VscCopy/> : ''}</th>
                  <th
                    scope="col"
                    className="icon"
                    onMouseOver={(event) => this.onHover(event, 'Copy All', 10)}
                    onMouseOut={(event) => this.onHoverOut(event)}
                    onClick={(event) => this.copySelected(event)}
                  >
                    {this.isAnyRowSelected() ? <VscCopy/> : ''}
                  </th>
                  {/* TODO: show text copied confirmation message */}
                  <th
                    scope="col"
                    className="red-icon"
                    onClick={() => this.deleteSelected()}
                  >
                    {this.isAnyRowSelected() ? <RiDeleteBin6Line/> : ''}
                  </th>
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
                    {/* TODO: truncate text to single line and display complete one on hover */}
                    <td
                      className="copied-text-column"
                      onMouseOver={(event) => this.onHover(event, 'Click to Copy')}
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
        {/* <div className="helpText"> Click to Copy </div> */}
        <div className="helpText"> </div>
        {/* <div className="confirmationText"> Text copied! </div> */}
      </div>
    );
  }
}

export default Table;