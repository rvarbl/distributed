import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { addSyntheticLeadingComment } from 'typescript';
import { IRecipe } from '../../domain/recipes/IRecipe';
import { I_Ingredient } from '../../domain/recipes/I_Ingredient';
import { RecipeService } from '../../services/recipes/RecipeService';
import { AppContext } from '../../state/AppContext';
import { CartContext } from '../../state/cart/CartContext';
import Home from '../Home';

export const RecipeDetail = () => {
    const recipeService = new RecipeService();
    const [recipe, setRecipe] = useState<IRecipe | undefined>(undefined);

    const cartState = useContext(CartContext);
    let { id } = useParams();

    useEffect(() => {
        if (recipe === undefined) {
            if (id !== undefined) {
                let recipe = recipeService.get(id);
                recipe.then(data => {
                    if (data !== null) {
                        console.log(data as IRecipe, "asd");
                        setRecipe(data)
                    }
                });
            }
        }
    });

    const cartContains = (ingredient: I_Ingredient | undefined): boolean => {
        if (ingredient === undefined || cartState.cart === undefined) { return false; }
        for (let cartItem of cartState.cart) {
            if (cartItem.item === ingredient) {
                return true;
            }
        }
        return false;
    };
    const addToCart = (ingredient: I_Ingredient | undefined) => {
        console.log("using", ingredient);
        if (cartState.cart === undefined) { cartState.setCart([]); }
        if (ingredient === undefined || cartState.cart === undefined) {
            console.log("none");
            return;
        }
        if (cartContains(ingredient)) {
            for (let item of cartState.cart) {
                if (item.item === ingredient) {
                    item.amount += 1;
                    console.log("added ", ingredient, item.amount);
                }
            }
        }
        else {
            let item = { amount: 1, item: ingredient };
            console.log("added new", ingredient, item.amount);
            cartState.cart.push(item);
        }
        let cart = cartState.cart;
        cartState.setCart(cart);
    };

    const removeFromCart = (ingredient: I_Ingredient | undefined) => {
        console.log("using");
        if (ingredient === undefined || cartState.cart === undefined) { return; }
        if (cartContains(ingredient)) {
            for (let item of cartState.cart) {
                if (item.item === ingredient) {
                    item.amount -= 1;
                    console.log("removed ", ingredient, item.amount);
                }
                if (item.amount < 1) {
                    cartState.cart = cartState.cart.filter(x => x.item !== item.item)
                }
            }
        }
        const cart = cartState.cart;
        cartState.setCart(cart)
    };

    const onClick = (ingredient: I_Ingredient, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log(event.currentTarget.textContent);
        if (event.currentTarget.textContent = "Add to Cart") {
            addToCart(ingredient);
            event.currentTarget.textContent = "Added";
            event.currentTarget.style.background = "LightCoral";
        }
        else if (event.currentTarget.textContent = "Added"){
            removeFromCart(ingredient);
            event.currentTarget.textContent = "Add to Cart";
            event.currentTarget.style.background = "White";
        }
    };

    return (
        <>
            <h1 className="display-6">Recipe</h1>
            <h2 className="display-5">{recipe?.name}</h2>
            <hr />
            <main role="main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <dl className="row">
                                <dt className="col-sm-2">
                                    Description
                                </dt>
                                <dd className="col-sm-10">
                                    {recipe?.description}
                                </dd>

                                <dt className="col-sm-2">
                                    Content
                                </dt>
                                <dd className="col-sm-10">
                                    {recipe?.content}
                                </dd>
                            </dl>

                            <hr />

                            {recipe?.ingredientsInRecipe !== undefined &&
                                <h2 className="display-6">Ingredients</h2>
                            }
                            <hr />
                            {recipe?.ingredientsInRecipe?.map(ingredientInRecipe =>
                                <>
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className='row'>
                                                <div className="accordion" id="controllerAccordion">

                                                    <table className="table table-primary table-striped table-hover">
                                                        <tbody>
                                                            <tr>
                                                                <td>Ingredient: {ingredientInRecipe?.ingredient.name}</td>
                                                                <td>{`${ingredientInRecipe?.amount} ${ingredientInRecipe?.ingredient.unit.unitAlias}`}</td>
                                                                <td>Price: ${ingredientInRecipe?.ingredient.price} €</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" id="headingOne">
                                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">

                                                                <div className='container'>
                                                                    <div className="row">
                                                                        Details
                                                                    </div>
                                                                </div>
                                                            </button>
                                                        </h2>
                                                        <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
                                                            data-bs-parent="#controllerAccordion">
                                                            <div className="accordion-body">
                                                                <div className="accordion-body">
                                                                    <p>Ingredient properties</p>
                                                                    <div className="d-flex flex-row bd-highlight mb-3">
                                                                        <table className="table table-striped">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th className="col">Amount</th>
                                                                                    <th className="col">Property</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {ingredientInRecipe?.ingredient.propertiesInIngredient.map(propertyInIngredient =>
                                                                                    <tr>
                                                                                        <td>
                                                                                            {`${propertyInIngredient.amount} ${propertyInIngredient.ingredientProperty.unit.unitAlias}`}
                                                                                        </td>
                                                                                        <td>
                                                                                            {propertyInIngredient.ingredientProperty.ingredientPropertyName}
                                                                                        </td>
                                                                                    </tr>
                                                                                )}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='col col-6'>
                                            <button className='btn btn-outline-success' onClick={e => { onClick(ingredientInRecipe.ingredient, e) }}>Add to Cart</button>

                                            {cartContains(ingredientInRecipe.ingredient) &&
                                                <p className="text-danger validation-summary-errors">
                                                    Added to Cart
                                                </p>
                                            }
                                        </div>
                                    </div>
                                    <hr />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </>);
};

export default RecipeDetail;