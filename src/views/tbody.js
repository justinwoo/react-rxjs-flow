import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import Row from './row';

let TBody = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    let {
      rowHeight,
      visibleIndices,
      columnWidths,
      rows
    } = this.props;

    let nodes = visibleIndices.map((index, i) => {
      let rowProps = {
        index,
        rowHeight,
        columnWidths,
        row: rows[index]
      };
      let renderKey = index % visibleIndices.length;
      return (
        <Row
          key={renderKey}
          {...rowProps}
        />
      );
    });

    return (
      <tbody>
        {nodes}
      </tbody>
    );
  }
});

export default TBody;
