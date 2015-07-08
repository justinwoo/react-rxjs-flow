import React from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import {
  getHandleFilterEvens
} from '../intents/filter-rows';

let FilterControls = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    let {
      filterEvenRows
    } = this.props;

    return (
      <div className="filter-controls">
        <label>
          Filter out even numbers
          <input type="checkbox" checked={filterEvenRows}
            onChange={getHandleFilterEvens(filterEvenRows)}
          />
        </label>
      </div>
    );
  }
});

export default FilterControls;
