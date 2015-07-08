import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import {getHandleColumnSort} from '../intents/column-sort';

let THead = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    let {
      columns,
      columnWidths,
      columnSort
    } = this.props;

    let {
      column: currentColumn,
      sortDirection
    } = columnSort;

    let nodes = columns.map((value, i) => {
      let thStyle = {width: columnWidths[i] + 'px', cursor: 'pointer'};
      let sortArrow = '';
      if (currentColumn === i) {
        if (sortDirection === 1) {
          sortArrow = '↑';
        } else {
          sortArrow = '↓';
        }
      }
      return (
        <th key={i} style={thStyle}
          onClick={getHandleColumnSort(currentColumn, sortDirection, i)}>
          {value + ' ' + sortArrow}
        </th>
      );
    });
    return (
      <thead>
        <tr>
          {nodes}
        </tr>
      </thead>
    );
  }
});

export default THead;
