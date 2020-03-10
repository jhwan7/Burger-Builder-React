import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxilary/Auxilary'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }
        
        // Initializing interceptors before rendering child components
        // Didn't use conponentwillmount() because it is no longer supported
        reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
        resInterceptor  =  axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        
        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show = {this.state.error}
                        modalClosed = {this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}
export default withErrorHandler;