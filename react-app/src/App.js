import React from 'react'
import ReactModal from 'react-responsive-modal'
import axios from 'axios'

import './App.css'
import config from './config'

import Navbar from './components/Navbar'
import Board from './components/Board'
import Write from './components/Write'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [[], [], []],
      modalIsOpen: false
    }
  }

  componentDidMount() {
    axios.get(`${config.api}/items`)
      .then(response => {
        const { items } = this.state

        if (response.data){
          response.data.forEach(item => {
            items[item._id.status][item._id.priority] = item.items
          })

          this.setState({ items })
        }
      })
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  appendItem() {
    this.setState({ items: this.state.items.map(x => x = []), modalIsOpen: false }, () => {
      const { items } = this.state

      axios.get(`${config.api}/items`)
      .then(response => {
        if (response.data) {
          response.data.forEach(item => {
            items[item._id.status][item._id.priority] = item.items
          })

          this.setState({ items })
        }
      })
    })
  }

  render() {
    const boards = this.state.items.map((item, i) => {
      const category = (n) => {
        if (n === 0) return 'To Do'
        else if (n === 1) return 'Doing'
        else if (n === 2) return 'Done'
      }

      return (
        <div className="col s12 m4" key={i}>
          <Board category={category(i)} items={item} />
        </div>
      )
    })

    return (
      <div>
        <ReactModal
          open={this.state.modalIsOpen}
          onClose={this.closeModal.bind(this)}
          center
        >
          <Write close={this.appendItem.bind(this)} />
        </ReactModal>
        <Navbar />
        <div className="container">
          <div className="center-align" style={{marginTop: '1em', marginBottom: '1em'}}>
            <button className="btn waves-effect waves-light cyan accent-4" onClick={this.openModal.bind(this)}>
              추가
              <i className="material-icons right">add</i>
            </button>
          </div>
          <div className="row">
            { boards }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
