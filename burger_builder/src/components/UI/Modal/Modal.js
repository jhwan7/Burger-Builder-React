import React, { Component } from 'react';

import styles from './Modal.module.css'
import Aux from '../../../hoc/Auxilary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    // Check if the component should be updated (rendered again) true: update, false: no-update
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }
    //Debugging purposes. Activates when component re-renders
    componentWillUpdate () {
        console.log('[Modal] will update');
    }
    render() {
        return (
            <Aux>
                <Backdrop show = {this.props.show} clicked = {this.props.modalClosed}/>
                <div className = {styles.Modal}
                style = {{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : 0
                }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;