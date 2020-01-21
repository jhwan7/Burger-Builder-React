import React from 'react';

import Ingredient from './Ingredients/Ingredients'

import styles from './Burger.module.css'


const burger = (props) => {
    console.log('Object Recieved from props', props.ingredients);
    const incomingIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            console.log('String index of object recieved:', igKey);
            console.log('Data (int) stored at the string index', props.ingredients[igKey]);
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                // return ingredients that match igKey
                console.log(_);
                console.log('Type: ', igKey, 'Quantity: ', i);
                return <Ingredient key = {igKey + i} type = {igKey}/>;
            }) 
        });
    return (
        <div className = {styles.Burger}>
            <Ingredient type = "bread-top"/>
            {incomingIngredients}
            <Ingredient type = "bread-bottom"/>
        </div>
    );
};

export default burger;