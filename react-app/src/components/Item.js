import React from 'react'

class Item extends React.Component {
  componentDidMount() {
    const { M } = window
    const elems = document.querySelectorAll('.collapsible')
    M.Collapsible.init(elems, {
      accordion: false
    })
  }

  render() {
    return (
      <li>
        <div className="collapsible-header">
          Title
          <div className="item-menu">
            <i className="material-icons">remove</i>
          </div>
        </div>
        <div className="collapsible-body">
          Hello, World!
          <div className="collapsible-footer">
            <i className="material-icons">edit</i>
          </div>
        </div>
      </li>
    )
  }
}

export default Item

// <div className="card color-item">
// <div className="card-content">
// <span className="card-title black-text">TITLE</span>
// <p className="black-text">
// Hello, World!
// </p>
// </div>
// </div>
