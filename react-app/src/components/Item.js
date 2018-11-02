import React from 'react'
import axios from 'axios'

import config from '../config'

class Item extends React.Component {
  componentDidMount() {
    const { M } = window
    const elems = document.querySelectorAll('.collapsible')
    M.Collapsible.init(elems, {
      accordion: false
    })
  }

  handleRemove() {
    const { M } = window
    axios.delete(`${config.api}/item/${this.props.item._id}`)
      .then(response => {
        this.props.handleUpdate()
        M.toast({ html: '삭제되었습니다.' })
      })
      .catch(error => {
        M.toast({ html: '에러가 발생했습니다.' })
        console.error(error)
      })
  }

  render() {
    const none = (
      <span className="grey-text">
        내용이 없습니다.
      </span>
    )

    return (
      <li>
        <div className="collapsible-header">
          <span className="truncate">
            { this.props.item.title }
          </span>
        </div>
        <div className="collapsible-body">
          { this.props.item.content ? this.props.item.content : none }
          <div className="collapsible-footer right-align">
            <button className="btn-floating btn-small waves-effect waves-light blue">
              <i className="material-icons">edit</i>
            </button>
            <button className="btn-floating btn-small waves-effect waves-light red" onClick={this.handleRemove.bind(this)}>
              <i className="material-icons">delete</i>
            </button>
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
