import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

var THead = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    let {
      columns,
      columnWidths
    } = this.props;

    let nodes = columns.map((value, i) => {
      let thStyle = {width: columnWidths[i] + 'px'};
      return (
        <th key={i} style={thStyle}>{value}</th>
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
