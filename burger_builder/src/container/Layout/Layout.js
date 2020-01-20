import React from 'react'

import Aux from '../../hoc/Auxilary'

const layout = (props) => (
    <Aux>
        <div>
            <p>Toolbar, SideDrawer</p>
        </div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;