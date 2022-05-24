import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IMealType } from '../../domain/recipes/IMealType';
import { IRecipe } from '../../domain/recipes/IRecipe';
import { MealTypeService } from '../../services/recipes/MealTypeService';

export const MealTypeMain = () =>{
  const mealTypeService = new MealTypeService();
  const [mealTypes, setMealTypes] = useState<IMealType[]|undefined>(undefined);

  useEffect(() => {
    if (mealTypes === undefined) {
      mealTypeService.getAll().then(data => {
        console.log(data);
        
        setMealTypes(data)});
    }
  });

  return(
    <>
      <h1 className="display-6">Meal Types</h1>
      <h2 className="display-5">Browse Meal Types</h2>
      <hr />
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {mealTypes?.map(mealType => {
            return (


              <div className="col">
                <div className="text-center">
                  <Link to={`/meal_type_detail/${mealType.id}`} className="btn fs-1">{mealType.mealTypeName}</Link>
                </div>
                <p className="card-text text-center">
                  {mealType.id}
                </p>
              </div>
            );
          })}
        </div>
      </div>


    </>
  );
};

export default MealTypeMain;