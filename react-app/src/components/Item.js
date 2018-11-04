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
    const { M, confirm } = window

    const confirmed = confirm('정말 삭제하시겠습니까?')

    if (confirmed){
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
  }

  render() {
    const none = (
      <span className="grey-text">
        내용이 없습니다.
      </span>
    )

    const date = new Date(this.props.item.deadline)
    const dday = (date) => {
      if (date) {
        const deadline = new Date(date)
        const now = new Date()
        const dday = Math.floor((now.getTime() - deadline.getTime()) / (1000 * 60 * 60 * 24))

        if (dday > 0) return (<span className="badge black white-text">만료</span>)
        else if (dday === 0) return (<span className="badge red blink white-text">오늘</span>)
        else if (dday >= -7) return (<span className="badge red white-text">D{dday}</span>)
        else if (dday >= -14) return (<span className="badge blue white-text">D{dday}</span>)
        else return (<span className="badge green white-text">D{dday}</span>)
      } else {
        return null
      }
    }

    return (
      <li>
        <div className="collapsible-header" tooltip={this.props.item.title}>
          <span className="truncate">
            { this.props.item.title }
          </span>
          { this.props.item.status !== 2 ? dday(this.props.item.deadline) : null }
        </div>
        <div className="collapsible-body">
          { this.props.item.content ? this.props.item.content : none }
          <div className="collapsible-footer">
            <div>
              { this.props.item.deadline ? `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 까지` : null }
            </div>
            <div className="right-align">
              <button className="btn-floating btn-small waves-effect waves-light blue" onClick={() => this.props.handleEdit(this.props.item)}>
                <i className="material-icons">edit</i>
              </button>
              <button className="btn-floating btn-small waves-effect waves-light red" onClick={this.handleRemove.bind(this)}>
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default Item
