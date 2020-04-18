import React, { Component } from 'react'
import axios from 'axios'

import { Consumer } from '../../context'
import { ADD_CONTACT } from '../../types'
import TextInputGroup from '../layouts/text_input_group'


class AddContact extends Component {
    state = {
        name: '',
        email: '',
        phone: '',
        errors: {}
    }


    onChnage = e => {
        this.setState({[e.target.name]: e.target.value})
    }


    onSubmit = async (dispatch, e) => {
        e.preventDefault();

        const { name, phone, email } = this.state;

        if (name === '') {
            this.setState({
                errors: {
                    name: 'Name is required'
                }})
            return;
        }

        if (email === '') {
            this.setState({
                errors: {
                    email: 'Email is required'
                }})
            return;
        }

        if (phone === '') {
            this.setState({
                errors: {
                    phone: 'Phone is required'
                }})
            return;
        }

        const newContact = {
            name,
            email,
            phone
        }

        const url = 'https://jsonplaceholder.typicode.com/users/';
        const response = await axios.post(url, newContact);

        dispatch({
            type: ADD_CONTACT,
            payload: response.data
        });

        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        })

        this.props.history.push('/')
    }


    render() {
        const { name, email, phone, errors } = this.state

        return (
            <Consumer>
                { value => {
                    const { dispatch } = value

                    return (
                        <div className="card mb-3">
                            <div className="card-header">Add Contact</div>
        
                            <div className="card-body">
                                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                    <TextInputGroup
                                        label="Name"
                                        name="name"
                                        value={name}
                                        onChange={this.onChnage}
                                        className="form-group form-control-lg"
                                        placeholder="Enter name..."
                                        error={errors.name} />
                                                
                                    <TextInputGroup
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={this.onChnage}
                                        className="form-group form-control-lg"
                                        placeholder="Enter email..."
                                        error={errors.email} />
        
                                    <TextInputGroup
                                        label="Phone"
                                        name="phone"
                                        value={phone}
                                        onChange={this.onChnage}
                                        className="form-group form-control-lg"
                                        placeholder="Enter phone..."
                                        error={errors.phone} />
       
                                    <input type="submit" value="Add Contact" className="btn btn-light btn-block" />
        
                                </form>
                            </div>
                        </div>    
                    )
                }}
            </Consumer>
        )
    }
}


export default AddContact