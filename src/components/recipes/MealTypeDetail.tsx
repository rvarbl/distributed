import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IMealType } from '../../domain/recipes/IMealType';
import { IRecipe } from '../../domain/recipes/IRecipe';
import { MealTypeService } from '../../services/recipes/MealTypeService';

export const MealTypeDetail = () => {
  const navigate = useNavigate();
  const mealTypeService = new MealTypeService();
  const [mealType, setMealType] = useState<IMealType | undefined>(undefined);
  let { id } = useParams();

  useEffect(() => {
    if (mealType === undefined) {
      if (id !== undefined) {
        let recipe = mealTypeService.get(id);
        recipe.then(data => {
          if (data !== null) {
            console.log(data as IMealType, " asdasd");
            setMealType(data)
          }
        });
      }
      else {
        return navigate("/");
      }
    }
  });

  return (
    <>
      <h1 className="display-6">Meal Type</h1>
      {mealType?.mealTypeName !== undefined &&
        <h2 className="display-5">{mealType?.mealTypeName}</h2>
      }
      {mealType?.recipesInMealType.length! < 1 &&
        <p>Nothing here</p>
      }
      {mealType?.recipesInMealType?.map(recipeInMealType => {
        return (
          <div className="col">
            <div className="text-center">
              <Link to={`/recipe_detail/${recipeInMealType.recipe.id}`} className="btn fs-1">{recipeInMealType.recipe.name}</Link>
            </div>
            <p className="card-text text-center">
              {recipeInMealType.recipe.description}
            </p>
          </div>
        );
      })}

    </>
  );
}

export default MealTypeDetail;