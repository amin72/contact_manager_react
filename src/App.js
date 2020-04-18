import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Provider } from './context'
import Header from './components/layouts/header'
import Contacts from './components/contacts/contacts'
import AddContact from './components/contacts/add_contact'
import EditContact from './components/contacts/edit_contact'
import About from './components/pages/about'
import PageNotFound from './components/pages/404'

import { HashRouter as Router, Route, Switch} from 'react-router-dom'

import Test from './components/test/test'


class App extends Component {
    render() {
        return (
            <Provider>
                <Router>
                    <div className="App">
                        <Header />

                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={Contacts} />
                                <Route exact path="/contact/add" component={AddContact} />
                                <Route exact path="/contact/edit/:id" component={EditContact} />
                                <Route exact path="/about" component={About} />
                                <Route exact path="/test" component={Test} />
                                <Route component={PageNotFound} />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}


export default App
