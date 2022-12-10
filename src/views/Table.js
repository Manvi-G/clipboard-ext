import React from "react";
import '../CSS/Table.scss';
import '../CSS/PartyAnimation.css';

import { VscCopy } from "react-icons/vsc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiStarOutline, TiStarFullOutline } from "react-icons/ti";
import { CgArrowsMergeAltV } from "react-icons/cg";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allChecked: false,
      contentBeforeDelete: [],
    };
  }

  // Select/ UnSelect All Table rows
  onMasterCheck(e) {
    let tempList = this.props.copiedItems;
    tempList.map((item) => (item.selected = e.target.checked));
    this.props.updateItems(tempList);

    this.setState({
      allChecked: e.target.checked,
    });
  }

  // Update each row state and Master Checkbox State
  onItemCheck(e, currentItem) {
    let tempList = this.props.copiedItems;
    tempList.map((item) => {
      if (item.id === currentItem.id) {
        item.selected = e.target.checked;
      }
      return item;
    });

    const totalItems = this.props.copiedItems.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;
    this.props.updateItems(tempList);

    this.setState({
      allChecked: totalItems === totalCheckedItems,
    });
  }

  // Return if any row is selected - used to show hidden icons on header
  isAnyRowSelected() {
    const selectedItems = this.props.copiedItems.filter((e) => e.selected);
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

  isTextTruncated(itemId) {
    const currentRow = document.querySelector(`.item-id-${itemId}`);

    if(currentRow) {
      return currentRow.offsetWidth < currentRow.scrollWidth;
    }

    return false;
  }

  // Display Help Text message when mouse hovers over a row
  onHover(event, textContent, padding, itemId = '') {
    const helpText = document.querySelector('.helpText');
    this.updateHelpTexts(event, helpText, textContent, padding);

    // display entire row content if truncated on hover
    if(this.isTextTruncated(itemId)) {
      const tableContainer = document.querySelector('.table');
      tableContainer.style.whiteSpace = 'normal';
    }
  }

  // Remove the help text message on hover out
  onHoverOut() {
    const helpText = document.querySelector('.helpText');
    helpText.style.display = "None";

    const tableContainer = document.querySelector('.table');
    tableContainer.style.whiteSpace = 'nowrap';
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
    const selectedItems = this.props.copiedItems.filter((e) => e.selected);
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

  makeItParty() {
    const partyPopper = document.querySelector('.party-popper-container');
    partyPopper.style.display = "flex";

    setTimeout(() => {
      partyPopper.style.display = "none";
    }, 2000);
  }

  // Mark an item as favorite
  markFavorite(itemId) {
    let tempList = this.props.copiedItems;
    const foundItem = tempList.find((item) => (item.id === itemId));
    foundItem.favorite = !foundItem.favorite;

    this.props.updateItems(tempList);

    if (foundItem.favorite) {
      this.makeItParty();
    }
  }

  // Delete an item from the copiedText list
  deleteItem(itemId) {
    this.setState({
      contentBeforeDelete: [...this.props.copiedItems],
    });

    let tempList = this.props.copiedItems;
    const foundItemIndex = tempList.findIndex((item) => (item.id === itemId));
    tempList.splice(foundItemIndex, 1);

    this.props.updateItems(tempList);

    this.showMessageOnDelete(1);
  }

  // Delete all selected Items
  deleteSelected() {
    const selectedItems = this.props.copiedItems.filter((e) => e.selected);
    const totalSelected = selectedItems.length;

    this.setState({
      contentBeforeDelete: [...this.props.copiedItems],
    });

    const remainingItems = this.props.copiedItems.filter((e) => !e.selected);

    this.props.updateItems(remainingItems);

    this.showMessageOnDelete(totalSelected);
  }

  // Show message on bottom: 1 Deleted Undo - when a text is deleted
  showMessageOnDelete(numberDeleted) {
    const container = document.querySelector('.deleteMessage');
    container.style.display = "flex";

    const spanContainer = document.querySelector('.deleteMessage > span');
    spanContainer.textContent = `${numberDeleted} Deleted`;

    const undoContainer = document.querySelector('.deleteMessage > .undo');
    undoContainer.focus();

    setTimeout(() => {
      container.style.display = "None";
    }, 2000);
  }

  onUndo() {
    const content = this.state.contentBeforeDelete;

    this.props.updateItems(content);

    this.setState({
      contentBeforeDelete: [],
    });
  }

  // Merge selected rows into 1
  mergeSelected() {
    this.onHoverOut();

    let mergedText = '';
    let newId = '';
    let firstSelectedIndex = '';

    this.props.copiedItems.forEach((item, index) => {
      if (item.selected) {
        if (firstSelectedIndex === '') {
          firstSelectedIndex = index;
          newId = item.id;
        }
        mergedText += item.text;
        mergedText += ' ';
      }
    })

    const remainingItems = this.props.copiedItems.filter((e) => !e.selected);
    const newCell = {
      id: newId,
      selected: false,
      text: mergedText,
      favorite: false,
    };
    remainingItems.splice(firstSelectedIndex, 0, newCell);

    this.props.updateItems(remainingItems);
  }

  render() {
    return (
      <div className="container">
      <div className="party-popper-container">
        <div className="party-piece"></div>
        <div className="party-piece"></div>
        <div className="party-piece"></div>
        <div className="party-piece"></div>
        <div className="party-piece"></div>
        <div className="party-piece"></div>
        <div className="party-piece"></div>
        <div className="party-piece"></div>
        <div className="party-piece"></div>
        <div className="party-piece"></div>
      </div>
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
                      tabIndex="1"
                    />
                  </th>
                  <th scope="col" className="copied-text-column">Total Items: {this.props.copiedItems.length}</th>
                  <th
                    scope="col"
                    className={`icon cursor-pointer`}
                    onMouseOver={(event) => this.onHover(event, 'Merge All', 10)}
                    onMouseOut={() => this.onHoverOut()}
                    onClick={() => this.mergeSelected()}
                    tabIndex={this.isAnyRowSelected() ? '1' : ''}
                    onFocus={(event) => this.onHover(event, 'Merge All', 10)}
                    onBlur={() => this.onHoverOut()}
                    onKeyUp={(event) => { if(event.keyCode === 32) this.mergeSelected() }}
                    >
                    {this.isAnyRowSelected() ? <CgArrowsMergeAltV/> : ''}
                  </th>
                  <th
                    scope="col"
                    className={`icon cursor-pointer`}
                    onMouseOver={(event) => this.onHover(event, 'Copy All', 10)}
                    onMouseOut={() => this.onHoverOut()}
                    onClick={(event) => this.copySelected(event)}
                    tabIndex={this.isAnyRowSelected() ? '1' : ''}
                    onFocus={(event) => this.onHover(event, 'Copy All', 10)}
                    onBlur={() => this.onHoverOut()}
                    onKeyUp={(event) => { if(event.keyCode === 32) this.copySelected(event) }}
                  >
                    {this.isAnyRowSelected() ? <VscCopy/> : ''}
                  </th>
                  <th
                    scope="col"
                    className={`red-icon cursor-pointer`}
                    onClick={() => this.deleteSelected()}
                    tabIndex={this.isAnyRowSelected() ? '1' : ''}
                    onKeyUp={(event) => { if(event.keyCode === 32) this.deleteSelected() }}
                  >
                    {this.isAnyRowSelected() ? <RiDeleteBin6Line/> : ''}
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.props.copiedItems.map((item) => (
                  <tr key={item.id} className={item.selected ? "selected" : ""}>
                    <th scope="row">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        className="form-check-input"
                        id="rowcheck{item.id}"
                        onChange={(e) => this.onItemCheck(e, item)}
                        tabIndex="1"
                      />
                    </th>
                    <td
                      className={`copied-text-column cursor-pointer item-id-${item.id}`}
                      onMouseOver={(event) => this.onHover(event, 'Click to Copy', 30, item.id)}
                      onMouseOut={() => this.onHoverOut()}
                      onClick={(event) => this.copyText(event, item.text)}
                      onFocus={(event) => this.onHover(event, 'Press Space to Copy', 30, item.id)}
                      onBlur={() => this.onHoverOut()}
                      tabIndex="1"
                      onKeyUp={(event) => { if(event.keyCode === 32) this.copyTextOnSpace(event, item.text) }}
                    >
                      {item.text}
                    </td>
                    <th
                      scope="row"
                      className={`disabled ${item.favorite ? 'yellow-icon' : 'icon'} cursor-pointer`}
                      onClick={() => this.markFavorite(item.id)}
                      tabIndex="1"
                      onKeyUp={(event) => { if(event.keyCode === 32) this.markFavorite(item.id) }}
                    >
                      {item.favorite ? <TiStarFullOutline/> : <TiStarOutline/>}
                    </th>
                    <td
                      className={`disabled icon cursor-pointer`}
                      onClick={() => this.deleteItem(item.id)}
                      tabIndex="1"
                      onKeyUp={(event) => { if(event.keyCode === 32) this.deleteItem(item.id) }}
                    >
                      <RiDeleteBin6Line/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="helpText"> </div>
        <div className="deleteMessage">
          <span>
            1 Deleted
          </span>
          <button className={`undo cursor-pointer`} onClick={() => this.onUndo()}>Undo</button>
        </div>
      </div>
    );
  }
}

export default Table;