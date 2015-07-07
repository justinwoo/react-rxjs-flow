import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import Row from './row';

var TBody = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    let {
      rowHeight,
      visibleIndices,
      columnWidths
    } = this.props;

    let nodes = visibleIndices.map((index, i) => <Row key={i} {...{index, rowHeight, columnWidths}}/>);

    return (
      <tbody>
        {nodes}
      </tbody>
    );
  }
});

export default TBody;
