import React from 'react'

import './App.css'

import Navbar from './components/Navbar'
import Board from './components/Board'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [[], [], []]
      // items: {
      //   0: {
      //     0: [],
      //     1: [],
      //     2: [],
      //     3: [],
      //     4: []
      //   },
      //   1: {
      //     0: [],
      //     1: [],
      //     2: [],
      //     3: [],
      //     4: []
      //   },
      //   2: {
      //     0: [],
      //     1: [],
      //     2: [],
      //     3: [],
      //     4: []
      //   }
      // }
    }
  }

  componentDidMount() {
    const data = [
      {
          "_id": {
              "status": 2,
              "priority": 4
          },
          "items": [
              {
                  "_id": "5bd955a78aa34354e06d3b97",
                  "priority": 4,
                  "title": "TEST TITLE",
                  "content": "TEST CONTENT",
                  "deadline": "2018-11-07T07:11:35.957Z",
                  "status": 2,
                  "__v": 0
              },
              {
                  "_id": "5bd955a88aa34354e06d3b9b",
                  "priority": 4,
                  "title": "TEST TITLE 5",
                  "content": "TEST CONTENT 5",
                  "deadline": "2018-11-07T07:11:36.919Z",
                  "status": 2,
                  "__v": 0
              }
          ]
      },
      {
          "_id": {
              "status": 1,
              "priority": 3
          },
          "items": [
              {
                  "_id": "5bd955a88aa34354e06d3b99",
                  "priority": 3,
                  "title": "TEST TITLE 4",
                  "content": "TEST CONTENT 4",
                  "deadline": "2018-11-07T07:11:36.452Z",
                  "status": 1,
                  "__v": 0
              }
          ]
      },
      {
          "_id": {
              "status": 0,
              "priority": 2
          },
          "items": [
              {
                  "_id": "5bd955a78aa34354e06d3b96",
                  "priority": 2,
                  "title": "TEST TITLE",
                  "content": "TEST CONTENT",
                  "status": 0,
                  "__v": 0
              }
          ]
      },
      {
          "_id": {
              "status": 0,
              "priority": 3
          },
          "items": [
              {
                  "_id": "5bd955a88aa34354e06d3b9a",
                  "priority": 3,
                  "title": "TEST TITLE 5",
                  "content": "TEST CONTENT 5",
                  "deadline": "2018-11-07T07:11:36.689Z",
                  "status": 0,
                  "__v": 0
              }
          ]
      },
      {
          "_id": {
              "status": 0,
              "priority": 4
          },
          "items": [
              {
                  "_id": "5bd955a88aa34354e06d3b98",
                  "priority": 4,
                  "title": "TEST TITLE 3",
                  "content": "TEST CONTENT 3",
                  "deadline": "2018-11-07T07:11:36.207Z",
                  "status": 0,
                  "__v": 0
              }
          ]
      }
    ]

    const { items } = this.state

    data.forEach(item => {
      items[item._id.status][item._id.priority] = item.items
    })

    this.setState({ items })
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
