import React, {Component} from 'react'

import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.5
}
class BurgerBuilder extends Component{

    state = {
        // Now set from the backend
        ingredients: null,
        totalPrice: 4.00,
        purchasable: false,
        orderClicked: false,
        loading: false,
        error: null
    };

    componentDidMount() {
        axios.get('https://burger-builder-f8951.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data})
            })
            .catch(err => {
                this.setState({error: true})
            })
    }

    updatePurchaseState (updatedIngredients) {
        // const ingredients = {
        //     // This doesnt give real-time state
        //     ...this.state.ingredients
        // };
        const ingredients = updatedIngredients
        const sum = Object.keys(ingredients).map( igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        

        this.setState({purchasable: sum > 0})
    }
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
        this.updatePurchaseState(updatedIngredients)
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
        this.updatePurchaseState(updatedIngredients)
    }

    orderHandler = () => {
        this.setState({orderClicked: true});
    }

    orderCancleHandler = () => {
        this.setState({orderClicked: false});
    }

    purchaseHandler = () => {
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Alex',
                address: {
                    street: 'crecsent 2',
                    zipCode: '41123213',
                    country: 'Canada'
                },
                email: 'test@test.ca',
                delivery: 'ASAP'
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, orderClicked: false});
            })
            .catch(err => {
                this.setState({loading: false, orderClicked: false});
            })

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
        let orderSummary = null;

        let burger = this.state.error? <p>Ingredients cannot be loaded</p> : <Spinner/>;
        
        // If ingredients loaded
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        price = {this.state.totalPrice}
                        purchasable = {this.state.purchasable}
                        ordered = {this.orderHandler}/>
                </Aux>
            )
            orderSummary = <OrderSummary 
                price = {this.state.totalPrice} 
                ingredients = {this.state.ingredients} 
                cancel = {this.orderCancleHandler} 
                success = {this.purchaseHandler}/>;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                {/* Improve performance by rendering Modal, Order summary only when clicked */}
                <Modal show = {this.state.orderClicked} modalClosed = {this.orderCancleHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    };
}

export default withErrorHandler(BurgerBuilder, axios);