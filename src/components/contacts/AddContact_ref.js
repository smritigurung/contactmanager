//This is just for the uncontrolled Components and Refs, so it's not a part of the contactmanager project

import React, { Component } from 'react'

class AddContact extends Component {
    constructor(props) {
        super(props);

        // we have ref attached to each field
        this.nameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
    }

    // When we submit a form, we don't want to submit it to a file, so we're using regular javacript e.preventDefault();
    onSubmit = e => {
        e.preventDefault();
        const contact = {
            // this way, we can access the submitted value since we have a ref on it
            name: this.nameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value
        };
        console.log(contact);
    };

    static defaultProps = {
        name: 'Fred Smith',
        email: 'fsmith@gmail.com',
        phone: '123-456-7890'
    };

    render () {
        const { name, email, phone } = this.props;
        return (
        <div>
            <div className="card mb-3">
                <div className="card-header">Add Contact</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text"
                                name="name"
                                className="form-control form-control-lg"
                                placeholder="Enter Name..."
                                defaultValue={name}
                                ref={this.nameInput}
                                />
            
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email"
                                name="email"
                                className="form-control form-control-lg"
                                placeholder="Enter Email..."
                                defaultValue={email}
                                ref={this.emailInput}
                                />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                                type="text"
                                name="phone"
                                className="form-control form-control-lg"
                                placeholder="Enter Phone..."
                                defaultValue={phone}
                                ref={this.phoneInput}
                                />
                        </div>
                        <input 
                        type="submit"
                        value="Add Contact"
                        className="btn btn-light btn-block"/>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export default AddContact;
