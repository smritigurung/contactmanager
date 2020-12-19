import React, { Component } from 'react';
import {Consumer} from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import { v4 as uuid } from 'uuid';  // npm i uuid in the terminal to generate unique id
import axios from 'axios';  // npm i axios

class EditContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    };

    async componentDidMount() {
        const { id } = this.props.match.params;
        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        const contact = res.data;
        this.setState({
            name: contact.name,
            email: contact.email,
            phone: contact.phone
        });
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

        const updContact = {
            name,
            email,
            phone
        }

        // this will get the id
        const { id } = this.props.match.params;

        // put request is to update, and we need to send along data called updContact to update
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updContact);

        // dispatch the action of type 'UPDATE_CONTACT' and payload 
        dispatch({type: 'UPDATE_CONTACT', payload: res.data});

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
                                <div className="card-header">Edit Contact</div>
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
                                        value="Update Contact"
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

export default EditContact;
