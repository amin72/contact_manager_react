import React, { Component } from 'react'
import { DELETE_CONTACT, ADD_CONTACT, EDIT_CONTACT } from './types'

import axios from 'axios'


const Context = React.createContext()

const reducer = (state, action) => {
    switch(action.type) {
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            }
        
        case EDIT_CONTACT:
            return {
                ...state,
                contacts: this.state.contacts.map(contact => {
                    return contact
                })
            }

        default:
            return state
    }
}


export class Provider extends Component {
    state = {
        contacts: [],
        dispatch: action => {
            this.setState(state => reducer(state, action))
        }
    }


    async componentDidMount() {
        const url = 'https://jsonplaceholder.typicode.com/users'

        const response = await axios.get(url);
        this.setState({contacts: response.data});
    }


    render() {
        return (
            <Context.Provider value={this.state}>
                { this.props.children }
            </Context.Provider>
        )
    }
}


export const Consumer = Context.Consumer
