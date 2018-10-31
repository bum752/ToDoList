import React from 'react'

import './App.css'

import Navbar from './components/Navbar'
import Board from './components/Board'

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col s12 m4">
              <Board category="To Do" />
            </div>
            <div className="col s12 m4">
              <Board category="Doing" />
            </div>
            <div className="col s12 m4">
              <Board category="Done" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
