import React, { Component } from 'react'

import Aux from '../Auxilary/Auxilary'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

import styles from './Layout.module.css'

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'


class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState, props) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render () {
        return (
            <Aux>
                <Toolbar clicked = {this.sideDrawerOpenHandler} />
                <SideDrawer open = {this.state.showSideDrawer} closed = {this.sideDrawerCloseHandler}/>
                
                <main className = {styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;