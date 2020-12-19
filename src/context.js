import React, { Component } from "react";
import axios from 'axios'   // npm i axios in the terminal

const Context = React.createContext();

// takes two parameters state and action
const reducer = (state, action) => {
  switch(action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      }
    case 'ADD_CONTACT':
      return {
        // we are going to update the state by adding the new contact
        // we want the initial state, so we're using the spread operator
        // payload has the entire contact, we're going to add that at the current contacts in our state using the spread operator, and that will add the new contact
        ...state,
        contacts: [action.payload, ...state.contacts]
      }
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(
          contact => contact.id === action.payload.id ? (contact = action.payload) : contact
        )
      }
    default:
      return state;
  }
}

export class Provider extends Component {
  // This is basically our global state
  state = {
    contacts: [],

    // we need a way to call an action so we need dispatch in our state
    // dispatch will take in an action
    dispatch: action => {
      this.setState(state => reducer(state, action))
    }
  };

  async componentDidMount() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    this.setState({contacts: res.data});
  }

  render() {
    return (
      // The value is the property, and we pass in the entire state
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

// it can also access the state
export const Consumer = Context.Consumer;
