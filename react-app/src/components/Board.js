import React from 'react'
import ReactStars from 'react-stars'

import Item from './Item'

class Board extends React.Component {
  render() {
    const itemList = this.props.items.map((item, i) => {
      const items = item.map((it, j) => {
        return (
          <Item key={j} item={it} handleUpdate={this.props.handleUpdate} handleEdit={this.props.handleEdit}/>
        )
      })

      return (
        <ul className="collapsible expandable popout" key={i}>
          <li className="collapsible-stars">
            <ReactStars value={i} edit={false} />
          </li>
          { items }
        </ul>
      )
    })

    return (
      <div className="card-panel color-board">
        { itemList }
        <h5 className="title">{ this.props.category }</h5>
      </div>
    )
  }
}

export default Board
