import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IOrder } from '../../domain/orders/IOrder';
import { OrderService } from '../../services/orders/OrderService';

export const OrderAll = () => {
  const orderService = new OrderService();
  const [orders, setOrders] = useState<IOrder[] | undefined>(undefined);

  useEffect(() => {
    if (orders === undefined) {
      orderService.getAll().then(data => setOrders(data));
    }
  });

  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

        </div>
      </div>
      <h1 className="display-6">Orders</h1>
      < hr />
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <hr />
        <table className="table table-warning table-striped table-hover">
          {orders?.map(order => {
            order.orderPrice = 0;
            return (

              <div className="pb-3 mb-0 border-bottom w-100">
                <strong className="text-gray-dark">
                  <div className="col">
                    <div className="text-center">
                      <Link to={`/order_detail/${order.id}`} className="btn fs-1">{order.orderName}</Link>
                    </div>
                    <p className="card-text text-center">
                      <>
                        {order.orderRows?.forEach(row => order.orderPrice! += row.rowPriceEur)}
                        Order Total: {order.orderPrice} €
                      </>
                    </p>
                  </div>
                </strong>
              </div>

            );
          })}
        </table>

      </div>
    </>)
    ;
}

export default OrderAll;