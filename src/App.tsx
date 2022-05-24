import React, { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeMain from './components/recipes/RecipeMain';
import OrderMain from './components/orders/OrderMain';
import IdentityMain from './components/identity/IdentityMain';
import Login from './components/identity/Login';
import Logout from './components/identity/Logout';
import Register from './components/identity/Register';
import Home from './components/Home';
import RecipeAll from './components/recipes/RecipeAll';
import RecipeDetail from './components/recipes/RecipeDetail';
import MealTypeMain from './components/recipes/MealTypeMain';
import MealTypeDetail from './components/recipes/MealTypeDetail';
import MealPlanMain from './components/recipes/MealPlanMain';
import MealPlanDetail from './components/recipes/MealPlanDetail';
import ErrorPage from './components/ErrorPage';
import AddToOrder from './components/orders/AddToOrder';
import OrderDetail from './components/orders/OrderDetail';
import CurrentOrder from './components/orders/CurrentOrder';
import OrderAll from './components/orders/OrderAll';
import Payment from './components/orders/Payment';
import { AppContextProvider, initialState } from './state/AppContext';
import { CartContextProvider, initialCartState} from './state/cart/CartContext';
import { IAppUser } from './domain/identity/IAppUser';
import { ICartItem } from './state/cart/ICartItem';

export const App = () => {
  const setUser = (user: IAppUser | undefined) => setAppState({ ...appState, user });
  const [appState, setAppState] = useState({ ...initialState, setUser });

  const setCart = (cart: ICartItem[] | undefined) => setCartState({ ...cartState, cart });
  const [cartState, setCartState] = useState({ ...initialCartState, setCart});

  return (
    <>
      <AppContextProvider value={appState}>
        <CartContextProvider value={cartState}>

          <Header />
          <div className='container'>
            <main role="main" className='pb-3'>
              <Routes>
                <Route path="/" element={<Home />} />

                {/* RECIPES */}
                <Route path="/recipes" element={<RecipeMain />} />
                <Route path="/recipe_all" element={<RecipeAll />} />
                <Route path="/recipe_detail/:id" element={<RecipeDetail />} />
                <Route path="/meal_type" element={<MealTypeMain />} />
                <Route path="/meal_type_detail/:id" element={<MealTypeDetail />} />
                <Route path="/meal_plan" element={<MealPlanMain />} />
                <Route path="/meal_plan_detail/:id" element={<MealPlanDetail />} />

                {/* ORDERS */}
                <Route path="/orders" element={<OrderMain />} />
                <Route path="/orders_all" element={<OrderAll />} />
                <Route path="/order_detail/:id" element={<OrderDetail />} />
                <Route path="/orders_add" element={<AddToOrder />} />
                <Route path="/orders_current" element={<CurrentOrder />} />
                <Route path="/orders_payment" element={<Payment />} />

                {/* Identity */}
                <Route path="/identity" element={<IdentityMain />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<Register />} />

                <Route path="*" element={<ErrorPage />} />
              </Routes>

            </main>
          </div>
          <Footer />

        </CartContextProvider>
      </AppContextProvider>
    </>
  );
};

export default App;
