import React from 'react';
import { Link } from 'react-router-dom';

export const OrderMain = () =>
  <>
    <h1 className="display-6">Orders</h1>
    < hr />
    <div className="my-3 p-3 bg-body rounded shadow-sm">
      <h6 className="border-bottom pb-2 mb-0">Manage your orders</h6>
      <div className="d-flex text-muted pt-3">
        <div className="pb-3 mb-0 border-bottom w-100">
          <button className='btn btn-outline-primary w-100'>
            <strong className="text-gray-dark">
              <Link to="/orders_current" className="navbar-brand" active-class="active">
                Current Order
              </Link>
            </strong>
          </button>
        </div>
      </div>
      <div className="d-flex text-muted pt-3">
        <div className="pb-3 mb-0 border-bottom w-100">
          <button className='btn btn-outline-primary w-100'>
            <strong className="text-gray-dark">
              <Link to="/orders_all" className="navbar-brand" active-class="active">
                All Orders
              </Link>
            </strong>
          </button>
        </div>
      </div>
    </div>
  </>
  ;

export default OrderMain;