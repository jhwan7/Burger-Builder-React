import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'

import styles from './NavigationItems.module.css'

const navigationItems = () => (
    <ul className = {styles.NavigationItems}>
       <NavigationItem Link = "/" active = {true}>Burger Builder</NavigationItem>
       <NavigationItem Link = "/">Checkout</NavigationItem>
    </ul>
)

export default navigationItems;