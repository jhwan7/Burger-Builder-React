import React from 'react';

import styles from './Spinner.module.css'
import Aux  from '../../../hoc/Auxilary/Auxilary'
const spinner = (props) => (
    <Aux>
        <div className = {styles.Loader}>Loading...</div>
        <div style = {{textAlign: 'center'}}>Loading...</div>
    </Aux>
);

export default spinner;