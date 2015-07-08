import React from 'react';

import {handleOnScroll} from '../intents/user-scroll';
import {setContainerWidth} from '../intents/container-resize';

import THead from './thead';
import TBody from './tbody';
import FilterControls from './filter-controls';

let Root = React.createClass({
  render: function () {
    let {
      tableHeight,
      rowHeight,
      columns,
      rowCount,
      visibleIndices,
      columnWidths,
      rows,
      columnSort,
      filterEvenRows
    } = this.props;

    let staticHeaderTableStyle = {
      overflowX: 'hidden',
      borderBottom: '1px solid black',
      width: '100%'
    };

    let scrollTableContainerStyle = {
      position: 'relative',
      overflowX: 'hidden',
      borderBottom: '1px solid black',
      height: tableHeight + 'px',
    };

    return (
      <div id="app-container">
        <FilterControls {...{filterEvenRows}}/>
        <div className="static-header-table-container">
          <table
            className="static-header-table" style={staticHeaderTableStyle}>
            <THead {...{columns, columnWidths, columnSort}}/>
          </table>
        </div>
        <div ref="ScrollTableContainer" className="scroll-table-container" style={scrollTableContainerStyle}
          onScroll={handleOnScroll}>
          <table className="scroll-table" style={{height: rowCount * rowHeight + 'px'}}>
            <TBody {...{rowHeight, visibleIndices, columnWidths, rows}}/>
          </table>
        </div>
      </div>
    );
  },

  componentDidMount: function () {
    let scrollTableContainerNode = React.findDOMNode(this.refs.ScrollTableContainer);
    let getScrollTableContainerNodeWidth = () => scrollTableContainerNode.offsetWidth;

    Rx.Observable.fromEvent(window, 'resize')
    .map(getScrollTableContainerNodeWidth)
    .debounce(50)
    .distinctUntilChanged()
    .startWith(getScrollTableContainerNodeWidth())
    .subscribe(value => setContainerWidth(value));
  }
});

export default Root;
