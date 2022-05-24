import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IRecipe } from '../../domain/recipes/IRecipe';
import { RecipeService } from '../../services/recipes/RecipeService';

export const RecipeAll = () => {
  const recipeService = new RecipeService();
  const [recipes, setRecipes] = useState<IRecipe[]|undefined>(undefined);

  useEffect(() => {
    if (recipes === undefined) {
      recipeService.getAll().then(data => setRecipes(data));
    }
  });

  return (
    <>
      <h1 className="display-6">Recipes</h1>
      <h2 className="display-5">Browse Recipes</h2>
      <hr />
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {recipes?.map(recipe => {
            return (
              <div className="col">
                <div className="text-center">
                  <Link to={`/recipe_detail/${recipe.id}`} className="btn fs-1">{recipe.name}</Link>
                </div>
                <p className="card-text text-center">
                  {recipe.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>


    </>
  );
}

export default RecipeAll;