import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import { Consumer } from '../../context'
import { DELETE_CONTACT } from '../../types'


class Contact extends Component {
    state = {
        showContactInfo: false
    }


    onShowClick = () => {
        this.setState({showContactInfo: !this.state.showContactInfo})
    }


    onDeleteClicked = async (id, dispatch) => {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        await axios.delete(url);
    
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    }


    render() {
        const { id, name, phone, email } = this.props.contact
        const { showContactInfo } = this.state

        return (
            <Consumer>
                { value => {

                    const { dispatch } = value

                    return (
                        <div className="card card-body mb-3">
                            <h4>{ name } &nbsp;
                                <FontAwesomeIcon
                                    icon={ faSortDown }
                                    onClick={ this.onShowClick } />
            
                                <FontAwesomeIcon
                                    icon={ faTimes }
                                    onClick={this.onDeleteClicked.bind(this, id, dispatch)}
                                    style={{ cursor: 'pointer', float: 'right', color: 'red'}}
                                />

                                <Link to={`contact/edit/${id}`}>
                                    <FontAwesomeIcon
                                        icon={ faPencilAlt }                                        
                                        style={{ cursor: 'pointer', float: 'right', color: 'black', marginRight: '1rem'}}
                                    />
                                </Link>                                
                            </h4>
                            
                            { showContactInfo ? (
                                <ul className="list-group">
                                    <li className="list-group-item">Phone: { phone }</li>
                                    <li className="list-group-item">Email: { email }</li>
                                </ul>)
                                : null 
                            }
                        </div>        
                    )
                }}
            </Consumer>
        )
    }
}


Contact.propTypes = {
    contact: PropTypes.object.isRequired
}

export default Contact