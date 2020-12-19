import React, { Component } from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import { v4 as uuid } from 'uuid';  // npm i uuid in the terminal to generate unique id
import axios from 'axios';  // npm i axios

class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }

    // When we submit a form, we don't want to submit it to a file, so we're using regular javacript e.preventDefault();
    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        // we want the values from the state, so we're destructing the state
        const { name, email, phone } = this.state;

        // Check for Errors
        if (name === '') {
            this.setState({errors: {name: 'Name is required'}});
            return;
        }

        if (email === ''){
            this.setState({errors: {email: 'Email is required'}});
            return;
        }

        if (phone === ''){
            this.setState({errors: {phone: 'Phone number is required'}});
            return;
        }

        // constructing a new contact
        const newContact = {
            // here, if the key and value are the same, for example, name: name, we don't have to write the value
            name,
            email,
            phone
        }

        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
        
        // we're calling the dispatch method and we're going to send the type ADD_CONTACT which is going to trigger ADD_CONTACT case inside the context.js
        dispatch({ type: 'ADD_CONTACT', payload: res.data })
        

        // clear the state
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        // redirects to the home page
        this.props.history.push('/');
    };

    // e.target.name comes from whatever input name we have, and the value comes from that input name down below inside the form-group class
    onChange = e => this.setState({ [e.target.name ]: e.target.value });
    render () {
        const { name, email, phone, errors } = this.state;

        return (
            <Consumer>
                {/* this value gets the entire state */}
                {value => {
                    // Now, we have access to the dispatch which will allow us to call that Add Contact
                    const { dispatch } = value;
                    return (
                        <div>
                            <div className="card mb-3">
                                <div className="card-header">Add Contact</div>
                                <div className="card-body">
                                    <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                        <TextInputGroup 
                                        label="Name"
                                        name="name"
                                        placeholder="Enter Name"
                                        value={name}
                                        onChange={this.onChange}
                                        error={errors.name}
                                        />
                                        <TextInputGroup 
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={this.onChange}
                                        error={errors.email}
                                        />
                                        <TextInputGroup 
                                        label="Phone"
                                        name="phone"
                                        placeholder="Enter Phone"
                                        value={phone}
                                        onChange={this.onChange}
                                        error={errors.phone}
                                        />
                                        <input 
                                        type="submit"
                                        value="Add Contact"
                                        className="btn btn-light btn-block"/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default AddContact;
