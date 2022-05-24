import { useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { IOrder } from '../../domain/orders/IOrder';
import { IOrderRow } from '../../domain/orders/IOrderRow';
import { I_Ingredient } from '../../domain/recipes/I_Ingredient';
import { OrderService } from '../../services/orders/OrderService';
import { CartContext } from '../../state/cart/CartContext';
import { v4 as uuidv4 } from 'uuid';
import { ICartState } from '../../state/cart/ICartState';

export const CurrentOrder = () => {
  const cartState = useContext(CartContext);
  const orderService = new OrderService();
  let navigate = useNavigate();

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
    console.log("using");
    if (ingredient === undefined || cartState.cart === undefined) { return; }
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
          console.log("added ", ingredient, item.amount);
        }
        if (item.amount < 1) {
          cartState.cart = cartState.cart.filter(x => x.item !== item.item)
        }
      }
    }

    let cart = cartState.cart;
    cartState.setCart(cart);
  };


  const getOrder = (): IOrder | undefined => {
    let orderRows: IOrderRow[] = [];
    if (cartState.cart === undefined) { return undefined; }

    for (let cartItem of cartState.cart) {
      if (cartItem.item !== undefined) {
        let price = cartItem.item.price * cartItem.amount;
        let row: IOrderRow = { ingredientId: cartItem.item.id, rowPriceEur: price };
        orderRows.push(row);
      }
    }

    let orderName = uuidv4();
    let order: IOrder = { orderName: orderName, orderRows: orderRows };
    return order;
  };

  const createOrder = () => {
    let order = getOrder();
    if (order?.orderRows !== undefined && order.orderRows?.length > 0) {
      orderService.post(order);

      cartState.setCart([]);
      navigate("/orders_all")
    }
  };
  const getTotalPrice = (): number => {
    let total = 0;
    if (cartState.cart === undefined) {
      return total;
    }
    for (let cartItem of cartState.cart!) {
      if (cartItem.item?.price !== undefined) {
        console.log("CALCULATING");

        let sum = cartItem.amount * cartItem.item?.price;
        total += sum;
      }
    }
    return total;
  };

  return (
    <>
      <h1 className="display-6">Order</h1>
      < hr />
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">Current Order</h6>
        <div className='container'>
          <table className="table table-primary table-striped table-hover">
            <tbody>
              {cartState.cart !== undefined && cartState.cart.map(row => {
                return (
                  <>
                    <tr>
                      <button className='btn btn-success' onClick={e => { addToCart(row.item) }}>+</button>
                      <button className='btn btn-danger' onClick={e => { removeFromCart(row.item) }}>-</button>
                    </tr>
                    <tr>
                      <td>Ingredient: {row?.item?.name}</td>
                      <td>{`${row?.amount} ${row?.item?.unit.unitAlias}`}</td>
                      <td>Price: ${row?.item?.price} €</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <caption> <>Total: {getTotalPrice()} </>€</caption>
      <button className='btn btn-primary' onClick={e => { createOrder() }}>Create Order</button>

    </>
  );

}

export default CurrentOrder;


