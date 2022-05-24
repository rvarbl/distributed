import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IMealPlan } from '../../domain/recipes/IMealPlan';
import { MealPlanService } from '../../services/recipes/MealPlanService';

export const MealPlanMain = () => {

  const mealPlanService = new MealPlanService();
  const [mealPlans, setMealPlans] = useState<IMealPlan[] | undefined>(undefined);

  useEffect(() => {
    if (mealPlans === undefined) {
      mealPlanService.getAll().then(data => {
        console.log(data);

        setMealPlans(data)
      });
    }
  });

  return (
    <>
      <h1 className="display-6">Meal Plans</h1>
      <h2 className="display-5">Browse Meal Plans</h2>
      <hr />
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {mealPlans?.map(mealPlan => {
            return (
              <div className="col">
                <div className="text-center">
                  <Link to={`/meal_plan_detail/${mealPlan.id}`} className="btn fs-1">{mealPlan.mealPlanName}</Link>
                </div>
                <p className="card-text text-center">
                  {mealPlan.mealPlanDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>


    </>
  )
};



export default MealPlanMain;