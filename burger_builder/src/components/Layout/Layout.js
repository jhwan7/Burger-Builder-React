import React from 'react'

import Aux from '../../hoc/Auxilary'

import styles from './Layout.module.css'

const layout = (props) => (
    <Aux>
        <div>
            <p>Toolbar, SideDrawer</p>
        </div>
        <main className = {styles.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;