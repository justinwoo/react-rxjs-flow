import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

var Row = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    let {
      index,
      rowHeight,
      columnWidths
    } = this.props;

    let top = index * rowHeight;
    let trStyle = {
      position: 'absolute',
      top: top + 'px',
      width: '100%',
      borderBottom: '1px solid grey'
    };

    return (
      <tr style={trStyle}>
        <td style={{width: columnWidths[0] + 'px'}}>{String(index)}</td>
        <td style={{width: columnWidths[1] + 'px'}}>{String(index * 10)}</td>
        <td style={{width: columnWidths[2] + 'px'}}>{String(Math.floor(Math.random() * 100))}</td>
      </tr>
    );
  }
});

export default Row;
