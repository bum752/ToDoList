import React from 'react'

import Item from './Item'

class Board extends React.Component {
  render() {
    const itemList = this.props.items.reverse().map((item, i) => {
      const items = item.map((it, j) => {
        return (
          <Item key={j} title={it.title} content={it.content}/>
        )
      })

      return (
        <ul className="collapsible expandable popout" key={i}>
          { items }
        </ul>
      )
    })

    return (
      <div className="card-panel color-board">
        <h5 className="title">{ this.props.category }</h5>
        { itemList }
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
