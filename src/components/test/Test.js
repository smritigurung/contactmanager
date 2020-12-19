// These are just the React lifecycle methods and we're not going to use it for the contactmanager project

import React, { Component } from 'react'

class Test extends Component {
    state = {
        title: '',
        body: ''
    };

  // it fires whatever you put in that function is going to fire off after the component mounts
  // And, we don't need to use arrow function in here because it is an actual lifecycle method
  componentDidMount () {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        // writing data instead of json
        .then(data => this.setState({
            title: data.title,
            body: data.body
        }));
  }

  // this run before it mounts
//   componentWillMount () {
//     console.log('componentWillMount...')
//   }

//   // this is going to run when the component updates
//   componentDidUpdate () {
//     console.log('componentDidUpdate...')
//   }

//   componentWillUpdate () {
//     console.log('componentWillUpdate...')
//   }

//   // when your component receives new properties, this method will run
//   // although this method is deprecated now
//   componentWillReceiveProps (nextProps, nextState) {
//     console.log('componentWillReceiveProps...')
//   }

//   static getDerivedStateFromProps (nextProps, prevState) {
//       // you either have to return null or state, you cannot do setState()
//     return {
//         test: 'something'
//     };
//   }

//   getSnapshotBeforeUpdate (prevProps, prevState) {
//     console.log('getSnapshotBeforeUpdate...')
//   }

  render () {
    const { title, body } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    )
  }
}

export default Test
