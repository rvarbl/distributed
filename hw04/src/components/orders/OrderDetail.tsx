import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IOrder } from '../../domain/orders/IOrder';
import { OrderService } from '../../services/orders/OrderService';

export const OrderDetail = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const orderService = new OrderService();
  const [order, setOrder] = useState<IOrder | undefined>(undefined);

  useEffect(() => {
    if (order === undefined) {
      if (id !== undefined) {
        let request = orderService.get(id);
        console.log(order, "order");

        request.then(data => {
          if (data !== null) {
            console.log(data as IOrder, "asd");
            let o = data as IOrder;
            let price = 0;
            o.orderRows?.forEach(x => { price += x.rowPriceEur })
            o.orderPrice = price;

            setOrder(data)
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
      <h1 className="display-6">Order: {order?.orderName}</h1>
      < hr />
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h6 className="border-bottom pb-2 mb-0">Order Items</h6>
        <div className="d-flex text-muted pt-3">

          {order?.orderRows?.map(row => {
            return (
              <>
                <table className="table table-primary table-striped table-hover">
                  <thead>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="width: 16.66%">{row.ingredient !== undefined && row.ingredient.name }</td>
                      <td>{row.rowPriceEur} €</td>
                    </tr>
                  </tbody>
                </table>

              </>
            );
          })}

        </div>
        <dl className="row">
          <dt className="col-sm-2">
            Description
          </dt>
          <dd className="col-sm-10">
            Total: {order?.orderPrice}
          </dd>
          <dd className="col-sm-10">
            <>
              Order Made At:
              {order?.orderMadeAt !== undefined &&
                order?.orderMadeAt}
            </>
          </dd>
          <dd className="col-sm-10">
            <>
              Order Completed At:
              {order?.orderCompleted !== undefined &&
                order?.orderCompleted}
            </>
          </dd>
        </dl>
      </div>
    </>
  );
};

export default OrderDetail;