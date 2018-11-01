import React from 'react'
import axios from 'axios'

import './App.css'
import config from './config'

import Navbar from './components/Navbar'
import Board from './components/Board'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [[], [], []]
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
        <Navbar />
        <div className="container">
          <div className="row">
            { boards }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
