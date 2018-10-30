import React from 'react'

import Item from './Item'

class Board extends React.Component {
  render() {
    return (
      <div className="card-panel color-board">
        <h5 className="title">{ this.props.category }</h5>
        <ul className="collapsible expandable popout">
          <Item />
          <Item />
          <Item />
        </ul>
      </div>
    )
  }
}

export default Board

// <div className="row">
//   <div classname="col s12">
//     <Item />
//   </div>
//   <div classname="col s12">
//     <Item />
//   </div>
//   <div classname="col s12">
//     <Item />
//   </div>
// </div>
