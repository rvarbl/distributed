import React from 'react';
import { Link } from 'react-router-dom';

export const RecipeMain = () =>
  <>
    <div className="container">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

        <div className="col">
          <div className="text-center">
            <Link to="/meal_plan" className="btn fs-1">Meal Plans</Link>
          </div>
          <p className="card-text">
            Are you looking for dietary plans, vegan meals or keto dishes?
            We have something for everyone.
          </p>
        </div>
        <div className="col">
          <div className="text-center">
            <Link to="/meal_type" className="btn fs-1">Categories</Link>
          </div>
          <p className="card-text">
            Browse recipes based on their category.
            Desserts and Pastries, Japanese or Mexican cuisine, stews, soups and countless other options.
          </p>
        </div>
        <div className="col">
          <div className="text-center">
            <Link to="/recipe_all" className="btn fs-1">All Recipes</Link>
          </div>
          <p className="card-text">
            We've got hundreds of delicious recipes for every taste and dietary preference. Browse them all right here!
          </p>
        </div>

      </div>
    </div>
  </>
  ;

export default RecipeMain;