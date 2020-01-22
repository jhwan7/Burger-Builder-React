import React, {Component} from 'react'

import Aux from '../../hoc/Auxilary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.5
}
class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        // Non-mutable way of changing data
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        //Select the price for the ingredient from the predefined price list
        const priceAddition = INGREDIENT_PRICES[type]

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // Set the state to the modified value
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        // If there are no ingredients, don't proceed.
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount + -1;
        // Non-mutable way of changing data
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        //Select the price for the ingredient from the predefined price list
        const priceDeduction = INGREDIENT_PRICES[type]

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        // Set the state to the modified value
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    }
    render () {
        // Create a copy of the ingredients state
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            // Iterate through each object, if value is less or equal to 0, retur true to the array
            // Now holds information on which key (type) should be disabled.
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                />
            </Aux>
        )
    };
}

export default BurgerBuilder;