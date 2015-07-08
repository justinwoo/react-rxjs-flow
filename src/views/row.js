import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

let Row = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    let {
      index,
      rowHeight,
      columnWidths,
      row
    } = this.props;

    let top = index * rowHeight;
    let trStyle = {
      position: 'absolute',
      top: top + 'px',
      width: '100%',
      borderBottom: '1px solid grey'
    };

    let nodes;
    if (row === undefined) {
      nodes = null;
    } else {
      nodes = columnWidths.map((width, i) => {
        return (
          <td key={i} style={{width: width + 'px'}}>
            {String(row[i])}
          </td>
        );
      });
    }

    return (
      <tr style={trStyle}>
        {nodes}
      </tr>
    );
  }
});

export default Row;
