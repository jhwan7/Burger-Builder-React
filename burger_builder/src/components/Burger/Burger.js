import React from 'react';

import Ingredient from './Ingredients/Ingredients'

import styles from './Burger.module.css'


const burger = (props) => {
    let incomingIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                // return ingredients that match igKey
                return <Ingredient key = {igKey + i} type = {igKey}/>;
            })
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if(incomingIngredients.length === 0) {
        incomingIngredients = <p>Start adding ingredients</p>
    }
    return (
        <div className = {styles.Burger}>
            <Ingredient type = "bread-top"/>
            {incomingIngredients}
            <Ingredient type = "bread-bottom"/>
        </div>
    );
};

export default burger;