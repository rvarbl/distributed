import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { IMealPlan } from '../../domain/recipes/IMealPlan';
import { IMealType } from '../../domain/recipes/IMealType';
import { MealPlanService } from '../../services/recipes/MealPlanService';
import { MealTypeService } from '../../services/recipes/MealTypeService';

export const MealPlanDetail = () => {
  const navigate = useNavigate();
  const mealPlanService = new MealPlanService();
  const [mealPlan, setMealPlan] = useState<IMealPlan | undefined>(undefined);
  let { id } = useParams();

  useEffect(() => {
    if (mealPlan === undefined) {
      if (id !== undefined) {
        let item = mealPlanService.get(id);
        item.then(data => {
          if (data !== null) {
            console.log(data as IMealPlan, " asdasd");
            setMealPlan(data)
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
      <h1 className="display-6">Meal Plan</h1>
      {mealPlan?.mealPlanName !== undefined &&
        <h2 className="display-5">{mealPlan?.mealPlanName}</h2>
      }
      {mealPlan?.recipesInMealPlan.length! < 1 &&
        <p>Nothing here</p>
      }
      {mealPlan?.recipesInMealPlan?.map(recipeInMealPlan => {
        return (
          <div className="col">
            <div className="text-center">
              <Link to={`/recipe_detail/${recipeInMealPlan.recipe.id}`} className="btn fs-1">{recipeInMealPlan.recipe.name}</Link>
            </div>
            <p className="card-text text-center">
              {recipeInMealPlan.recipe.description}
            </p>
          </div>
        );
      })}

    </>
  );
}

export default MealPlanDetail;