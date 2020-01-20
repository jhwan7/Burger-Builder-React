import React from 'react';

import Ingredient from './Ingredients/Ingredients'

import styles from './Burger.module.css'


const burger = (props) => {
    return (
        <div className = {styles.Burger}>
            <Ingredient type = "bread-top"/>
            <Ingredient type = "cheese"/>
            <Ingredient type = "meat"/>
            <Ingredient type = "meat"/>
            <Ingredient type = "meat"/>
            <Ingredient type = "salad"/>
            <Ingredient type = "salad"/>
            <Ingredient type = "meat"/>
            <Ingredient type = "bacon"/>
            <Ingredient type = "meat"/>
            <Ingredient type = "bread-bottom"/>
        </div>
    );
};

export default burger;