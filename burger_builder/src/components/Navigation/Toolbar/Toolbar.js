import React from 'react';

import Logo from '../../Logo/Logo'

import styles from './Toolbar.module.css'

const toolbar = (props) => (
    <header className = {styles.Toolbar}>
        <div>Menu</div>
        <Logo/>
        <nav>
            ...
        </nav>
    </header>
)

export default toolbar